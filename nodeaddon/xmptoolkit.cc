
#include <nan.h>
#include <node.h>
#include <iostream>
#include <string>
#include <fstream>
#include <thread>

using namespace std;
using namespace Nan;
using namespace v8;

#define WIN_ENV 1
#define XMP_INCLUDE_XMPFILES 1 //if using XMPFiles 
#define TXMP_STRING_TYPE std::string 

#include "XMP.incl_cpp"
#include "XMP.hpp"
#include "XMP_IO.hpp"

SXMPMeta createXMPFromString(string xmp)
{
	SXMPMeta meta;
	const char * xmpBuffer = xmp.c_str();

	// Loop over the rdf string and create the XMP object
	// 10 characters at a time 
	int i;
	for (i = 0; i < (long)strlen(xmpBuffer) - 10; i += 10)
	{
		meta.ParseFromBuffer(&xmpBuffer[i], 10, kXMP_ParseMoreBuffers);
	}

	// The last call has no kXMP_ParseMoreBuffers options, signifying 
	// this is the last input buffer
	meta.ParseFromBuffer(&xmpBuffer[i], (XMP_StringLen)strlen(xmpBuffer) - i);
	return meta;
}

class XmpWriteWorker : public AsyncWorker {
public: 
	XmpWriteWorker(Callback * callback, string outfilePath, string rawXmp) :
		AsyncWorker(callback), outfilePath(outfilePath), rawXmp(rawXmp) {

	}

	void Execute() {

		cout << "Worker Thread Id: " << std::this_thread::get_id() << endl;

		SXMPMeta::Initialize();
		XMP_OptionBits options = 0;
		SXMPFiles::Initialize(options);

		try {
			// Options to open the file with - open for editing and use a smart handler
			XMP_OptionBits opts = kXMPFiles_OpenForUpdate | kXMPFiles_OpenUseSmartHandler;

			bool ok;
			SXMPFiles myFile;

			// First we try and open the file
			ok = myFile.OpenFile(outfilePath, kXMP_UnknownFile, opts);

			if (!ok)
			{
				opts = kXMPFiles_OpenForUpdate | kXMPFiles_OpenUsePacketScanning;
				ok = myFile.OpenFile(outfilePath, kXMP_UnknownFile, opts);
			}

			if (ok) {
				SXMPMeta meta = createXMPFromString(rawXmp);
				//SXMPMeta meta = createXMPFromRDF(rawXmp);

				// Check we can put the XMP packet back into the file
				if (myFile.CanPutXMP(meta))
				{
					// If so then update the file with the modified XMP
					myFile.PutXMP(meta);
				}

				// Close the SXMPFile.  This *must* be called.  The XMP is not
				// actually written and the disk file is not closed until this call is made.
				myFile.CloseFile();
			}

		}
		catch (XMP_Error & e) {
			cout << "ERROR: " << e.GetErrMsg() << endl;
		}

		SXMPFiles::Terminate();
		SXMPMeta::Terminate();
	}

	void HandleOKCallback() {
		Local<Value> argv[1] = { Nan::New<String>(outfilePath).ToLocalChecked() };
		callback->Call(1, argv);
	}

private:
	string outfilePath;
	string rawXmp;
};

class XmpReadWorker : public AsyncWorker {
public:
	XmpReadWorker(Callback * callback, string filename)
		: AsyncWorker(callback), filename(filename) {

	}

	void Execute() {

		cout << "Worker Thread Id: " << std::this_thread::get_id() << endl;

		SXMPMeta::Initialize();
		XMP_OptionBits options = 0;
		SXMPFiles::Initialize(options);

		try {
			// Options to open the file with - read only and use a file handler
			XMP_OptionBits opts = kXMPFiles_OpenForRead | kXMPFiles_OpenUseSmartHandler;

			bool ok;
			SXMPFiles myFile;

			ok = myFile.OpenFile(filename, kXMP_UnknownFile, opts);

			if (!ok)
			{
				opts = kXMPFiles_OpenForUpdate | kXMPFiles_OpenUsePacketScanning;
				ok = myFile.OpenFile(filename, kXMP_UnknownFile, opts);
			}

			// If the file is open then read the metadata
			if (ok)
			{
				// Create the xmp object and get the xmp data
				SXMPMeta meta;
				XMP_PacketInfo info;
				myFile.GetXMP(&meta, &rawXmp, &info);

				// Close the SXMPFile.  The resource file is already closed if it was
				// opened as read only but this call must still be made.
				myFile.CloseFile();
			}
		}
		catch (XMP_Error & e) {
			cout << "ERROR: " << e.GetErrMsg() << endl;
		}

		SXMPFiles::Terminate();
		SXMPMeta::Terminate();
	}

	void HandleOKCallback() {
		Local<Value> argv[1] = { Nan::New<String>(rawXmp).ToLocalChecked() };
		callback->Call(1, argv);
	}

private:
	string filename;
	string rawXmp;
};

NAN_METHOD(Version) {
	info.GetReturnValue().Set(
		Nan::New<String>("0.1").ToLocalChecked());
}

NAN_METHOD(SdkVersion) {
	XMP_VersionInfo version;
	SXMPMeta::GetVersionInfo(&version);

	info.GetReturnValue().Set(
		Nan::New<String>(version.message).ToLocalChecked());
}

NAN_METHOD(WriteXmp) {

	//cout << "V8 Thread Id: " << std::this_thread::get_id() << endl;

	v8::String::Utf8Value filenameArg(info[0]->ToString());
	std::string filename(*filenameArg);

	v8::String::Utf8Value rawXmpArg(info[1]->ToString());
	std::string rawXmp(*rawXmpArg);

	Callback *callback = new Callback(info[2].As<Function>());

	AsyncQueueWorker(new XmpWriteWorker(callback, filename, rawXmp));
}

// Add validation method

NAN_METHOD(ReadXmp) {

	//cout << "V8 Thread Id: " << std::this_thread::get_id() << endl;

	v8::String::Utf8Value val(info[0]->ToString());
	std::string filename(*val);

	Callback *callback = new Callback(info[1].As<Function>());

	AsyncQueueWorker(new XmpReadWorker(callback, filename));
}

NAN_MODULE_INIT(Init) {

	 Nan::Set(target, New<String>("version").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(Version)).ToLocalChecked());
	 Nan::Set(target, New<String>("sdkVersion").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(SdkVersion)).ToLocalChecked());
	 Nan::Set(target, New<String>("readXmp").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(ReadXmp)).ToLocalChecked());
	 Nan::Set(target, New<String>("writeXmp").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(WriteXmp)).ToLocalChecked());
}

NODE_MODULE(xmptoolkit, Init)

