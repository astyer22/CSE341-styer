const { MongoClient } = require('mongodb');
const mongodb = require('./db/connect');
const { Router } = require('express');
const bodyParser = require('body-parser');
const { Express, Request, Response, NextFunction } = require('express');

const router = Router();

const port = process.env.PORT || 8080;
const app = Express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require ('/routes'));

mongodb.initDb((err, monodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connect to Db and listening on port ${port}`);
    }
});
