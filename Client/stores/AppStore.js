var objectAssign = require('object-assign');

var AppDispatcher = require('../dispatcher/dispatcher').AppDispatcher;
var AppConstants = require('../constants/AppConstants');
var AjaxHelper=require('./../Helper/AjaxHelper.js');
var BaseStore = require('./BaseStore');

var _validuser;

var AppStore = objectAssign({}, BaseStore, {

    isAuthenticated:function(){
        return _validuser;        
    },

    _getUser:function(){
        var user = sessionStorage.getItem("username");
        //console.log("getUser : user from sessionstorage is : " + user );
        if(user == ""){
            return ("NA");
        }else{
            return (user);
        }
    },

    dispatchToken: AppDispatcher.register(function(action){
        switch(action.type){

            case AppConstants.SIGNUP:
                Signup(action.data);
                AppStore.emitChange();
                break;

            case AppConstants.LOGIN:
                ValidateCredentials(action.data);
                AppStore.emitChange();
                break;

            case AppConstants.LOGOUT:
                Logout();
                AppStore.emitChange();
                break;
        }
    })
});


// Function used to register the new user from Signup Screen
function Signup(userobj){

    //console.log("Inside fn-Signup");
    //console.log(userobj);
    _UserSaved = false;

    // AJAX Call to the server to save the user in DB
    var data = AjaxHelper.signup("/signup", userobj);
    if(data.status == "success"){
        console.log("Data Saved Successfully");
        _UserSaved = true;
    }else{
        console.log("Unable to save the data to DB");
        _UserSaved = false;
    }

}

// Function used for validating the User credentials from Login Screen
function ValidateCredentials(userobj){
    //console.log("Inside fn-ValidateCredentials");  
    //console.log(userobj);
    _validuser = false;
    sessionStorage.removeItem("username");

    if(userobj.email == "" || userobj.password == ""){
        console.log("Invalid user");
    }
    else{
        var data=AjaxHelper.login("/login",userobj);
        console.log("returned from Ajax Helper");
        console.log(data);
        if(data && data.username ){
            console.log("Valid user");
            //console.log("Setting session username as : " + userobj.email);
            sessionStorage.setItem("username",userobj.email);
            _validuser = true;
        }
    }
}

// Function to handler logout functionality
function Logout(){
    sessionStorage.clear();

}

module.exports=AppStore;