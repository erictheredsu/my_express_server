//packing some functions of Standard node.js fs to Promise
const fs = require('fs');
const path = require('path');

module.exports = {
    writeFile : (...args) => {
        return new Promise((resolve, reject) =>{
            fs.writeFile(...args,(err,data)=>{
                if(err) 
                    return reject(err);
                resolve(data);
            })
        })
    },

    readdir : (...args) => {
        return new Promise((resolve, reject)=>{
            fs.readdir(...args, (err,data) =>{
                if(err) 
                    return reject(err);
                resolve(data);
            })
        })
    },

    stat : (...args) => {
        return new Promise((resolve, reject)=>{
            fs.stat(...args, (err,data) =>{
                if(err) 
                    return reject(err);
                resolve(data);
            })
        })
    },

    appendFile : (...args) => {
        return new Promise((resolve, reject)=>{
            fs.appendFile(...args, (err,data) =>{
                if(err) 
                    return reject(err);
                resolve(data);
            })
        })
    },
}; 