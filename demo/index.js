var xmptoolkit = require('xmptoolkit');
var fse = require('fs-extra')

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

function logVersionInformation() {
    console.log("\nExport Information:\n");
    console.log("Addon Version: " + xmptoolkit.version());
    console.log("Xmp Toolkit SDK Version: " + xmptoolkit.sdkVersion());
}

function readExample(filepath) {
    xmptoolkit.readXmp(filepath, function(rawXmp) {
        console.log("Raw XMP: \n\n" + rawXmp + "\n\n");
    });
}

function writeExample(filepath, xmp) {
    var outfilePath = "outfiles/" + filepath
    fse.copy(filepath, outfilePath, function (err) {
        if (err) 
            return console.error(err);

        xmptoolkit.writeXmp(outfilePath, xmp, function(filepath) {
            console.log("File: " + filepath);
        });    
    });
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


logVersionInformation();
readExample(testfiles[0]);
//writeExample(testfiles[1], createTextXmpMetadata());
