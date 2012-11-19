var url = require("url");

function route(request, handle, pageServer, response){
	var pathname = url.parse(request.url).pathname;
	
	if(typeof handle[pathname] === 'function'){
		handle[pathname](request, response, pageServer);
	}
	else{
		response.writeHead(404, {"Content-Type" : "text/html"});
		response.write("404 Not found");
		response.end();
	}
		
}

exports.route = route;