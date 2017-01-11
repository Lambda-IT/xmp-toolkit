import {Logger} from './logger'

export class XmpParser {

    parse(file : Buffer) : string {
        return this.findXmp(file);
    }

    findXmp(file : Buffer) : string {
        //console.log("File lenght: " + file.length + " bytes");

        Logger.i("File lenght: " + file.length + " bytes");

        let bufferLenght : number = file.length;
        let bufferPos : number = 0;
        let numberOfMarkers : number = 0;

        if(bufferLenght < 2 || file.readUInt16BE(bufferPos) != 0xFFD8) {
            Logger.i("Invalid JPEG");
            return;
        } else {
            Logger.i("Valid JPEG");
            bufferPos += 2;
        }

        while(bufferPos < bufferLenght - 2) {
            let marker = file.readUInt16BE(bufferPos);
            bufferPos += 2;
            if(marker == 0xFFE1) { // APP1 Marker
                Logger.d("\nSegment found at position: " + bufferPos);
                this.readApp1Segment(file, bufferPos);
                numberOfMarkers++
            }
        }

        Logger.d("APP Marker found: " + numberOfMarkers);

        return "Complete";
    }

    readApp1Segment(fileBuffer : Buffer, offset : number) {
        let segmentSize : number = fileBuffer.readUInt16BE(offset);
        Logger.d("Segment Size: " + segmentSize);
        
        let namespace : string = this.getStringFromBuffer(fileBuffer, offset + 2, 29);
        Logger.d("namespace: " + namespace);

        let packet : string =  this.getStringFromBuffer(fileBuffer, offset + 31, segmentSize - 31);
        Logger.d("packet: \n\n" + packet + "\n");
    }

    getStringFromBuffer(buffer : Buffer, start : number, length : number) {
        let outputBuffer = new Buffer(length);

        let offset = 0;
        for (var n = start; n < start + length; n++) {
            outputBuffer.writeUInt8(buffer.readUInt8(n), offset);
            offset++;
        }

        let StringDecoder = require('string_decoder').StringDecoder;
        const decoder = new StringDecoder('utf8'); 

        return decoder.write(outputBuffer).trim();
    }
}