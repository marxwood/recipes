const express = require('express');
const bodyparser = require('body-parser');
const engine = require('ejs-mate');
const Router = require('./router');

const cookieparser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/recipes',
  collection: 'sessions'
})

const Server = class Server {
    constructor(){

        const app = express();

        app.use(express.static('public'));
        app.use(express.static('bower_components'));

        app.engine('ejs', engine);
        app.set('views', process.cwd() + '/routes');
        app.set('view engine', 'ejs');
        app.locals._layoutFile = './../layout/default';

        app.use(cookieparser('5ty76$uu!'));
        app.use(session({
          secret: '164&uu!$',
          cookie: {
            path: '/buy',
            maxAge: 1000 * 60 * 60
          },
          store: store,
          saveUninitialized: true,
          resave: true
        }))

        app.use(bodyparser.urlencoded({extended: true}));
        //app.use(bodyparser.raw({type: 'multipart/form-data'}))

        const router = new Router();
        app.use(router.routes);

        app.listen(8200, ()=>{
            console.log('app ready!')
        })
    }
}
const server = new Server()
