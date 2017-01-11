export class Logger {

    private static isDebugMode : boolean = true;

    static i(message : string) {
        console.log(message);
    }

    static d(message : string) {
        console.log(message);
    }
}