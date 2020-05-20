#!/usr/local/bin/node

const express = require('express')
const request = require('request');
const cors = require('cors');
const opn = require('opn');
const bodyParser = require('body-parser');
const multipart= require("connect-multiparty")
const indexFileGenerator = require('./indexGenerator')



//create express server
var app = express();
app.use(cors({origin: '*'}));
app.use(express.static('webapps', {'dotfiles':'allow'}));
console.log("listen: " + indexFileGenerator.getAppRoot());

//generate entry index.html
indexFileGenerator.GenerateIndexFile();

//open root index automatically
opn(indexFileGenerator.getAppRoot());

//handle request
app.get('/helloworld.svc', function(req, res){
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

//redirects URL
// app.use('/Northwind.svc/', function(req, res) {
//     var url = 'http://services.odata.org/V4/Northwind/Northwind.svc/' + req.url;
//     req.pipe(request(url)).pipe(res);
// });
// console.log("proxy server : http://services.odata.org/V4/Northwind/Northwind.svc/");

//End: listen Port
app.listen(process.env.PORT || 80);


//------------------------------------------function-------------------------------------------------------

