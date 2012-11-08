var http = require('http');
var fs = require('fs');
var cache = {};

function servePage(response, path){
	if(typeof cache[path] === 'string')
	{
		response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(cache[path], 'utf-8');
	}
	else
	{
		fs.readFile(path, function(error, content){
			if(error)
			{
				response.writeHead(500);
				response.end();
			}
			else
			{
				cache[path] = content;
				response.writeHead(200, { 'Content-Type': 'text/html' });
		        response.end(content);
			}
		});
	}
}

exports.servePage = servePage;