var express = require('express')
var request = require('request');
var cors = require('cors');

var app = express();
app.use(cors({origin: '*'}));
app.use(express.static('webapps', {'dotfiles':'allow'}));

app.use('/Northwind.svc/', function(req, res) {
    var url = 'http://services.odata.org/V4/Northwind/Northwind.svc/' + req.url;
    req.pipe(request(url)).pipe(res);
});
console.log("proxy server : http://services.odata.org/V4/Northwind/Northwind.svc/");

debugger;

app.listen(process.env.PORT || 7777);
console.log("listen port:7777");
console.log("root address:http://localhost:7777/")