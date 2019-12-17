const express = require('express');
const routes = require('./routes/');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
});


const app = express();


app.listen(5000);