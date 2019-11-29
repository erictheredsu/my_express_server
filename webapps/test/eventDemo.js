// import events module
var events = require('events');
// create eventEmitter object
var eventEmitter = new events.EventEmitter();

// create event handler
var connectHandler = function connected() {
   console.log('event handler trigger success');
  
   // trigger data_received event 
   eventEmitter.emit('data_received');
}

// binding connection event handler
eventEmitter.on('connection', connectHandler);
 
// another event data_received handler
eventEmitter.on('data_received', function(){
   console.log('data received success');
});

// trigger connection event 
eventEmitter.emit('connection');

console.log("program finish");