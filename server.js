'use strict';

const fs = require('fs');
const bodyparser = require('body-parser');

const express = require('express');
const app = express();

const path = require('path');
const hbs = require('express-handlebars');

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultView: 'default',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// routes
app.get('/', (req, res) => {
  var data = fs.readFileSync(__dirname + '/data/resume.json', 'utf8');
  var resume = JSON.parse(data);
  // console.log(resume.languages); 
  res.render('index', { resume });
})

app.get('/json', (req, res) => {
  var data = fs.readFileSync(__dirname + '/data/resume.json', 'utf8');
  var resume = JSON.parse(data);
  // console.log(resume); 
  res.send(resume);
})


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('app started');
});

