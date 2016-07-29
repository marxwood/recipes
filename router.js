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
                items: storage.items
            });
        });

        this._routes.get('/about', (req, res)=>{


            res.render('about/view', {
                item: storage.about
            });
        });
    }

    get routes(){
        return this._routes;
    }
}
module.exports = Router;
