var http = require("http");
var url = require("url");
var pageServer = require("./pageServer.js");
var express = require('express');

function start(route, handle, port){
	function onRequest(request, response){
		route(request, handle, pageServer, response);
	}
	connect.createServer(connect.static('html'))
	http.createServer(onRequest).listen(port);

	console.log("Server started..");
}

exports.start = start;