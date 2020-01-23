#!/usr/local/bin/node

const express = require('express')
const request = require('request');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const os = require('os');
const fsPromise = require('./fsPromise');

const path_seperater = (os.platform === 'win32')? "\\": '/';
const app_root = "http://localhost:7777/";
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
//and open it automatically
GenerateIndexFile(app_folder);


//redirects URL
// app.use('/Northwind.svc/', function(req, res) {
//     var url = 'http://services.odata.org/V4/Northwind/Northwind.svc/' + req.url;
//     req.pipe(request(url)).pipe(res);
// });
// console.log("proxy server : http://services.odata.org/V4/Northwind/Northwind.svc/");

//End: listen Port
app.listen(process.env.PORT || 7777);


//------------------------------------------function-------------------------------------------------------

function GenerateIndexFile(filePath) {
    //append start part of index.html
    fsPromise.writeFile(validPath, fileHead)
    .then(()=>{
        console.log(fileHead);
        //append webapps folder content link
        validPath  = path.resolve(filePath);
        fsPromise.readdir(validPath)
            .then( files => {
            files.forEach(function(dirName){
                var dirPath = path.join(validPath, dirName);
                let a = fs.statSync(dirPath);
                if(a.isDirectory()){
                    fsPromise.appendFile(root_index_file, getHtmlElem(dirName))
                        .then(()=>{
                            console.log(dirPath);
                            return dirPath;
                        })
                }
            });
        })
        .then(()=>{
            //append end part of index.html
            fsPromise.appendFile(root_index_file, fileEnd)
                .then(()=>{
                    console.log(fileEnd);
                    //open root index automatically
                    opn(root_index_file);
                    console.log("open the website :" + root_index_file);
                })
                
        })
    })
    .catch(err => {console.log(err);})
}

function getURL(name) {
    return app_root + name + '/index.html';
}

function getHtmlElem(name){
    return "<h3><a href=\"" + getURL(name) + "\">" +  name + "</a></h3>" + '\r\n';
}
