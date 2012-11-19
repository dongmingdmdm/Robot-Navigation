var querystring = require("querystring");
var url = require("url");
var ros = require('rosnodejs/lib/ros');

function onStartRequest(request, response, pageServer){
	pageServer.servePage(response, "./html/test.html");
}

function onUploadRequest(request, response, pageServer){
	pageServer.servePage(response, "./html/test.html");
}

function onClickRequest(request, response, pageServer){
	var x = querystring.parse(url.parse(request.url).query)["x"];
	var y = querystring.parse(url.parse(request.url).query)["y"];
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<html><body>X:" + x + ", Y:" + y + "</body></html>");
	response.end();
}

function onSendRequest(request, response, pageServer){
	ros.types([
	           'std_msgs/String'
	         ], function(String) {
	           var node = ros.node('talker');
	           node.topics([
	             { topic: 'publish_example', messageType: String }
	           ], function(publishExample) {
	             var message = new String({ data: querystring.parse(url.parse(request.url).query)['msg'] });
	             publishExample.publish(message);
	             response.writeHead(200, {"Content-Type": "text/html"});
         		 response.end();
	           });
	         });
}

exports.onStartRequest = onStartRequest;
exports.onUploadRequest = onUploadRequest;
exports.onClickRequest = onClickRequest;
exports.onSendRequest = onSendRequest;