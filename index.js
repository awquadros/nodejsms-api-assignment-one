const url = require('url');
const http = require('http');
const config = require('./config');
const handlers = require('./handlers');
const router = require('./routers');
const httpServer = http.createServer((request, response) => {
    activate(request, response);
});

// Start the Server, and have it listen on port 3000 if no other is specified
httpServer.listen(config.httpPort, () => console.log('The server is listening on port ' + config.httpPort));

// Activate the server
function activate(request, response) {
    // Get the URL and parse it
    const parsedUrl = url.parse(request.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    const method = request.method.toLocaleLowerCase();

    // Get the header as an object
    const headers = request.headers;

    // Choose the handler this request should go to.
    const chosenHandler = typeof(router[method]) !== 'undefined' && typeof(router[method][trimmedPath]) !== 'undefined' 
        ? router[method][trimmedPath] 
        : handlers.notFound;

    // Construct the object to send to the handler
    const data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headers
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
        // Use the status code called back by the handler, or default to 200
        statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

        // Use the payload called by the handler, or default to an empty object
        payload = typeof(payload) === 'object' ? payload : {};

        // Convert the payload to a string
        const payloadString = JSON.stringify(payload);

        // Return the response
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(statusCode);
        response.end(payloadString);

        // Log the request path
        console.log('Returning this response ', statusCode);
    });

};