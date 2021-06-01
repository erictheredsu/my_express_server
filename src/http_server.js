#!/usr/local/bin/node

const express = require('express')
const request = require('request');
const cors = require('cors');
const opn = require('opn');
const indexFileGenerator = require('./indexGenerator')
const fs = require("fs");
const https = require("https");
const postDemo = require('./subapp/post_demo')
const alphaApp = require('./subapp/alpha')

//create express server
var app = express();
app.use(cors({origin: '*'}));

var options = {
    dotfiles: 'ignore',
    extensions: ['htm', 'html'],
    redirect: false,
    setHeaders: function (res, path, stat) {
      //res.set('x-timestamp', Date.now());
      //res.set('X-Frame-Options', 'sameorigin');

      //res.set('Content-Security-Policy', 'default-src "self" https://sapui5.hana.ondemand.com/; script-src "self" "unsafe-inline" https://sapui5.hana.ondemand.com/;script-src-elem "self" "unsafe-inline"')
      
      //res.set('Content-Security-Policy-Report-Only', 'default-src self https://sapui5.hana.ondemand.com/');
      //res.set('Content-Security-Policy-Report-Only', 'script-src self unsafe-inline https://sapui5.hana.ondemand.com/');
      //res.set('Content-Security-Policy-Report-Only', 'script-src-elem self unsafe-inline https://sapui5.hana.ondemand.com/ https://pvgd34362085a.apj.global.corp.sap/');

      res.set('Content-Security-Policy', 'frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com pvgd56580871a.apj.global.corp.sap:* pvgd34362085a.apj.global.corp.sap:*');
    }
  }
app.use(express.static('webapps', options));

//mount my demo app, url is http://ip:port/demo/*
app.use('/demo',postDemo.getSubApp());

//mount alpha app, url is http://ip:port/alpha/*
app.use('/alpha', alphaApp.getSubApp());

//redirects URL
app.use('/Northwind.svc/', function(req, res) {
    var url = 'http://services.odata.org/V4/Northwind/Northwind.svc/' + req.url;
    req.pipe(request(url)).pipe(res);
});
//console.log("proxy server : http://services.odata.org/V4/Northwind/Northwind.svc/");

//generate entry index.html
indexFileGenerator.generateIndexFile();

//open root index automatically
//opn(indexFileGenerator.getAppRoot());

//End: listen Port
console.log("listen: " + indexFileGenerator.getAppRoot());
app.listen(process.env.PORT || 80);


const httpsOption = {
    key : fs.readFileSync("./https/server.key"),
    cert: fs.readFileSync("./https/server.cer")
}

https.createServer(httpsOption, app).listen(443);

//------------------------------------------function-------------------------------------------------------

