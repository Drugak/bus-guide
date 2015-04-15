'use strict'


var http =require('http'),
    url = require('url'),
    server = new http.Server(function(req,res) {
        console.log(req.method, req.url);

        var urlParsed = url.parse(req.url, true);
        console.log(urlParsed);

        if(urlParsed.pathname == '/echo' && urlParsed.query.msg){
            res.end(urlParsed.query.msg);
        } else {
            res.statusCode = 404;
            res.end('Page not found');
        }

    });

server.listen(1337, '127.0.0.1');