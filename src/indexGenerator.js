//generate the index.html with node js sync function 

const fs = require('fs');
const path = require('path');
const os = require('os');

//create or truncate index.html
const fileHead='<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<title>Project List</title>\r\n<head/>\r\n<body>\r\n<h2>Project List</h2>\r\n';
const fileEnd="</body>\r\n</html>\r\n";

const ip = getIPAddress();
const app_folder = "webapps";
const path_seperater = (os.platform === 'win32')? "\\": '/';
const app_root = "http://" + ip + "/";
const root_index_file = app_folder + path_seperater + "index.html";
var validPath  = path.resolve(root_index_file);

module.exports = {

    getAppRoot : ()=>{
        return app_root;
    },

    generateIndexFile : ()=>{
        fs.writeFileSync(validPath, fileHead);
        console.log(fileHead);
        validPath  = path.resolve(app_folder);
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
    },
};

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
    let ipAddress = [];
    let index = -1;
    let os_type = os.type();

    if(os_type === "Darwin"){
      return "127.0.0.1";
    }

    Object.keys(ifaces).forEach(function (ifname, platform) {

        let alias = 0;
      
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
          ipAddress.push(iface.address);
          ++alias;
        });
      });

      ipAddress.forEach((item, i)=>{
        let bit = item.split('.');
        if((bit[0] == "10" && (bit[1] == "58" || bit[1] == "59"))|| (bit[0] == "192"&& bit[1]=="168")){
            index = i;
        } 
      })
      
      if(index === -1){
        return "127.0.0.1";
      }
      return ipAddress[index];
}
