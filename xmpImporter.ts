import {XmpParser} from './xmpParser'

export class XmpImporter {
    import(fileName : string) {
        let fs = require("fs");
        
        fs.exists(fileName, function(exists) {
            if (exists) {
                fs.stat(fileName, function(error, stats) {
                    fs.open(fileName, "r", function(error, fd) {
                        var buffer = new Buffer(stats.size);

                        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
                            let xmpParser = new XmpParser();
                            let parsedXmp = xmpParser.parse(buffer);
                            fs.close(fd);
                        });
                    });
                });
            }
        });
    }
}