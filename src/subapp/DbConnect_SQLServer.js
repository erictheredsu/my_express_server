//sql server connection of tedious
//see https://tediousjs.github.io/tedious/getting-started.html  and 
//https://github.com/tediousjs/tedious/tree/master/examples for more info

//TODO: https://tediousjs.github.io/node-mssql/#asyncawait

const Connection = require('tedious').Connection
const Request = require('tedious').Request

var config = {
  server: "10.58.136.142",
  options: {
    database: "SBODemo_GB"
  },
  authentication: {
    type: "default",
    options: {  
      userName: "sa",
      password: "Initial0",
    }
  }
};

let connection = null;

function executeStatement () {
  request = new Request("select top 5 ItemCode, ItemName from OITM", function (err, rowCount) {
    if (err) {
      console.log(err)
    } else {
      console.log(rowCount + ' rows')
    }
    connection.close()
  })

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NULL')
      } else {
        console.log(column.value)
      }
    })
  })

  connection.execSql(request)
}

module.exports = {
    init : ()=>{
      connection = new Connection(config);
      connection.on('connect', function (err) {
        if (err) {
          console.log(err)
        } else {
          executeStatement()
        }
      })
    }
}