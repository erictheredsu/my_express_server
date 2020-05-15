#!/usr/local/bin/node

const express = require('express')
const request = require('request');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const os = require('os');


const ip = getIPAddress();
const path_seperater = (os.platform === 'win32')? "\\": '/';
const app_root = "http://" + ip + "/";
const app_folder = "webapps";
const root_index_file = app_folder + path_seperater + "index.html";
var validPath  = path.resolve(root_index_file);

//create express server
var app = express();
app.use(cors({origin: '*'}));
app.use(express.static('webapps', {'dotfiles':'allow'}));
console.log("listen: " + app_root);

//create or truncate index.html
const fileHead='<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<title>Project List</title>\r\n<head/>\r\n<body>\r\n<h2>Project List</h2>\r\n';
const fileEnd="</body>\r\n</html>\r\n";


//Get all sub folders from app_folder and create an index.html
GenerateIndexFile(app_folder);

//open root index automatically
opn(app_root);

//redirects URL
// app.use('/Northwind.svc/', function(req, res) {
//     var url = 'http://services.odata.org/V4/Northwind/Northwind.svc/' + req.url;
//     req.pipe(request(url)).pipe(res);
// });
// console.log("proxy server : http://services.odata.org/V4/Northwind/Northwind.svc/");

//End: listen Port
app.listen(process.env.PORT || 80);


//------------------------------------------function-------------------------------------------------------

function GenerateIndexFile(filePath) {
    fs.writeFileSync(validPath, fileHead);
    console.log(fileHead);
    validPath  = path.resolve(filePath);
    let files = fs.readdirSync(validPath);
    files.forEach(dirName =>{
        let dirPath = path.join(validPath, dirName);
        let stat = fs.statSync(dirPath);
        if(stat.isDirectory()){
            fs.appendFileSync(root_index_file, getHtmlElem(dirName));
        }
        console.log(getAbsoluteURL(dirName));
    });
    fs.appendFileSync(root_index_file, fileEnd);
    console.log(fileEnd);
}

function getAbsoluteURL(name){
    return app_root + name + '/index.html';
}

function getURL(name) {
    return '../' + name + '/index.html';
}

function getHtmlElem(name){
    return "<h3><a href=\"" + getURL(name) + "\">" +  name + "</a></h3>" + '\r\n';
}

function getIPAddress(){
    let ifaces = os.networkInterfaces();
    let ipAddress = '';

    Object.keys(ifaces).forEach(function (ifname) {

        if(ifname !== 'Ethernet'){
            return ;
        }

        var alias = 0;
      
        ifaces[ifname].forEach(function (iface) {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
          }
      
          if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
          } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
          }
          ipAddress = iface.address;
          ++alias;
        });
      });

      return ipAddress;
}

