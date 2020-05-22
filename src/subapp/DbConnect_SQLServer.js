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
let params = [];

module.exports = {
    initConnection : ()=>{
      return new Promise((resolve, reject) =>{
        if(connection !== null){
          return resolve();
        }

        connection = new Connection(config);
        connection.on('connect', function(err){
            if(err){
              return reject(err);
            }
            else{
              return resolve();
            }
        })
      })
    },

    setParameters : (Parameters) =>{
      params = Parameters;
    },

    execsql : (sqlQuery)=>{
      return new Promise((resolve, reject) =>{
        let dataset = {
          datatable : [],
          rowCount : 0,
          metadata : [],
          errCode : 0
        }

        let request = new Request(sqlQuery, (err, rowCount)=>{
          if(err){
            return reject(err);
          }
          else{
            dataset['rowCount'] = rowCount;
          }
        })

        if(params !== null){
          params.forEach(element => {
            request.addParameter(element.name, element.type, element.value);
          });
        }
      
        request.on('row', (columns)=>{
          dataset.datatable.push(columns);
        });

        request.on('columnMetadata', (columns)=>{
          dataset['metadata'] = columns;
        });

        request.on('requestCompleted', () => {
            return resolve(dataset);
        });

        request.on('error', (err)=>{
          dataset['errCode'] = err;
        });

        connection.execSql(request);

      })
    },

    closeConnection :()=>{
      if(connection !== null){
        connection.close();
      }
    }
};