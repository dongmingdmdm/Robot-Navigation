var server = require("./server.js");
var router = require("./router.js");
var requestHandlers = require("./requestHandlers.js");

var handle = {};
handle["/"] = requestHandlers.onStartRequest;
handle["/start"] = requestHandlers.onStartRequest;
handle["/upload"] = requestHandlers.onUploadRequest;
handle["/click"] = requestHandlers.onClickRequest;
handle['/send'] = requestHandlers.onSendRequest;

server.start(router.route, handle, 8888);