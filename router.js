const _       = require('underscore');
const express = require('express');
const storage = require('./storage');


const Router = class Router{

    constructor(){

        this._routes = express.Router();

        this.defineRoutes();
    }

    defineRoutes(){

        this._routes.get('/', (req, res)=>{

            res.render('home/view', {
                item: storage.home,
                items: storage.items
            });
        });

        this._routes.get('/about', (req, res)=>{

            res.render('about/view', {
                item: storage.about
            });
        });

        this._routes.get('/item/:id', (req, res)=>{
          res.render('item/view', {
            item: storage.items[req.params.id]
          })
        })

        this._routes.get('/search/:q', (req, res)=>{
          const items = _.filter(storage.items,  function(item){
            return item.name.indexOf(req.params.q) > -1
          })
          res.json(items)
        })
    }

    get routes(){
        return this._routes;
    }
}
module.exports = Router;
