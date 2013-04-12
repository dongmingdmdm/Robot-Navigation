/*
  index.js - This is our main file, which is executed on the shell via $> node index.js
           - This will establish our server handlers and start the server up.
  Author - Zach Piispanen
  Date - 10/2012
  Revised - 11/19/12
              -Commented code.
*/
var server = require("./server.js");
var router = require("./router.js");
var requestHandlers = require("./requestHandlers.js");

//Our list of handlers, that will be handled prior to the webserver trying to interpret the page url
var handle = {};
handle["/"] = requestHandlers.onStartRequest;
handle["/start"] = requestHandlers.onStartRequest;
handle["/upload"] = requestHandlers.onUploadRequest;
handle["/click"] = requestHandlers.onClickRequest;
handle['/send'] = requestHandlers.onSendRequest;
handle['/map'] = requestHandlers.onMapRequest;

//Start the server up with the given router, handle, and port
server.start(router, handle, 8888);
