var http = require("http");
var url = require("url");

function start(route, handle, port){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		route(pathname, handle, response);
	}
	
	http.createServer(onRequest).listen(port);

	console.log("Server started..");
}

exports.start = start;