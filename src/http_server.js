#!/usr/local/bin/node

const express = require('express')
// const request = require('request');
const cors = require('cors');
const opn = require('opn');
const indexFileGenerator = require('./indexGenerator')
const postDemo = require('./subapp/post_demo')

//create express server
var app = express();
app.use(cors({origin: '*'}));
app.use(express.static('webapps', {'dotfiles':'allow'}));

//mount my sub app, url is http://ip:port/demo/*
app.use('/demo',postDemo.getSubApp());

//generate entry index.html
indexFileGenerator.generateIndexFile();

//open root index automatically
opn(indexFileGenerator.getAppRoot());

//redirects URL
// app.use('/Northwind.svc/', function(req, res) {
//     var url = 'http://services.odata.org/V4/Northwind/Northwind.svc/' + req.url;
//     req.pipe(request(url)).pipe(res);
// });
// console.log("proxy server : http://services.odata.org/V4/Northwind/Northwind.svc/");

//End: listen Port
console.log("listen: " + indexFileGenerator.getAppRoot());
app.listen(process.env.PORT || 80);

//------------------------------------------function-------------------------------------------------------

