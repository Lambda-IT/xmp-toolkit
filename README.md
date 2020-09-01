# xmp-toolkit
Library to read and write xmp metadata in files

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




