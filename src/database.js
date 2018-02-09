'use strict';

//var cj = require('./cj.js');
var persons = require('./persons.js');
var adresses = require('./adresses.js');

class Database {
  constructor() {
    this.datastructures = []; //array of datastructures (persons or adresses)
    var personDB = new persons.Persons('persons');
    personDB.generateTestData();
    this.datastructures.push(personDB);

    var adressDB = new adresses.Adresses('adresses');
    adressDB.generateTestData();
    this.datastructures.push(adressDB);
  }

  getItemsArray(baseadress, uri) {
    var i = 0;
    for (i = 0; i < this.datastructures.length; i++) {
      if (this.datastructures[i].uri == uri) {
        return this.datastructures[i].getAll(baseadress);
      }
    }
    return undefined;
  }

  getItem(baseadress, uri, id) {
    var i = 0;
    for (i = 0; i < this.datastructures.length; i++) {
      if (this.datastructures[i].uri == uri) {
        return this.datastructures[i].getByID(baseadress, id);
      }
    }
    return undefined;
  }

  getTemplate(uri) {
    var i = 0;
    for (i = 0; i < this.datastructures.length; i++) {
      if (this.datastructures[i].uri == uri) {
        return this.datastructures[i].getTemplate();
      }
    }
    return undefined;
  }

  deleteItem(uri, id) {
    var i = 0;
    for (i = 0; i < this.datastructures.length; i++) {
      if (this.datastructures[i].uri == uri) {
        return this.datastructures[i].delete(id);
      }
    }
    return false;
  }

  addItemwithTemplate(uri, template) {
    var i = 0;
    for (i = 0; i < this.datastructures.length; i++) {
      if (this.datastructures[i].uri == uri) {
        return this.datastructures[i].addDataWithTemplate(template);
      }
    }
    return -1;
  }

  updateItemwithTemplate(uri, id, template) {
    var i = 0;
    for (i = 0; i < this.datastructures.length; i++) {
      if (this.datastructures[i].uri == uri) {
        return this.datastructures[i].updateDataWithTemplate(template, id);
      }
    }
    return false;
  }

}
exports.Database = Database;