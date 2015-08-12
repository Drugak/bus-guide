var http = require('http');
var fs = require('fs');
var url = require('url');
var chat = require('./chat');
var express = require('express');
var path = require('path');
var chalk = require( "chalk" );
var staticFileServer = require( "./lib/static-file-server" );
var app = express();

// Create an instance of our static file server.
var fileServer = staticFileServer.createServer({


    // I tell the static file server which directory to use when resolving paths.
    documentRoot: ( __dirname + "/wwwroot/"),

    // I tell the static file server which default document to use when the user requestuests
    // a directory instead of a file.
    defaultDocument: "index.html",

    // I tell the static file server the max-age of the Cache-Control header.
    maxAge: 604800, // 7 days.

    // I tell the static file server which portions of the URL path to strip out before
    // resolving the path against the document root. This allows parts of the URL to serve
    // as a cache-busting mechanism without having to alter the underlying file structure.
    magicPattern: /build-[\d.-]+/i,

    // I tell the static file server the maximum size of the file that can be cached in
    // memory (larger files will be piped directly from the file system).
    maxCacheSize: ( 1024 * 100 ) // 100Kb.
});


// Create an instance of our http server.
var httpServer = http.createServer(
        function handlerequestuest (request,response) {

            // For now, just pass the incoming requestuest off to the static file server; we'll
            // assume that all requestuests to this app are for static files.

            fileServer.serveFile( request, response );

            console.log(1);

            var urlParsed = url.parse(request.url);

            console.log(2);

            switch (urlParsed.pathname) {
                case '/subscribe':
                    chat.subscribe(request, response);
                    break;

                case '/publish':
                    var body = '';

                    request
                        .on('readable', function () {
                            body += request.read();

                            if (body.length > 1e4) {
                                response.statusCode = 413;
                                response.end("Your message is too big for my little chat");
                            }
                        })
                        .on('end', function () {
                            try {
                                body = JSON.parse(body);
                            } catch (e) {
                                response.statusCode = 400;
                                response.end("Bad requestuest");
                                return;
                            }

                            chat.publish(body.message);
                            response.end("ok");
                        });

                    break;

                default:
                    response.statusCode = 404;
                    response.end("Not found");

            }
        }


).listen(3000);

function sendFile(fileName, response) {
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on('error', function() {
            response.statusCode = 500;
            response.end("Server error");
        })
        .pipe(response)
        .on('close', function() {
            fileStream.destroy();
        });
}
console.log(chalk.cyan("Server running port 3000"));