'use strict';

class Collection {
  constructor(href) {
    //collection+JSON data structure
    this.collection = {};
    this.collection.version = '1.0';
    this.collection.href = href;
    this.collection.items = [];
    this.collection.links = [];
    this.collection.queries = [];
    this.collection.templates = [];

    //Add home link
    this.addLink('home', href, '');
  }

  //print the data structure as beautified JSON string (for debugging)
  print() {
    console.log(JSON.stringify(this.getCollection(), null, 4));
  }

  getCollection() {
    var cjcollection = {};
    cjcollection.collection = this.collection;
    return cjcollection
  }


  addDataWithURI(uri, database) {
    addTemplate(database.template);
    //TODO
  }

  addItemWithId(id, database) {
    this.collection.items.push(item);
  }

  addItem(item) {
    this.collection.items.push(item);
  }

  addLink(rel, href, promt) {
    var link = new Link(rel, href, promt);
    this.collection.links.push(link);
  }

  addQuery(query) {
    this.collection.query.push(query);
  }

  addTemplate(template) {
    this.collection.templates.push(template);
  }
}
exports.Collection = Collection;

class Item {
  constructor(href, itemdataarray, links) {
    this.href = href;
    this.data = itemdataarray;
    this.links = links;
  }
}
exports.Item = Item;

class ItemData {
  constructor(name, value, promt) {
    this.name = name;
    this.value = value;
    this.promt = promt;
  }
}
exports.ItemData = ItemData;

class Link {
  constructor(rel, href, promt) {
    this.rel = rel;
    this.href = href;
    this.promt = promt;
  }
}
exports.Link = Link;