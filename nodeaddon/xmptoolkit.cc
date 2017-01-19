
#include <nan.h>
#include <node.h>
#include <iostream>
#include <string>
#include <fstream>

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

	SXMPMeta::Initialize();
	XMP_OptionBits options = 0;
	SXMPFiles::Initialize(options);

	try {
		// Options to open the file with - open for editing and use a smart handler
		XMP_OptionBits opts = kXMPFiles_OpenForUpdate | kXMPFiles_OpenUseSmartHandler;

		bool ok;
		SXMPFiles myFile;

		// First we try and open the file
		ok = myFile.OpenFile(filename, kXMP_UnknownFile, opts);

		if (!ok)
		{
			opts = kXMPFiles_OpenForUpdate | kXMPFiles_OpenUsePacketScanning;
			ok = myFile.OpenFile(filename, kXMP_UnknownFile, opts);
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

	} catch (XMP_Error & e) {
		cout << "ERROR: " << e.GetErrMsg() << endl;
	}

	SXMPFiles::Terminate();
	SXMPMeta::Terminate();

	info.GetReturnValue().Set(
		Nan::New<String>(filename).ToLocalChecked());
}

// Add validation method

NAN_METHOD(ReadXmp) {
	v8::String::Utf8Value val(info[0]->ToString());
	std::string filename(*val);

	SXMPMeta::Initialize();
	XMP_OptionBits options = 0;
	SXMPFiles::Initialize(options);
	
	std::string rawXmp;

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

	info.GetReturnValue().Set(
		Nan::New<String>(rawXmp).ToLocalChecked());
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

