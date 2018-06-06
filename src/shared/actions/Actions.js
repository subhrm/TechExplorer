var Dispatcher=require('./../dispatcher/dispatcher.js').AppDispatcher;
var AppConstants=require('./../constants/AppConstants');

var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

module.exports={
  ChkEmail:function(data){
    Dispatcher.dispatch({
      type:AppConstants.CHECKEMAIL,
      data:data
    });    
  },

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
  },

  SaveProfile:function(data){
      Dispatcher.dispatch({
        type:AppConstants.SAVEPROFILE,
        data:data
    });  
  }, 

  SavePreferences:function(data){
      Dispatcher.dispatch({
        type:AppConstants.SAVEPREFERENCES,
        data:data
    });  
  },   

  FetchEvents:function(){
    Dispatcher.dispatch({
      type:AppConstants.FETCHEVENTS,
      data:""
    })
  }, 

  FetchEventsByTech:function(data){
    Dispatcher.dispatch({
      type:AppConstants.FETCHEVENTSBYTECH,
      data:data
    })
  },

  FetchEventsByCat:function(data){
    Dispatcher.dispatch({
      type:AppConstants.FETCHEVENTSBYCAT,
      data:data
    })
  },

}
