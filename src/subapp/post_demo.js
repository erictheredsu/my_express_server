//demo 3 type of post data handling
const express = require('express')
const bodyParser = require('body-parser');
const multipart= require("connect-multiparty")

let app = express();

//handle request
app.get('/helloworld', function(req, res){
    res.send("hello world!");
  })

//post www-form-urlencoded
app.use(bodyParser.urlencoded({    
    extended: true
  }));
  app.post('/urlencoded.svc', function(req,res){
    res.send(req.body);
  });
  
  //post form-data
  let multipart_app = multipart();
  app.post('/form-data.svc', multipart_app, function(req, res){
    res.send(req.body);
  });
  
  //post application/json  similiar with text/plain of B1 SL
  app.use(bodyParser.json({limit:'1mb'}));
  app.post('/application-json.svc', function(req, res){
    res.send(req.body);
  })

  module.exports = {
      getSubApp : ()=>{
          return app;
      }
  }