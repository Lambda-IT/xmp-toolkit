export class XmpParser {
    parse(file : Buffer) : string {
        return this.findXmp(file);
    }

    findXmp(file : Buffer) : string {

        if(file.readUInt8(0) != 0xFF || file.readUInt8(1) != 0xD8) {
            console.log("Not a valid JPEG");
            return;
        } else {
            console.log("A valid JPEG");
        }

        console.log("Got file of length " + file.length + " bytes");

        var offset = 2;
        var length = file.length;
        var dom = require('xmldom').DOMParser;

        while (offset < length) {
            if (this.getStringFromDB(file, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = file.readUInt16LE(offset - 2) - 1;                
                var xmpString = this.getStringFromDB(file, startOffset, sectionLength)
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring(xmpString.indexOf('<x:xmpmeta'), xmpEndIndex);

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10
                //Custom written s/w append xml without any namespace. Following are some of them.
                //Without namespaces, XML is thought to be invalid by parsers
                xmpString = xmpString.slice(0, indexOfXmp) 
                            + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" ' 
                            + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                            + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                            + 'xmlns:plus="http://www.hacktoseeifthisworks.com/ks/did/this" '
                            + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                            + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                            + 'xmlns:stEvt="http://www.hacktoseeifthisworks.com/ks/did/this" '
                            + 'xmlns:stRef="http://www.hacktoseeifthisworks.com/ks/did/this" '
                            + 'xmlns:crs="http://www.hacktoseeifthisworks.com/ks/did/this" '
                            + 'xmlns:xapGImg="http://www.hacktoseeifthisworks.com/ks/did/this" '
                            + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                            + xmpString.slice(indexOfXmp)                       

                var domDocument = dom.parseFromString(xmpString, 'text/xml');
                return this.xml2json(domDocument).toString();
            } else{
             offset++;
            }
        }
           
        return "Complete";
    }

    xml2json(xml) {
          try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var attributes = item.attributes;               
                for(var idx in attributes) {            
                    var itemAtt = attributes[idx];          
                    var dataKey = itemAtt.nodeName;
                    var dataValue = itemAtt.nodeValue;

                    if(dataKey !== undefined) {             
                        obj[dataKey] = dataValue;
                    }
                }
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = this.xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(this.xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              console.log(e.message);
          }
    }

    getStringFromDB(buffer : Buffer, start, length) {
        var outstr = "";

        for (var n = start; n < start + length; n++) {
            outstr += String.fromCharCode(buffer.readUInt8(n));
        }
        return outstr;
    }
}