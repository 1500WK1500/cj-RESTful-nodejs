'use strict';

//var cj = require('./cj.js');
var persons = require('./persons.js');
var addresses = require('./addresses.js');

class Database {
  constructor() {
    this.datastructures = []; //array of datastructures (persons or addresses)
    var personDB = new persons.Persons('persons');
    personDB.generateTestData();
    this.datastructures.push(personDB);

    var addressDB = new addresses.Addresses('addresses');
    addressDB.generateTestData();
    this.datastructures.push(addressDB);
  }

  getItemsArray(baseaddress, uri) {
    var i = 0;
    for (i = 0; i < this.datastructures.length; i++) {
      if (this.datastructures[i].uri == uri) {
        return this.datastructures[i].getAll(baseaddress);
      }
    }
    return undefined;
  }

  getItem(baseaddress, uri, id) {
    var i = 0;
    for (i = 0; i < this.datastructures.length; i++) {
      if (this.datastructures[i].uri == uri) {
        return this.datastructures[i].getByID(baseaddress, id);
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