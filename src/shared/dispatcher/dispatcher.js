var Dispatcher=require('flux').Dispatcher;
var AppDispatcher= new Dispatcher();

AppDispatcher.handleAction=function(action){
  this.dispatch( actionObject );
}

module.exports.AppDispatcher=AppDispatcher;
