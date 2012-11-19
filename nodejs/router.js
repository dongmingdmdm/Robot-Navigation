/*
  router.js - This file contains the methods required to route traffic to our specific functions, as well as providing
            - a way to check to see if a route exists.
  Author - Zach Piispanen
  Date - 10/2012
  Revised - 11/19/12
              -Commented code.
              -Added routeExists to check for route existance
              -Added routeEnding to route based on a route, and not a request
*/
var url = require("url");

//Old routing method that takes a url request, ie http://www.example.com/test?query=test and breaks the pathname /test out of it.  Due to 
//using express, we now have the server invoke routeExists and then invoking routeEnding if true instead of providing a 404 page.  
//This is because express is a file/web server backend that will server up static webpages, where as the routes we provide will be dynamic in some
//way.
function route(request, handle, response){
	var pathname = url.parse(request.url).pathname;
	
	if(typeof handle[pathname] === 'function'){
		handle[pathname](request, response);
	}
	else{
		response.writeHead(404, {"Content-Type" : "text/html"});
		response.write("404 Not found");
		response.end();
	}
		
}

//Given a route, ie /test it will invoke the handle linked to it, and pass the request and response pointers to it.
//It is expected that routeExists has already been called with the same handler and name.
function routeEnding(name, handle, request, response){
	handle[name](request, response);
}

//Checks if the given name/route, ie /test, is handled by our router.
function routeExists(name, handle){
	return (typeof handle[name] === 'function');
}

exports.route = route;
exports.routeEnding = routeEnding;
exports.routeExists = routeExists;
