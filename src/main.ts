const net = require('net');
const tls = require('tls');

class Main {
    myConfig : Config;
    myMsg : string;

    private cliToConfig(params : any) : Config {
        return {url: params["_"][0], httpData: params["_"][1], httpVerb: "GET"};
    }

    private getHttpMessage(config : Config) : string {
        return config.httpVerb + " " + config.url + " HTTP/1.1\n";

    }

    private writeMessage(message : string) : string {

        // detect if HTTPs, then use https://nodejs.org/api/tls.html#tls_tls_connect_options_callback


        const s = net.Socket();
        const fullUrl = this.myConfig.url;
        var httpsSock;
        const wwwUrl = fullUrl.split("www.")[1];
        let theMsg = "";
        if(fullUrl.search(/https/gi)) {
            console.log("contains https");
            if (wwwUrl != undefined) {
                httpsSock = tls.connect(443, wwwUrl)
            }
            else{
                httpsSock = tls.connect(443, fullUrl);
            }

            httpsSock.write(this.myMsg);
            httpsSock.on('data', function(d : any) {
               console.log(d.toString()) ;
            })
            httpsSock.end();
        }
        else {
            if (wwwUrl != undefined) {
                s.connect(80, wwwUrl);
                theMsg = this.myMsg + "host: " + wwwUrl;
                //console.log(theMsg + "\n");
            }
            else {
                s.connect(80, fullUrl);
                theMsg = this.myMsg + "host: " + fullUrl;
                // console.log(theMsg+ "\n");
            }

            s.write(theMsg);
            s.on('data', function (d: any) {
                console.log(d.toString());
            })
            s.end();
        }

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
        this.myConfig = this.cliToConfig(params);
        this.myMsg = this.getHttpMessage(this.myConfig)
        console.log("it worked!");
        console.log(this.cliToConfig(params));
        var conInf = this.cliToConfig(params);
        console.log(this.getHttpMessage(conInf));
        //console.log(this.myConfig.url.split("www.")[1]);

        this.writeMessage(this.myMsg);
        //var test = "http://www.stuff.com";
        //console.log(test.split("http://" , 2));
        //console.log(test.split("http://")[1]);
        //console.log(test.split("www.")[1]);
        //console.log(this.myConfig);
        //console.log("msg: " + this.myMsg);
    }
}

const parsedParams : any = require('minimist')(process.argv.slice(2));
(new Main()).Main(parsedParams);

interface Config {
    url : string;
    httpVerb : "GET" | "POST";
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
