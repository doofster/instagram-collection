'use strict';

/**
 * This is the entry point for the app.
 * This module spins up an API on an Express server and defers all logic to appropriate service classes
 */

//Load the Database Service class
let database = require('./lib/database-service.js');
database.init();
//database.deleteCollection({}); // refresh script

//Set up the app to use the Express module
let express = require('express');
let app = express();

//Set up json body parsing for POST requests
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

//Set up the port: 5000 unless otherwise defined (eg Heroku process)
app.set('port', (process.env.PORT || 5000));

//Set up the server to read static files from the public directory
app.use(express.static(__dirname + '/public'));

//Default route returns the home page
app.get('/', function(request, response) {
	response.render('public/index.html');
});

//API: GET collection
app.get('/api/collections', function(request, response) {
	database.getCollection(request, response);
});

//API: POST new collection
app.post('/api/create', function(request, response) {
	database.createCollection(request, response);
});

//Spin up server
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
