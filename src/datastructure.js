'use strict';

var cj = require('./cj.js');

class Datastructure {
  constructor(uri) {
    this.uri = uri;
    this.data = [];
    this.uniqueID = 0;
  }

  getAll(baseadress) {
    baseadress = baseadress.replace(/\/+$/, ""); //remove trailing slashes
    var items = [];
    var i = 0;
    for (i = 0; i < this.data.length; i++) {
      items.push(this.convertDataToCJ(baseadress, this.data[i]));
    }
    return items;
  }

  getByID(baseadress, id) {
    baseadress = baseadress.replace(/\/+$/, ""); //remove trailing slashes
    var items = [];
    var itemdata;
    var itemdataarray = [];
    var links = [];
    var i = 0;
    for (i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        return (this.convertDataToCJ(baseadress, this.data[i]));
      }
    }
    return undefined;
  }

  delete(id) {
    var i = 0;
    for (i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        this.data.splice(i, 1)
        return true;
      }
    }
    return false;
  }

  addDataWithTemplate(template) {
    var templatedummy = this.getTemplate().data;
    var dataToCopy = template.template.data;
    var found;
    var i = 0;
    var x = 0;
    var data = {};
    for (i = 0; i < templatedummy.length; i++) {
      found = false;
      for (x = 0; x < dataToCopy.length; x++) {
        if (templatedummy[i].name == dataToCopy[x].name) {
          var name = templatedummy[i].name;
          found = true;
          data[name] = dataToCopy[x].value;
        }
      }
      if (found == false) {
        return -1; //template missmatch
      }
    }
    data.id = (this.uniqueID++).toString();
    this.data.push(data);
    return data.id;
  }

  updateDataWithTemplate(template, id) {
    var templatedummy = this.getTemplate().data;
    var dataToCopy = template.template.data;
    var found;
    var i = 0;
    var j = 0;
    var x = 0;
    var data = {};
    console.log('A');
    for (j = 0; j < this.data.length; j++) {
      console.log(this.data[j].id + id);
      if (this.data[j].id == id) {
        console.log("id found");
        for (i = 0; i < templatedummy.length; i++) {
          found = false;
          for (x = 0; x < dataToCopy.length; x++) {
            if (templatedummy[i].name == dataToCopy[x].name) {
              console.log(templatedummy[i].name);
              var name = templatedummy[i].name;
              found = true;
              data[name] = dataToCopy[x].value;
            }
          }
          if (found == false) {
            return false; //template missmatch
          }
        }
        data.id = id;
        this.data[j] = data;
        return true;
      }
    }
    return false;
  }

}

exports.Datastructure = Datastructure;