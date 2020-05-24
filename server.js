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
  var bodyData = {  
    firstName:req.body.firstName,  
    lastName:req.body.lastName,
    jobTitle:req.body.jobTitle,
    team:req.body.team,
    status:req.body.status
  }; 
   
  request.post({
      json: true,
      url: 'http://localhost:3000/members',
      body: bodyData
    }, (err, response, body) => {
      if (response.statusCode <= 500) {
        res.send(body);
      }
  });
});

// Update member 
app.put('/api/members/:id', function (req, res) {
  var bodyData = {  
    firstName:req.body.firstName,  
    lastName:req.body.lastName,
    jobTitle:req.body.jobTitle,
    team:req.body.team,
    status:req.body.status
  }; 
   
  request.put({
      json: true,
      url: 'http://localhost:3000/members/'+req.params.id,
      body: bodyData
    }, (err, response, body) => {
      if (response.statusCode <= 500) {
        res.send(body);
      }
  });
});

// Fetch teams
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});



// Get all products
app.get('/api/products', (req, res) => {
  request('http://localhost:3000/products', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Get particular products by id
app.get('/api/products/:id', (req, res) => {
  request('http://localhost:3000/products/'+req.params.id, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Delete particular products by id
app.delete('/api/products/:id', (req, res) => {
  request.delete('http://localhost:3000/products/'+req.params.id, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Add new products 
app.post('/api/products', function (req, res) {
  var bodyData = {  
    name:req.body.name,  
    description:req.body.description,
    isAvailable:req.body.isAvailable,
    price:req.body.price
  }; 
  request.post({
      json: true,
      url: 'http://localhost:3000/products',
      body: bodyData
    }, (err, response, body) => {
      if (response.statusCode <= 500) {
        res.send(body);
      }
  });
});

// Update member 
app.put('/api/products/:id', function (req, res) {
  var bodyData = {  
    name:req.body.name,  
    description:req.body.description,
    isAvailable:req.body.isAvailable,
    price:req.body.price
  }; 
   
  request.put({
      json: true,
      url: 'http://localhost:3000/products/'+req.params.id,
      body: bodyData
    }, (err, response, body) => {
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
