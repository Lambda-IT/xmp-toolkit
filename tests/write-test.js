const test = require('tape');
const path = require('path');
const fs = require('fs-extra')
const dom = require('xmldom').DOMParser
const serializer = require('xmldom').XMLSerializer
const xmptoolkit = require('../build/Release/xmptoolkit_nan_addon');

// test('read rdf test SEM_Archiv_09y.jpg', function (t) {
//     const testfile = path.join(__dirname, './testfiles/SEM_Archiv_09y.jpg');

//         xmptoolkit.readXmp(testfile, function(error, rawXmp, rdf) {
//             if(error) {
//               console.log('XMP READ ========= ERROR: ',error);
//               t.fail('xmp read failed');
//             } else {
//               const doc = new dom().parseFromString(rdf);
//               const rdfElement = doc.getElementsByTagName('rdf:RDF')[0];
//               const result = new serializer().serializeToString(rdfElement);
//               console.log('rawXmp',rawXmp);
//               console.log('result',result);
//               t.pass();
//             }                  
        
//             t.end();
//         });
// });

// test('write rdf test SEM_Archiv_09y.jpg', function (t) {
//     const testfile = path.join(__dirname, './testfiles/SEM_Archiv_09y.jpg');
//     const targetFile = path.join(__dirname, './testoutput/SEM_Archiv_09y_changed.jpg');

//     const testRdfXml = require('./testfiles/keller-rdf').rdf;
//     fs.copy(testfile, targetFile, err => {
//         if (err) {
//             t.fail('file copy failed');
//         }

//         xmptoolkit.writeXmp(targetFile, testRdfXml, function (error, outFilename) {
//             if (error) {
//                 console.log('XMP WRITE ========= ERROR: ',error);
//                 t.fail('xmp write failed');
//             } else {
//                 console.log('outFilename',outFilename);
//                 t.pass();
//             }

//             t.end();
//         });
//     })
// });

test('write rdf test PAR 2090 CF 1_2_download_test.JPG', function (t) {
    const testfile = path.join(__dirname, './testfiles/PAR 2090 CF 1_2_download_test.JPG');
    const targetFile = path.join(__dirname, './testoutput/PAR 2090 CF 1_2_download_test_changed.JPG');

    const testRdfXml = require('./testfiles/radar-rdf').rdf;
    fs.copy(testfile, targetFile, err => {
        if (err) {
            t.fail('file copy failed');
        }

        xmptoolkit.writeXmp(targetFile, testRdfXml, function (error, outFilename) {
            if (error) {
                console.log('XMP WRITE ========= ERROR: ',error);
                t.fail('xmp write failed');
            } else {
                console.log('outFilename',outFilename);
                t.pass();
            }

            t.end();
        });
    })
});

test('write rdf test Keller_Daniel_003_13_18cm', function (t) {
    const testfile = path.join(__dirname, './testfiles/Keller_Daniel_003_13_18cm.png');
    const targetFile = path.join(__dirname, './testoutput/Keller_Daniel_003_13_18cm_write_changed.png');

    const testRdfXml = require('./testfiles/keller-rdf').rdf;

    fs.copy(testfile, targetFile, err => {
        if (err) {
            t.fail('file copy failed');
        }

        xmptoolkit.writeXmp(targetFile, testRdfXml, function (error, outFilename) {
            if (error) {
                t.fail('xmp read failed');
            } else {
                t.pass();
            }

            t.end();
        });
    })
});

test('write rdf test 6629_222', function (t) {
    const testfile = path.join(__dirname, './testfiles/6629_222.jpg');
    const targetFile = path.join(__dirname, './testoutput/6629_222_changed.jpg');

    const testRdfXml = require('./testfiles/6629-rdf').rdf;

    console.log('testRdfXml',testRdfXml);

    fs.copy(testfile, targetFile, err => {
        if (err) {
            t.fail('file copy failed');
        }

        xmptoolkit.writeXmp(targetFile, testRdfXml, function (error, outFilename) {
            if (error) {
                t.fail('xmp read failed');
            } else {
                xmptoolkit.readXmp(targetFile, function(error, rawXmp, rdf) {
                    if(error) {
                      t.fail('xmp read failed');
                    } else {
                      const doc = new dom().parseFromString(rdf);
                      const rdfElement = doc.getElementsByTagName('rdf:RDF')[0];
                      const result = new serializer().serializeToString(rdfElement);
                      console.log('rawXmp',rawXmp);
                      console.log('result',result);
                      t.pass();
                    }                  
                
                    t.end();
                  });
            }
        });
    })
});