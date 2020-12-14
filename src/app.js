const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const pessoaRoute = require('./routes/pessoa-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Habilita o CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/pessoas', pessoaRoute);

module.exports = app;
