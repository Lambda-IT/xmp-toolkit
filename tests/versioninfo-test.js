const test = require('tape');
const path = require('path');
const fs = require('fs-extra')
const xmptoolkit = require('../build/Release/xmptoolkit_nan_addon');

test('read version test', function (t) {
    let version = xmptoolkit.version();
    t.equal(version, '1.0.0');
    t.end();
});

test('read sdk version test', function (t) {
    let sdkVersion = xmptoolkit.sdkVersion();
    t.equal(sdkVersion, 'XMP Core 5.6.0');
    t.end();
});