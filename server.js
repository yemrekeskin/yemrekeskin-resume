'use strict';

const express = require('express');
var app = express();

const path = require('path');
const hbs = require('express-handlebars');

app.use('/public', express.static(process.cwd() + '/public'));

// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine', '.hbs');

app.engine('.hbs', hbs( {
  extname: '.hbs',
  defaultView: 'default',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// routes
app.get('/', (req, res) => {
    res.render('index', {
      content:'Hello From Otherside'
    });
})


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('app started');
});
  
