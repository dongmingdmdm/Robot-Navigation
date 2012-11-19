/*
  requestHandlers.js - This file contains all our request handlers.
  Author - Zach Piispanen
  Date - 10/2012
  Revised - 11/19/12
              -Commented code.
              -Added Code to integrate with ROS by publishing a msg on a topic.
*/

var querystring = require("querystring");
var url = require("url");
var ros = require('rosnodejs/lib/ros');

//A generic test page called /start, for determining if we can successfully reach certain pages with the global file server on
function onStartRequest(request, response, pageServer){
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write("<html><head><title>Start</title></head><body><h1>This is the /start page.</h1></body></html>");
	response.end();
}

//A generic test page called /upload, for determining if we can successfully reach certain pages with the global file server on
function onUploadRequest(request, response, pageServer){
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write("<html><head><title>Upload</title></head><body><h1>This is the /upload page.</h1></body></html>");
	response.end();
}

//Our click handler webpage.  When we click the form image, our page is redirrected here, where we then perform the ROS publish
function onClickRequest(request, response, pageServer){
	var x = querystring.parse(url.parse(request.url).query)["x"];
	var y = querystring.parse(url.parse(request.url).query)["y"];
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<html><body>You clicked the image at the following coordinates.<br>X:" + x + ", Y:" + y + "</body></html>");
	response.end();

	ros.types([
	   'std_msgs/String'
	 ], function(String) {
	   var node = ros.node('talker');
	   node.topics([
	     { topic: 'publish_example', messageType: String }
	   ], function(publishExample) {
	     var message = new String({ data: x });
	     var message2 = new String({ data: y });
	     publishExample.publish(message);
	     publishExample.publish(message2);
	   });
	 });
}

//A test publisher, that publishes the query string msg on the /publish_example topic
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
