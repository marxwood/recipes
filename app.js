const express = require('express');
const engine = require('ejs-mate');
const Router = require('./router');

const Server = class Server {
    constructor(){

        const app = express();
        app.engine('ejs', engine);
        app.set('views', process.cwd() + '/routes');
        app.set('view engine', 'ejs');

        app.use((req, res, next) => {
            console.log('Hi from middleware');
            req.user = 'john';
            next();
        });

        const router = new Router();
        app.use(router.routes);


        app.listen(8200, ()=>{
            console.log('app ready!')
        })
    }
}
const server = new Server()
