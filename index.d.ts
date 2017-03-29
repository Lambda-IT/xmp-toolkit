/**
 * Return the toolkkit version
 * @returns {string} Version information
 */
export declare function version(): string;

/**
 * Return the Adobe XMP SDK version
 * @returns {string} Version information
 */
export declare function sdkVersion(): string;

/**
 * Reads the xmp information from a file
 * @param filepath Source file path
 * @param readCallback Read Handler
 */
export declare function readXmp(filepath: string, readCallback: (error: string, rawXmp: string, filename: string, assetId: string, xmp: string) => void)

/**
 * Write the xmp information to a file (overwrites exsiting xmp)
 * @param filepath Source file path
 * @param readCallback Read Handler
 */
export declare function writeXmp(filepath: string, rawXmp: string, writeCallback: (error: string, outfilePath: string) => void)