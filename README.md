# xmp-toolkit
Library to read and write xmp metadata in files

## Features
* Read XMP from file
* Write XMP Information to file

## Supported Platforms
* Windows platform
* Mac platform

## Version information
### 1.0.0
* Read XMP from file
* Write XMP Information to file
* Add Windows platform support
* Add Mac platform support

## Installation
### Node.js

npm install Lambda-IT/xmp-toolkit

## API Documentation

### TypeScript
```typescript
/**
 * Return the toolkkit version
 * @returns {string} Version information
 */
function version(): string;

/**
 * Return the Adobe XMP SDK version
 * @returns {string} Version information
 */
function sdkVersion(): string;

/**
 * Reads the xmp information from a file
 * @param filepath Source file path
 * @param readCallback Read Handler
 */
function readXmp(filepath: string, readCallback: (error: string, rawXmp: string, filename: string, assetId: string, xmp: string) => void);

/**
 * Write the xmp information to a file  - overwrites exsiting xmp
 * @param filepath Source file path
 * @param readCallback Read Handler
 */
function writeXmp(filepath: string, rawXmp: string, writeCallback: (error: string, outfilePath: string) => void)

 

## License

### Adobe Xmp Toolkit (BSD License)

Copyright (c) 1999 - 2016, Adobe Systems IncorporatedAll rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

* Neither the name of Adobe Systems Incorporated, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOTLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FORA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER ORCONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, ORPROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OFLIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDINGNEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THISSOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.




