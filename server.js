/** Process Laravel Configurations **/
require('dotenv').config();

/** define node variable **/
var is_debug = process.env.APP_DEBUG;
var socket_port = process.env.SOCKET_IO_PORT || 3000;

/** Load Node Dependencies **/
var fs = require('fs');
var mysql = require('mysql');
var https = require('https');
var http = require('http');
var app = require('express')();

/** Run Node on https **/
if (process.env.SOCKET_SSL_ENABLED == true) {
    var server = https.createServer({
        requestCert: false,
        rejectUnauthorized: false,
        key: fs.readFileSync(__dirname + '/certs/your_cert_private.key'),
        cert: fs.readFileSync(__dirname + '/certs/your_domain_certificate.crt'),
    }, app);
} else {
    /** Run Node on http **/
    var server = http.createServer(app);
}

server.listen(socket_port);

if (is_debug) {
    console.log('Socket is running on PORT: ' + socket_port);
}

/** Define Socket if needed **/
var io = require('socket.io')(server);
