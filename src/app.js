/*****************************************************************************
 * A RESTful API demonstration with a Cj response from a server              *
 * ***************************************************************************/
"use strict";

var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var port = process.env.PORT || 1337;
var responses = require('./responses.js');


//disables strict routing
//so http://IP:PORT/path/to/object is the same as http://IP:PORT/path/to/object/
app.disable('strict routing');

//Use JSON-parser for POST and PUT body data
app.use(bodyParser.json());


//Routes for GET
app.get('/', responses.getRoot);
app.get('/persons/:id', responses.getID);
app.get('/persons/', responses.getAll);
app.get('/addresses/:id', responses.getID);
app.get('/addresses/', responses.getAll);

//Routes for POST
app.post('/persons', responses.postData);
app.post('/addresses', responses.postData);

//Routes for DELETE
app.delete('/persons/:id', responses.deleteID);
app.delete('/addresses/:id', responses.deleteID);

//Routes for PUT
app.put('/persons/:id', responses.putData);
app.put('/addresses/:id', responses.putData);

//Start server
app.listen(port, () => console.log('Example app listening on port ' + port.toString() + '!'));
// EOD **********************************