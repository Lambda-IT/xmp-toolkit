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

 


