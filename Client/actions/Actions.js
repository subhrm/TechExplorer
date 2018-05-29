var Dispatcher=require('./../dispatcher/dispatcher.js').AppDispatcher;
var AppConstants=require('./../constants/AppConstants');

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
