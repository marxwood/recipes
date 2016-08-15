const Storage = require('./index');

class MongoStorage extends Storage{
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
module.exports = MongoStorage;
