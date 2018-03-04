'use strict';

var cj = require('./cj.js');
var ds = require('./datastructure.js');

class Addresses extends ds.Datastructure {
  addAddress(country, state, city, zipCode, streetAddress) {
    var address = {};
    address.country = country;
    address.state = state;
    address.zipCode = zipCode;
    address.city = city;
    address.streetAddress = streetAddress;
    address.id = (this.uniqueID++).toString();
    this.data.push(address);
  }

  //Random data from http://www.fakeaddressgenerator.com/
  generateTestData() {
    this.addAddress('Germany', 'Bayern', 'Stephanskirchen', '83071', 'Jahnstrasse 31');
    this.addAddress('Germany', 'Bayern', 'Dietfurt', '92343', 'Güntzelstrasse 6');
    this.addAddress('Austria', 'Carinthia', 'Edern', '9560', 'Im Astenfeld 44');
    this.addAddress('Austria', 'Upper Austria', 'Steinkirchen an der Traun', '4652', 'Alpenstrasse 53');
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
    itemdata = new cj.ItemData('streetAddress', '', 'streetAddress');
    data.push(itemdata);
    return {
      data
    };
  }

  convertDataToCJ(baseaddress, data) {
    var itemdata;
    var itemdataarray = [];
    var links = [];
    var address = data;
    itemdata = new cj.ItemData('country', address.country, 'country');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('state', address.state, 'state');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('zipCode', address.zipCode, 'zipCode');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('city', address.city, 'city');
    itemdataarray.push(itemdata);
    itemdata = new cj.ItemData('streetAddress', address.streetAddress, 'streetAddress');
    itemdataarray.push(itemdata);
    var item = new cj.Item(baseaddress + '/' + this.uri + '/' + address.id, itemdataarray, links);
    return (item);
  }

}

exports.Addresses = Addresses;