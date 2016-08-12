const express = require('express');
const engine = require('ejs-mate');
const Router = require('./router');

const Server = class Server {
    constructor(){

        const app = express();

        app.use(express.static('public'));
        app.use(express.static('bower_components'));

        app.engine('ejs', engine);
        app.set('views', process.cwd() + '/routes');
        app.set('view engine', 'ejs');
        app.locals._layoutFile = './../layout/default'

        const router = new Router();
        app.use(router.routes);

        app.listen(8200, ()=>{
            console.log('app ready!')
        })
    }
}
const server = new Server()
