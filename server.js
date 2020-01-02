'use strict';

const fs = require('fs');
const bodyparser = require('body-parser');

const express = require('express');
const server = express();

const path = require('path');
const hbs = require('express-handlebars');

server.use('/assets', express.static(process.cwd() + '/assets'));
server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', '.hbs');

server.engine('.hbs', hbs({
  extname: '.hbs',
  defaultView: 'default',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// routes
server.get('/', (req, res) => { 
  res.render('index', {layout: false});
})

server.get('/resume', (req, res) => {
  var data = fs.readFileSync(__dirname + '/data/resume.json', 'utf8');
  var resume = JSON.parse(data);
  // console.log(resume.basics); 
  res.render('resume', { resume });
})

server.get('/resume/json', (req, res) => {
  var data = fs.readFileSync(__dirname + '/data/resume.json', 'utf8');
  var resume = JSON.parse(data);
  // console.log(resume); 
  res.send(resume);
})

server.get('/resume/pdf', function (req, res) {
  
  var filePath = "/files/resume.pdf";
  
  fs.readFile(__dirname + filePath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });

});

server.get('/old', (req, res) => { 
  res.render('old', {layout: false});
})


// App Server
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('app started');
});

