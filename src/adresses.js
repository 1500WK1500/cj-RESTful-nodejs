'use strict';

var cj = require('./cj.js');
var ds = require('./datastructure.js');

class Adresses extends ds.Datastructure {
  addAdress(country, state, zipCode, city, streetAdress) {
    var adress = {};
    adress.country = country;
    adress.state = state;
    adress.zipCode = zipCode;
    adress.city = city;
    adress.streetAdress = streetAdress;
    adress.id = (this.uniqueID++).toString();
    this.data.push(adress);
  }

  //Random data from http://www.fakeaddressgenerator.com/
  generateTestData() {
    this.addAdress('Germany', 'Bayern', 'Stephanskirchen', '83071', 'Jahnstrasse 31');
    this.addAdress('Germany', 'Bayern', 'Dietfurt', '92343', 'Güntzelstrasse 6');
    this.addAdress('Austria', 'Carinthia', 'Edern', '9560', 'Im Astenfeld 44');
    this.addAdress('Austria', 'Upper Austria', 'Steinkirchen an der Traun', '4652', 'Alpenstrasse 53');
  }

  getTemplate() {
    var itemdata;
    var data = [];
    itemdata = new cj.ItemData('country', '', 'country');
    data.push(itemdata);
    itemdata = new cj.ItemData('state', '', 'state');
    data.push(itemdata);
    itemdata = new cj.ItemData('zipCode', '', 'zipCode');
    data.push(itemdata);
    itemdata = new cj.ItemData('city', '', 'city');
    data.push(itemdata);
    itemdata = new cj.ItemData('streetAdress', '', 'streetAdress');
    data.push(itemdata);
    return {
      data
    };
  }

  convertDataToCJ(baseadress, data) {
    var itemdata;
    var itemdataarray = [];
    var links = [];
    var adress = data;
    itemdata = new cj.ItemData('country', adress.country, 'country');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('state', adress.state, 'state');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('zipCode', adress.zipCode, 'zipCode');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('city', adress.city, 'city');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('streetAdress', adress.streetAdress, 'streetAdress');
    itemdataarray.push(itemdata);
    var item = new cj.Item(baseadress + '/' + this.uri + '/' + adress.id, itemdataarray, links);
    return (item);
  }

}

exports.Adresses = Adresses;