"use strict";

var url = require('url');

function getBase(req) {
  return (req.protocol + '://' + req.headers.host);
}

function getPath(req) {
  return (url.parse(req.url).pathname);
}

function getFull(req) {
  return (req.protocol + '://' + req.headers.host + req.originalUrl);
}

function getRelPath(req) {
  var path = getPath(req);
  if (path.split('/').length < 2) {
    return ('');
  }
  return (path.split('/')[1]); //Get the relative path (valid paths are: persons, adresses)
}

function getIdPath(req) {
  var path = getPath(req);
  if (path.split('/').length < 3) {
    return ('');
  }
  return (path.split('/')[2]); //Get the relative path (valid paths are: persons, adresses)
}

exports.getBase = getBase;
exports.getPath = getPath;
exports.getFull = getFull;
exports.getRelPath = getRelPath;
exports.getIdPath = getIdPath;