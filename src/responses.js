"use strict";

var paths = require('./paths.js');
var cj = require('./cj.js');
var persons = require('./persons.js');
var adresses = require('./adresses.js');
var db = require('./database.js');
var datab = new db.Database();

var cType = 'application/json';

//invoked when GET request on root URI
function getRoot(req, res) {
  var cjdata = new cj.Collection(paths.getBase(req));
  var i = 0;
  for (i = 0; i < datab.datastructures.length; i++) {
    var uri = datab.datastructures[i].uri;
    cjdata.addLink(uri, paths.getBase(req) + '/' + uri, '');
  }
  res.type(cType);
  res.status(200).send(cjdata);
}
exports.getRoot = getRoot;

//invoked when GET request on item array (for example: 'localhost/persons/')
function getAll(req, res) {
  var cjdata = new cj.Collection(paths.getBase(req));
  cjdata.addTemplate(datab.getTemplate(paths.getRelPath(req)));
  cjdata.collection.items = datab.getItemsArray(paths.getBase(req), paths.getRelPath(req))
  res.type(cType);
  res.status(200).send(cjdata);
}
exports.getAll = getAll;

//invoked when GET request on single item (for example: 'localhost/persons/123')
function getID(req, res, next) {
  var id = req.params.id;
  var cjdata = new cj.Collection(paths.getBase(req));
  cjdata.addTemplate(datab.getTemplate(paths.getRelPath(req)));
  cjdata.collection.items = datab.getItem(paths.getBase(req), paths.getRelPath(req), id);
  if (cjdata.collection.items == undefined) {
    next();
  } else {
    res.type(cType);
    res.status(200).send(cjdata);
  }
}
exports.getID = getID;

function deleteID(req, res, next) {
  var id = req.params.id;
  if (datab.deleteItem(paths.getRelPath(req), id) == true) {
    res.status(200).send('');
  } else {
    next();
  }
}
exports.deleteID = deleteID;

function postData(req, res, next) {
  var id = datab.addItemwithTemplate(paths.getRelPath(req), req.body);
  console.log('post DATA');
  if (id >= 0) {
    res.type(cType);
    res.location(paths.getBase(req) + '/' + paths.getRelPath(req) + '/' + id);
    res.status(201).send(''); //Status 201 Created
    //no body is sent back for POST requests
    //see: http://amundsen.com/media-types/collection/format/#read-write
  } else {
    next();
  }
}
exports.postData = postData;

function putData(req, res, next) {
  var id = req.params.id;
  var sucsess = datab.updateItemwithTemplate(paths.getRelPath(req), id, req.body);
  console.log('PUT DATA');
  if (sucsess) {
    res.type(cType);
    res.location(paths.getBase(req) + '/' + paths.getRelPath(req) + '/' + id);
    res.status(201).send(''); //Status 201 Created
    //no body is sent back for POST requests
    //see: http://amundsen.com/media-types/collection/format/#read-write
  } else {
    next();
  }
}
exports.putData = putData;