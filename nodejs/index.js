var server = require("./server.js");
var router = require("./router.js");
var requestHandlers = require("./requestHandlers.js");

var handle = {};
handle["/"] = requestHandlers.onStartRequest;
handle["/start"] = requestHandlers.onStartRequest;
handle["/upload"] = requestHandlers.onUploadRequest;

server.start(router.route, handle, 8888);