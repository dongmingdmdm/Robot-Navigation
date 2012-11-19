/*
  server.js - This is our server.  It establishes which handlers we handle, where to go for requests we don't handle, 
            - and binds our server to a port.
  Author - Zach Piispanen
  Date - 10/2012
  Revised - 11/19/12
              -Commented code.
              -Implemented express app over a generic web server.
              -Check for existing routes and then use the file server if the route doesn't exist.
*/

var http = require("http");
var url = require("url");
var express = require('express');
var app = express();

//Configure the server to handle our routes, then whatever is in the html folder before 404'ing.
//Then start the server on the port.
function start(router, handle, port){
  //Use our specific router to handle our traffic.
  app.use(function(req, res, next){
    //Determine the route
    var path = url.parse(req.url).pathname;
    //If the route exists in our handler, handle it, otherwise let the next router try.
    if(router.routeExists(path, handle)){
      router.routeEnding(path, handle, req, res);
    }
    else{
      next();
    }
});

//Global routing for routes we don't handle ourselves.  It will look in the html folder for the files for serving the pages, otherwise the user gets a not found response.
app.use(express.static(__dirname + '/html'));

//Listen on the port for traffic.
app.listen(port);

console.log("Server started..");
}

exports.start = start;
