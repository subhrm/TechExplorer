var Dispatcher=require('./../dispatcher/dispatcher.js').AppDispatcher;
var AppConstants=require('./../constants/AppConstants');

var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

module.exports={
  Signup : function(data){
    Dispatcher.dispatch({
      type : AppConstants.SIGNUP,
      data : data
    });
  },

  Login:function(data){
      Dispatcher.dispatch({
        type:AppConstants.LOGIN,
        data:data
    });    
  },

  Logout:function(){
      Dispatcher.dispatch({
        type:AppConstants.LOGOUT,
        data:""
    });
  }
}
