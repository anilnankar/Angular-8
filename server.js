const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

// Get all members
app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Get particular member by id
app.get('/api/members/:id', (req, res) => {
  request('http://localhost:3000/members/'+req.params.id, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Delete particular member by id
app.delete('/api/members/:id', (req, res) => {
  request.delete('http://localhost:3000/members/'+req.params.id, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Add new member 
app.post('/api/members', function (req, res) {
//   var bodyData = {  
//     firstName:req.body.lastName,  
//     lastName:req.body.lastName,
//     jobTitle:req.body.jobTitle,
//     team:req.body.team,
//     status:req.body.status
//   }; 
//   console.log(bodyData);
   
  //res.send(req.body);
  request.post('http://localhost:3000/members', {data: req.body} , (err, response, body) => {
    res.send(body);
  });
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
