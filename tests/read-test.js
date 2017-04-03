const test = require('tape');
const path = require('path');
const dom = require('xmldom').DOMParser
const serializer = require('xmldom').XMLSerializer
const xmptoolkit = require('../build/Release/xmptoolkit_nan_addon');

test('read rdf test', function (t) {
  const testfile = path.join(__dirname, './testfiles/Keller_Daniel_003_13_18cm.png');
  
  xmptoolkit.readXmp(testfile, function(error, rawXmp, outFilename, outAssetId, rdf) {
    if(error) {
      t.fail('xmp read failed');
    } else {
      const doc = new dom().parseFromString(rdf);
      const rdfElement = doc.getElementsByTagName('rdf:RDF')[0];
      const result = new serializer().serializeToString(rdfElement);
    }

    t.pass();

    t.end();
  });
});