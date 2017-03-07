#include <nan.h>
#include <node.h>
#include <iostream>
#include <string>
#include <fstream>
#include <thread>

using namespace std;
using namespace Nan;
using namespace v8;

#define XMP_INCLUDE_XMPFILES 1 //if using XMPFiles 
#define TXMP_STRING_TYPE std::string 
#define NS_DIGAME "http://digame.born.ch/"

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

				// Check we can put the XMP packet back into the file
				if (myFile.CanPutXMP(meta))
				{
					// If so then update the file with the modified XMP
					cout << "Can put meta" << endl;
					myFile.PutXMP(meta);
				} else {
					error = "Unable to put the xmp metadata";
				}

				// Close the SXMPFile.  This *must* be called.  The XMP is not
				// actually written and the disk file is not closed until this call is made.
				myFile.CloseFile();
			} else {
				error = "Unable to read the file";
			}

		}
		catch (XMP_Error & e) {
			error = "XMP Error";
			cout << "ERROR: " << e.GetErrMsg() << endl;
		}

		SXMPFiles::Terminate();
		SXMPMeta::Terminate();
	}

	void HandleOKCallback() {
		Local<Value> argv[2] = { 
			Nan::New<String>(error).ToLocalChecked(),
			Nan::New<String>(outfilePath).ToLocalChecked() 
		};
		callback->Call(2, argv);
	}

private:
	string error;
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

				// Collect some information from Namespace: "http://digame.born.ch/"
				meta.GetProperty(NS_DIGAME, "Filename", &outFilename, NULL);
				meta.GetProperty(NS_DIGAME, "AssetId", &outAssetId, NULL);
			} else {
				error = "Unable to read the file";
			}
		}
		catch (XMP_Error & e) {
			error = "XMP Error";
			cout << "XMP Error: " << e.GetErrMsg() << endl;
		}

		SXMPFiles::Terminate();
		SXMPMeta::Terminate();
	}

	void HandleOKCallback() {
		Local<Value> argv[4] = { 
			Nan::New<String>(error).ToLocalChecked(),
			Nan::New<String>(rawXmp).ToLocalChecked(), 
			Nan::New<String>(outFilename).ToLocalChecked(),
			Nan::New<String>(outAssetId).ToLocalChecked()
		};
		callback->Call(4, argv);
	}

private:
    string error;
	string filename;
	string rawXmp;
	string outFilename;
	string outAssetId;
};

class XmpValidationWorker : public AsyncWorker {
public:
	XmpValidationWorker(Callback * callback, string rawXmp) :
		AsyncWorker(callback), rawXmp(rawXmp) {
	}

	void Execute() {

		cout << "Worker Thread Id: " << std::this_thread::get_id() << endl;

		SXMPMeta::Initialize();

		try {
			SXMPMeta meta = createXMPFromString(rawXmp);
			//meta.SetDefaultErrorCallback()
			//meta.set
			//meta.DumpObject()
			isValid = true;
		}
		catch (XMP_Error & e) {
			cout << "ERROR: " << e.GetErrMsg() << endl;
		}

		SXMPMeta::Terminate();
	}

	void HandleOKCallback() {
		Local<Value> argv[1] = { Nan::New<Boolean>(isValid)};
		callback->Call(1, argv);
	}

private:
	string rawXmp;
	bool isValid;
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
	v8::String::Utf8Value filenameArg(info[0]->ToString());
	std::string filename(*filenameArg);

	v8::String::Utf8Value rawXmpArg(info[1]->ToString());
	std::string rawXmp(*rawXmpArg);

	Callback *callback = new Callback(info[2].As<Function>());

	AsyncQueueWorker(new XmpWriteWorker(callback, filename, rawXmp));
}

NAN_METHOD(ValidateXmp) {
	v8::String::Utf8Value rawXmpArg(info[0]->ToString());
	std::string rawXmp(*rawXmpArg);

	Callback *callback = new Callback(info[1].As<Function>());

	AsyncQueueWorker(new XmpValidationWorker(callback, rawXmp));
}

NAN_METHOD(ReadXmp) {
	v8::String::Utf8Value val(info[0]->ToString());
	std::string filename(*val);

	Callback *callback = new Callback(info[1].As<Function>());

	AsyncQueueWorker(new XmpReadWorker(callback, filename));
}\

NAN_MODULE_INIT(Init) {

	 Nan::Set(target, New<String>("version").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(Version)).ToLocalChecked());
	 Nan::Set(target, New<String>("sdkVersion").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(SdkVersion)).ToLocalChecked());
	 Nan::Set(target, New<String>("readXmp").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(ReadXmp)).ToLocalChecked());
	 Nan::Set(target, New<String>("writeXmp").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(WriteXmp)).ToLocalChecked());
	 Nan::Set(target, New<String>("validateXmp").ToLocalChecked(),
		 GetFunction(New<FunctionTemplate>(ValidateXmp)).ToLocalChecked());
}  

NODE_MODULE(xmptoolkit_nan_addon, Init)
