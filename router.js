const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
//const Storage = require('./storage');
const storage = require('./storage').instantiate('mongo');
const randomstring = require('randomstring')


const Router = class Router{

    constructor(){

        this._routes = express.Router();

        //const storage = Storage.instantiate('mongo');

        this.defineRoutes(storage);
    }

    isAuth(req, res, next){
      storage.isTokenAvailable(req.cookies.code, (token) => {
        if(token){
          req.authenticated = true;
          return next();
        }

        if(req.url == '/'){
          req.authenticated = false;
          return next();
        } else {
          res.redirect('/');
        }

      })

    }

    defineRoutes(storage){

        this._routes.get('/buy', (req, res)=>{

          let code = randomstring.generate({
            length:5,
            charset: 'qwertyuiopasdfghjklzxcvbnm1234567890'
          })
          req.session.code = code;
          res.send(`Your code is ${code}. Thank you for using our service!`)
        })

        this._routes.post('/access', (req, res)=>{
          console.log(req.body)
          storage.isTokenAvailable(req.body.code, (token)=>{
            if(token){
              console.log("TOKEN", token.session.code);
              res.cookie('code', token.session.code, {expires: token.expires});
            }
            res.redirect('/')
          })
        })

        this._routes.get('/', this.isAuth, (req, res)=>{

            if(req.authenticated){

              storage.getItems(items => {
                res.render('home/view', {
                    items: items
                });
              })
            } else {
              res.render('home/public', {
                _layoutFile: './../layout/public'
              })
            }

        });

        this._routes.get('/about', this.isAuth, (req, res)=>{

            res.render('about/view', {
                item: storage.about
            });
        });

        this._routes.get('/feedback', this.isAuth, (req, res)=>{
            res.render('feedback/view')
        })
        this._routes.post('/feedback', this.isAuth, (req, res)=>{

            const form = new formidable.IncomingForm();
            form.uploadDir = `${process.cwd()}/public/repo`;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files)=>{
              fs.rename(files.attachment.path, `${form.uploadDir}/${files.attachment.name}`)
              res.render('feedback/view')

              //
              require('./emailer').email({
                from: 'nodejs@tnation.eu',
                to: 'nodejs@tnation.eu',
                subject: 'Feedback Message',
                html: `
                  <b>Name</b> ${fields.name}<br>
                  <b>Message</b> ${fields.message}<br>
                `,
                attachments: [
                  {path: `${form.uploadDir}/${files.attachment.name}`}
                ]
              })

            })

        })

        this._routes.get('/item/:id', this.isAuth, (req, res)=>{

          storage.getItem(req.params.id, data => {
            res.render('item/view', {
                data: data
            });
          })
        })

        this._routes.get('/search/:q', this.isAuth, (req, res)=>{

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
