const _       = require('underscore');
const Storage = require('./index');

class ShallowStorage extends Storage{
  constructor(){
    super();
  }
  getItem(id, callback){
    const item = results.items[id];
    callback(item)
  }
  getItems(callback){
    callback(results.items)
  }
  getItemsBySlug(slug, callback){
    const items = _.filter(results.items, function(item){
      return item.name.indexOf(slug) > -1
    });
    callback(items);
  }
}
module.exports = ShallowStorage;

const results = {
    items: [
        {id: 1, name: "Item A"},
        {id: 2, name: "Item B"},
        {id: 3, name: "Item C"},
        {id: 4, name: "Item D"},
        {id: 5, name: "Item E"},
        {id: 6, name: "Item F"},
        {id: 7, name: "Item G"},
        {id: 8, name: "Item H"}
    ],
    about: {
        name: "About",
        content: "<p>Lorem ispum dolor sit amet consecteur orem ispum dolor sit amet consecteur. Lorem ispum dolor sit amet consecteur.</p>"
    }
}
