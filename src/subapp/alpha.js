//back end entry of alpha 
const express = require('express')
const bodyParser = require('body-parser');
const dbConnectSQL = require('./DBConnect_SQLServer')

let app = express();

//support post www-form-urlencoded
app.use(bodyParser.urlencoded({    
    extended: true
}));

//support post application/json 
app.use(bodyParser.json({limit:'1mb'}));

//post login 
app.post('/login.svc', function(req,res){
    let userInfo = req.body;
    dbConnectSQL.init();

    if(userInfo['uname'] === 'manager' && userInfo['psw'] === '1234'){
       res.redirect('/success.html');
     }
     else{
       res.send("your user name is unknown or your password is incorrect!");
     }
 
 });

 module.exports = {
    getSubApp : ()=>{
        return app;
    }
}