function onStartRequest(response){
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello world: start");
	response.end();
}

function onUploadRequest(response){
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello world: upload");
	response.end();
}

exports.onStartRequest = onStartRequest;
exports.onUploadRequest = onUploadRequest;