const express = require('express');
const Storage = require('./storage');


const Router = class Router{

    constructor(){

        this._routes = express.Router();

        const storage = Storage.instantiate('shallow');

        this.defineRoutes(storage);
    }

    defineRoutes(storage){

        this._routes.get('/', (req, res)=>{

            storage.getItems(items => {
              res.render('home/view', {
                  items: items
              });
            })


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

          storage.getItemsBySlug(req.params.q, items => {
            res.json(items)
          })
        })
    }

    get routes(){
        return this._routes;
    }
}
module.exports = Router;
