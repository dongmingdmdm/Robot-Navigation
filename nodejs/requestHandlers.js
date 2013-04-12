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
	var x = parseInt(querystring.parse(url.parse(request.url).query)["x"]);
	var y = parseInt(querystring.parse(url.parse(request.url).query)["y"]);
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<html><body>You clicked the image at the following coordinates.<br>X:" + x + ", Y:" + y + "</body></html>");
	response.end();

	ros.types([
	   'std_msgs/Int32'
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

function onMapRequest(request, response, pageServer) {
  console.log("Attempting map stuff...");
  ros.types([
     'nav_msgs/OccupancyGrid'
   ], function(pose) {
     var node = ros.node('listener');
     node.topics([
       { topic: 'map', messageType: pose }
     ], function(subscribeExample) {
        subscribeExample.subscribe( function(message) {
          console.log(message);
          response.writeHead(200, {"Content-Type":"text/html"});
	        response.write("<html><head><title>Upload</title></head><body><h1>This is the /upload page.</h1></body></html>");
	        response.end();
        });
     });
   });
   
   
  /*
  map.image.width = map.info.width;
  map.image.height = map.info.height;

  var imageData = context.createImageData(map.info.width, map.info.height);
  for ( var row = 0; row < map.info.height; row++) {
    for ( var col = 0; col < map.info.width; col++) {
      // determine the index into the map data
      var mapI = col + ((map.info.height - row - 1) * map.info.width);
      // determine the value
      if (map.data[mapI] == 100) {
        var val = 0;
      } else if (map.data[mapI] == 0) {
        var val = 255;
      } else {
        var val = 127;
      }

      // determine the index into the image data array
      var i = (col + (row * imageData.width)) * 4;
      // r
      imageData.data[i] = val;
      // g
      imageData.data[++i] = val;
      // b
      imageData.data[++i] = val;
      // a
      imageData.data[++i] = 255;
    }
  }
  context.putImageData(imageData, 0, 0);*/
}
exports.onStartRequest = onStartRequest;
exports.onUploadRequest = onUploadRequest;
exports.onClickRequest = onClickRequest;
exports.onSendRequest = onSendRequest;
exports.onMapRequest = onMapRequest;
