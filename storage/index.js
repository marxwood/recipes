class Storage {
  constructor(){

    if(this.constructor === Storage){
      throw new TypeError('Storage is an abstract class and cannt be instantiated');
    }

    this.interface();
  }

  interface(){

    switch(undefined){
      case this.getItem:
      case this.getItems:
      case this.getItemsBySlug:
        throw new TypeError('Concrete Storage implementation must have all interface methods implemented'); break;
    }
  }

  static instantiate(implementation){

    const ShallowStorage = require('./shallowStorage');
    const MongoStorage = require('./mongoStorage');
    const ArangoStorage = require('./arangoStorage');

    switch(implementation){
      case 'shallow': return new ShallowStorage(); break;
      case 'mongo': return new MongoStorage();  break;
      case 'arango': return new ArangoStorage();  break;
    }
  }
}
module.exports = Storage;
