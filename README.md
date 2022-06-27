# xmp-toolkit
Library to read and write xmp metadata in files

[![XMP Testing](https://github.com/Lambda-IT/xmp-toolkit/actions/workflows/node.js.yml/badge.svg)](https://github.com/Lambda-IT/xmp-toolkit/actions/workflows/node.js.yml)

## Features
* Read XMP from file
* Write XMP Information to file

## Supported Platforms
* Windows platform
* Linux platform

## Version information
### 1.0.0
* Read XMP from file
* Write XMP Information to file
* Add Windows platform support
* Add Linux platform support
* Add Mac platform support

### 1.1.0

* Update XMP Library to v6.0.0
* Node 12-14 support
* Small fixes based on Node 12/14 compatibility
* Remove Mac platform support, try to use the v1.0.0

## Installation
### Node.js

`npm install Lambda-IT/xmp-toolkit`

`npm install git+https://github.com/Lambda-IT/xmp-toolkit.git`

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
```

## Development

### Link Collection for some happend errors

- [Adobe XMP Toolkit Page](https://www.adobe.com/devnet/xmp.html)
- [Adobe XMP Toolkit Source](https://github.com/adobe/XMP-Toolkit-SDK/)
- [Node nan Docs/Package](https://www.npmjs.com/package/nan)
- Linux Build
   - [Get Latest CMake for Debian based System (not documented in XMP Toolkit docs)](https://askubuntu.com/questions/355565/how-do-i-install-the-latest-version-of-cmake-from-the-command-line)
   - [Install Linux Dependencies, Script](https://github.com/adobe/XMP-Toolkit-SDK/pull/1/files)
- Windows Build
   - [Mismatch Error](https://stackoverflow.com/questions/7668200/error-lnk2038-mismatch-detected-for-iterator-debug-level-value-0-doesnt)
   - [MSBuild Tool](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild?view=vs-2019)
   - msbuild XMPToolkitSDK64.sln  /p:Configuration=Release /p:Platform="x64" (simpler than using VSC)


## License

### Adobe Xmp Toolkit (BSD License)

BSD 3-Clause License

Copyright (c) 2020, Adobe
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.




