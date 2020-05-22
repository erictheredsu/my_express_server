//back end entry of alpha 
const express = require('express')
const bodyParser = require('body-parser');
const dbConnectSQL = require('./DBConnect_SQLServer')
const TYPES = require('tedious').TYPES

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
    dbConnectSQL.initConnection()
        .then(()=>{
            let sqlQuery = 'select USER_CODE, PASSWORD2,U_NAME from ousr where USER_CODE  = @code';
            dbConnectSQL.setParameters([{'name':'code', 'type':TYPES.VarChar,'value': userInfo['uname'] }])
            dbConnectSQL.execsql(sqlQuery)
                .then( (dataset)=>{
                    console.dir(dataset);
                    if(dataset.rowCount ==1 &&  dataset.datatable[0][1].value == userInfo['psw']){
                        res.send('Welcome, dear ' + dataset.datatable[0][2].value);
                        //res.redirect('/success.html');
                    }
                    else{
                        res.send("your user name is unknown or your password is incorrect!");
                    }
                })
        })
        .catch(err => {console.log(err);})


 
 });

 module.exports = {
    getSubApp : ()=>{
        return app;
    }
}