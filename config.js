/*
* Create and export configuration variables
*/
const defaultHttpPort = 3000;

// Determine which port the server must use to run
const currentHttpPort = typeof(process.env.NODE_HTTP_PORT) === 'string' ? process.env.NODE_HTTP_PORT.toLowerCase() : defaultHttpPort;

// Environment variables
const environment = {
    'httpPort' : currentHttpPort
};

// Export module
module.exports = environment;