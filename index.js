'use strict';

const xmptoolkit = require('./nodeaddon/build/Release/xmptoolkit');
const fs = require('fs');
const fse = require('fs-extra')

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

logVersionInformation();

testfiles.forEach(function(testfile) {
    console.log(testfile);
    //writeXmp(testfile);
    ReadXmp(testfile);
});

//ReadXmp(testfiles[0]);
//writeXmp(testfiles[0]);

function writeXmp(filepath) {
    var outfilePath = "outfiles/" + filepath
    fse.copy(filepath, outfilePath, function (err) {
        if (err) 
            return console.error(err);

        xmptoolkit.writeXmp(outfilePath, createTextXmpMetadata(), function(filepath) {
            console.log("WriteResult: \n\n" + filepath);
        });    
    });
}

function ReadXmp(filepath) {
    xmptoolkit.readXmp(filepath, function(rawXmp) {
        console.log("Raw XMP: \n\n" + rawXmp + "\n\n");
    });
}

function logVersionInformation() {
    console.log("\nExport Information:\n");
    console.log("Addon Version: " + xmptoolkit.version());
    console.log("Xmp Toolkit SDK Version: " + xmptoolkit.sdkVersion());
}

function createTextXmpMetadata() {
    return "<rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'>" +
		"<rdf:Description rdf:about='' xmlns:dc='http://purl.org/dc/elements/1.1/'>" +
		"<dc:subject>" +
		"<rdf:Bag>" +
		"<rdf:li>XMP</rdf:li>" +
		"<rdf:li>SDK</rdf:li>" +
		"<rdf:li>Test</rdf:li>" +
		"</rdf:Bag>" +
		"</dc:subject>" +
		"<dc:format>image/tiff</dc:format>" +
		"</rdf:Description>" +
		"</rdf:RDF>";
}