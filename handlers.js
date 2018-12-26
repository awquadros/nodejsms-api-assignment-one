// Define Handlers
const handlers = {};

// Hello World Handler
handlers.hello = function(data, callback) {
    // Callback a http status code, and a payload object
    callback(200, { 'message' : 'Hello World!'});
};

// Not found handler
handlers.notFound = function(data, callback) {
    callback(404);
};

module.exports = handlers;