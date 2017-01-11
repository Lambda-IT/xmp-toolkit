export class XmpParser {

    parse(file : Buffer) : string {
        return this.findXmp(file);
    }

    findXmp(file : Buffer) : string {
        console.log("File lenght: " + file.length + " bytes");

        let bufferLenght : number = file.length;
        let bufferPos : number = 0;
        let numberOfMarkers : number = 0;

        if(bufferLenght < 2 || file.readUInt16BE(bufferPos) != 0xFFD8) {
            console.log("Invalid JPEG");
            return;
        } else {
            console.log("Valid JPEG");
            bufferPos += 2;
        }

        while(bufferPos < bufferLenght - 2) {
            let marker = file.readUInt16BE(bufferPos);
            bufferPos += 2;
            if(marker == 0xFFE1) { // APP1 Marker
                console.log("\nSegment found at position< " + bufferPos);
                this.readApp1Segment(file, bufferPos);
                numberOfMarkers++
            }
        }

        console.log("APP Marker found: " + numberOfMarkers);

        return "Complete";
    }

    readApp1Segment(fileBuffer : Buffer, offset : number) {
        let segmentSize : number = fileBuffer.readUInt16BE(offset);
        console.log("Segment Size: " + segmentSize);
        
        let namespace : string = this.getStringFromBuffer(fileBuffer, offset + 2, 29);
        console.log("namespace: " + namespace);

        let packet : string =  this.getStringFromBuffer(fileBuffer, offset + 33, segmentSize - 33);
        console.log("packet: " + packet);
    }

    getStringFromBuffer(buffer : Buffer, start : number, length : number) {
        let outputBuffer = new Buffer(length);

        //var outstr = "";
        let offset = 0;
        for (var n = start; n < start + length; n++) {
            outputBuffer.writeUInt8(buffer.readUInt8(n), offset);
            offset++;
        }

        let StringDecoder = require('string_decoder').StringDecoder;
        const decoder = new StringDecoder('utf8'); 

        return decoder.write(outputBuffer);
    }
}