const Storage = require('./index');
const mongojs = require('mongojs');
const db      = mongojs('recipes');

class MongoStorage extends Storage{
  constructor(){
    super();
  }
  isTokenAvailable(code, callback){
    db.collection('sessions').findOne({'session.code':code}, function(err, token){
      callback(token);
    })
  }
  getItem(id, callback){
    db.collection('recipes').findOne({_id: mongojs.ObjectId(id)}, function(err, item){


      const ings = item.ingredients;
      db.collection('ingredients').find({code:{$in:ings}}, function(err, ingredients){
        callback({item, ingredients});
      })

    });
  }
  getItems(callback){
    db.collection('recipes').find({}, function(err, items){
        callback(items);
    });

  }
  getItemsBySlug(slug, callback){
    let _slug = new RegExp(slug);
    db.collection('recipes').find({name: _slug}, function(err, items){
        callback(items);
    })
  }
}
module.exports = MongoStorage;
