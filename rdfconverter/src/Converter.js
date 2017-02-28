"use strict";
const childProcess = require("child_process");
function convertRdfXmlToN3() {
}
function convert() {
    const exec = childProcess.exec;
    exec('RdfLibConverter.py', (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(stdout);
    });
    const spawn = childProcess.spawn;
    const py = spawn('python', ['RdfLibConverter.py']);
    let dataString;
    py.stdout.on('data', function (data) {
        dataString += data.toString();
    });
    py.stdout.on('end', function () {
        console.log('Sum of numbers=', dataString);
    });
    py.stdin.write("outformat");
    py.stdin.end();
}
exports.convert = convert;
//# sourceMappingURL=Converter.js.map