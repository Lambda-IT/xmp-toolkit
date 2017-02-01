'use strict';

const xmptoolkit = require('./nodeaddon/build/Release/xmptoolkit');
const fs = require('fs');
const fse = require('fs-extra')
const jsonld = require('jsonld');
var $rdf = require('rdflib');

var testfiles = [
    "testfiles/BlueSquare.ai",
    "testfiles/BlueSquare.avi",
    "testfiles/BlueSquare.eps",
    "testfiles/BlueSquare.indd",
    "testfiles/BlueSquare.jpg",
    "testfiles/BlueSquare.mov",
    "testfiles/BlueSquare.mp3",
    "testfiles/BlueSquare.pdf",
    "testfiles/BlueSquare.png",
    "testfiles/BlueSquare.psd",
    "testfiles/BlueSquare.tif",
    "testfiles/BlueSquare.wav",
    "testfiles/Image1.jpg",
    "testfiles/Image2.jpg",
    "testfiles/Keller_Daniel_003_13_18cm.png",
    "testfiles/militaerpostkarte.pdf"
];

//logVersionInformation();

//validateXmp();

/*
testfiles.forEach(function(testfile) {
    writeXmp(testfile);
    //ReadXmp(testfile);
});
*/

//rdfToJsonLd();

//ReadXmp("outfiles/testfiles/BlueSquare.ai");
//writeXmp(testfiles[0]);

function validateXmp() {
    xmptoolkit.validateXmp(createTextXmpMetadata(), function(isValid) {
        console.log("IsValid: " + isValid);
    });  
}

function writeXmp(filepath) {
    var outfilePath = "outfiles/" + filepath
    fse.copy(filepath, outfilePath, function (err) {
        if (err) 
            return console.error(err);

        xmptoolkit.writeXmp(outfilePath, createTextXmpMetadata(), function(filepath) {
            console.log("File: " + filepath);
        });    
    });
}

function ReadXmp(filepath) {
    xmptoolkit.readXmp(filepath, function(rawXmp) {
        rdfToJsonLd(rawXmp);
        //console.log("Raw XMP: \n\n" + rawXmp + "\n\n");
    });
}

function logVersionInformation() {
    console.log("\nExport Information:\n");
    console.log("Addon Version: " + xmptoolkit.version());
    console.log("Xmp Toolkit SDK Version: " + xmptoolkit.sdkVersion());
}

function createTextXmpMetadata() {
    return "<rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'>" +
		"<rdf:Description>" +
		"<dc:subject>" +
		"<rdf:Bag>" +
		"<rdf:li>XMP</rdf:li>" +
		"<rdf:li>SDK</rdf:li>" +
		"<rdf:li>Test2</rdf:li>" +
		"</rdf:Bag>" +
		"</dc:subject>" +
		"<dc:format>image/tiff</dc:format>" +
		"</rdf:Description>" +
		"</rdf:RDF>";

/*
        <rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'>
		<rdf:Description rdf:about='' xmlns:dc='http://purl.org/dc/elements/1.1/'>
		<dc:subject>
		<rdf:Bag>
		<rdf:li>XMP</rdf:li>
		<rdf:li>SDK</rdf:li>
		<rdf:li>Test2</rdf:li>
		</rdf:Bag>
		</dc:subject>
		<dc:format>image/tiff</dc:format>
		</rdf:Description>
		</rdf:RDF>
        */
}

function getJsonLd() {
    return '[' +
        '{' +
                '"@id":"_:n0",' +
                '"type": [' +
                        '"http://www.w3.org/1999/02/22-rdf-syntax-ns#Bag"' +
                '],' +
                '"http://www.w3.org/1999/02/22-rdf-syntax-ns#_1": [' +
                        '{' +
                                '"@value": "XMP"' +
                        '}' +
                '],' +
                '"http://www.w3.org/1999/02/22-rdf-syntax-ns#_2": [' +
                        '{' +
                                '"@value": "SDK"' +
                        '}' +
                '],' +
                '"http://www.w3.org/1999/02/22-rdf-syntax-ns#_3": [' +
                        '{' +
                                '"@value": "Test2"' +
                        '}' +
                ']' +
        '},' +
        '{' +
                '"@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns",' +
                '"http://purl.org/dc/elements/1.1/subject": [' +
                        '{' +
                                '"@id": "_:n0"' +
                        '}' +
                '],' +
                '"http://purl.org/dc/elements/1.1/format": [' +
                        '{' +
                                '"@value": "image/tiff"' +
                        '}' +
                ']' +
        '}' +
    ']';
}

function rdfXmlToJsonld(rdfxmlDoc, callback) {
    var store = $rdf.graph();
    var contentType = 'application/rdf+xml';
    var baseUri = "http://lamda-it.ch";
        
    try {
        $rdf.parse(rdfxmlDoc, store, baseUri, contentType, function(err, doc) {
            var nquads = store.toString().replace(/{/g,'').replace(/}/g,'');

            jsonld.fromRDF(nquads, {format: 'application/nquads'}, function(err, jsonldDoc) {
                //var jsonString = JSON.stringify(jsonldDoc); 
                console.log(jsonldDoc);
                callback(null, jsonldDoc);
            });
        });
    } catch(err) {
        console.log("Main Error: " + err);
    }    
}

function jsonldToRdfXml(jsonldDoc) {
    jsonld.toRDF(jsonldDoc, {format: 'application/nquads', base: 'http://lamda-it.ch'}, function(err, nquadsDoc) {
        
        if(err) {
            console.log("Error while parsing json-ld: " + err);
            return;
        }

        console.log(nquadsDoc);

        var uri = "http://lamda-it.ch";
        var body = nquadsDoc;
        var mimeType = 'application/nquads';
        var store = $rdf.graph();

        $rdf.parse(body, store, uri, mimeType, function(err, doc) {
            if(err) {
                console.log("Error: " + err);
                return;
            }

            console.log("\n\nSecond: \n\n" + doc.toString());

            //console.log("\n\nSecond: \n\n" + JSON.stringify(doc.toString(), "\n", "\t"));

            $rdf.serialize(undefined, store, uri, "application/rdf+xml", function(err, str) {
                if(err) {
                    console.log("writeError: " + err);
                } else {
                    console.log(str);
                }
            });

        });
    });
}

function xmlToJson(xml) {
    var parseString = require('xml2js').parseString;
    parseString(xml, function (err, result) {
        //console.dir(result);
        console.log(JSON.stringify(result));
    });
}

// Remove the unused xmp lines/strings
function parseRawRdfFromXmp(rawXmp) {
    var result = rawXmp.replace('<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>', '');
    result = result.replace('<?xpacket end="r"?>', '');
    result = result.replace('<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 5.5.0">', '');
    result = result.replace('</x:xmpmeta>', '');
    return result.trim();
}

xmptoolkit.readXmp(testfiles[14], function(rawXmp) {
    //rawXmp = createTextXmpMetadata();
    var rawRdf = parseRawRdfFromXmp(rawXmp);
    console.log(rawRdf);

    //xmlToJson(rawRdf);


    rdfXmlToJsonld(rawRdf, function(err, jsonldString) {
        if(err) {
            conosole.log("Error while parsing RDF/XML file: \n" + err)
            return;
        }

        //console.log(jsonldString);
        //console.log(JSON.stringify(jsonldString));

        jsonldToRdfXml(jsonldString);
    });
});





