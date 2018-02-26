'use strict';

var cj = require('./cj.js');
var ds = require('./datastructure.js');


class Persons extends ds.Datastructure {
  addPerson(givenname, familyname, phonenumber, address) {
    var person = {};
    person.givenname = givenname;
    person.familyname = familyname;
    person.phonenumber = phonenumber;
    person.address = address;
    person.id = (this.uniqueID++).toString();
    this.data.push(person);
  }

  //Random data from http://www.fakeaddressgenerator.com/
  generateTestData() {
    this.addPerson('Mario', 'Wirtz', '03372 63 80 71', 'http://localhost:1337/addresses/0');
    this.addPerson('Lisa', 'Pfeiffer', '09603 82 34 76', 'http://localhost:1337/addresses/1');
    this.addPerson('Ralf', 'Engel', '0421 62 75 54', 'http://localhost:1337/addresses/2');
    this.addPerson('Roland', 'Carroll', '0680 826 59 97', 'http://localhost:1337/addresses/2');
  }

  getTemplate() {
    var itemdata;
    var data = [];
    itemdata = new cj.ItemData('givenname', '', 'givenname');
    data.push(itemdata);
    itemdata = new cj.ItemData('familyname', '', 'familyname');
    data.push(itemdata);
    itemdata = new cj.ItemData('phonenumber', '', 'phonenumber');
    data.push(itemdata);
    itemdata = new cj.ItemData('address', '', 'Link to address');
    data.push(itemdata);
    return {
      data
    };
  }

  convertDataToCJ(baseaddress, data) {
    var itemdata;
    var itemdataarray = [];
    var links = [];
    var person = data;
    itemdata = new cj.ItemData('givenname', person.givenname, 'givenname');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('familyname', person.familyname, 'familyname');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('phonenumber', person.phonenumber, 'phonenumber');
    itemdataarray.push(itemdata);
    links.push(new cj.Link('address', person.address, 'Link to address'));
    var item = new cj.Item(baseaddress + '/' + this.uri + '/' + person.id, itemdataarray, links);
    return (item);
  }
}

exports.Persons = Persons;