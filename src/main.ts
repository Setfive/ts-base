const socket = require('net').Socket();
const tls = require('tls');

class Main {

    private cliToConfig(params : any) : Config {
        return {url: "", httpData: "", httpVerb: "get"};
    }

    private getHttpMessage(config : Config) : string {
        return "";
    }

    private writeMessage(message : string) : string {

        // detect if HTTPs, then use https://nodejs.org/api/tls.html#tls_tls_connect_options_callback

        /**
         * Socket example:
         * var s = socket.Socket();
         s.connect(80, 'google.com');
         s.write('GET http://www.google.com/ HTTP/1.1\n\n');

         s.on('data', function(d){
    console.log(d.toString());
});
         s.end();
         */
        return "";
    }

    public Main(params : any) : void {
        console.log("it worked!");
        console.log(params);
        console.log(params["_"][0]);
    }
}

const parsedParams : any = require('minimist')(process.argv.slice(2));
(new Main()).Main(parsedParams);

interface Config {
    url : string;
    httpVerb : "get" | "post";
    httpData : string;
}

/**
 Parse the command line arguments, recognize url and switching to POST *
 Add a function to get the HTTP message that you need to send *
 Fetch the URL
 Open socket
 Write message
 Get data back
*/
