'use strict';

const xmptoolkit = require('./nodeaddon/build/Release/xmptoolkit');
const fs = require('fs');
const fse = require('fs-extra')

//var filepath = "testfiles/BlueSquare.png";
//var filepath = "testfiles/BlueSquare.jpg";
//var filepath = "testfiles/BlueSquare.pdf";
//var filepath = "testfiles/BlueSquare.tif";
//var filepath = "testfiles/Image1.jpg";
//var filepath = "testfiles/Image2.jpg";
var filepath = "testfiles/Keller_Daniel_003_13_18cm.png";
//var filepath = "testfiles/militaerpostkarte.pdf";

logVersionInformation();
//ReadXmp("outfiles/" + filepath);
//ReadXmp(filepath);
writeXmp(filepath);

function writeXmp(filepath) {
    var outfilePath = "outfiles/" + filepath
    fse.copy(filepath, outfilePath, function (err) {
        if (err) 
            return console.error(err);

        var writeResult = xmptoolkit.writeXmp(outfilePath, createTextXmpMetadata());
        console.log("WriteResult: \n\n" + writeResult);
    });
}

function ReadXmp(filepath) {
    var rawXmp = xmptoolkit.readXmp(filepath);
    console.log("Raw XMP: \n\n" + rawXmp + "\n\n");
}

function logVersionInformation() {
    console.log("\nExport Information:\n");
    console.log("Addon Version: " + xmptoolkit.version());
    console.log("Xmp Toolkit SDK Version: " + xmptoolkit.sdkVersion());
    console.log("Read XMP from file: :" + filepath + "\n");
}

function createTextXmpMetadata() {
    return "<rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'>" +
		"<rdf:Description rdf:about='' xmlns:dc='http://purl.org/dc/elements/1.1/'>" +
		"<dc:subject>" +
		"<rdf:Bag>" +
		"<rdf:li>XMP</rdf:li>" +
		"<rdf:li>SDK</rdf:li>" +
		"<rdf:li>Mauro</rdf:li>" +
		"</rdf:Bag>" +
		"</dc:subject>" +
		"<dc:format>image/tiff</dc:format>" +
		"</rdf:Description>" +
		"</rdf:RDF>";
}