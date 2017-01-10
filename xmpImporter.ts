import {XmpParser} from './xmpParser'

var fs = require("fs");

export class XmpImporter {
    import(filename : string) {

        var data = fs.readFileSync(filename);
        
        let xmpParser = new XmpParser();
        let parsedXmp = xmpParser.parse(data);

        console.log(parsedXmp);
        
        return "test";
    }
}