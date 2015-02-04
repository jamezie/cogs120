/**

 */

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index1 = require('./routes/index');
var calendar1 = require('./routes/calendar');
// Create the server instance
var server = express();

// Print logs to the console and compress pages we send
server.use(express.logger());
server.use(express.compress());

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
server.set('port', process.env.PORT || 3000);
server.set('views', path.join(__dirname, 'views'));
server.engine('handlebars', handlebars());
server.set('view engine', 'handlebars');
server.use(express.favicon());
server.use(express.json());
server.use(express.urlencoded());
server.use(express.methodOverride());
server.use(express.cookieParser('Intro HCI secret key'));
server.use(express.session());
server.use(server.router);
server.use(express.static(path.join(__dirname, 'static')));


if ('development' == server.get('env')) {
  server.use(express.errorHandler());
}

server.get('/', index1.view);
server.get('/calendar', calendar1.cal);

// Start the server
http.createServer(server).listen(server.get('port'), function(){
  console.log('Express server listening on port ' + server.get('port'));
});