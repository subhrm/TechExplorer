var objectAssign = require('object-assign');

var BaseStore = require('./BaseStore');
var AppDispatcher = require('../dispatcher/dispatcher').AppDispatcher;
var AppConstants = require('../constants/AppConstants');

var AjaxHelper=require('./../Helper/AjaxHelper.js');
var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

var _validuser;

var AppStore = objectAssign({}, BaseStore, {

    isAuthenticated:function(){
        return _validuser;        
    },

    _getUser:function(){
        var user = sessionStorage.getItem("username");
        log("getUser : user from sessionstorage is : " + user , INFO);
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

    log("Inside fn-Signup", DEBUG);
    log(JSON.stringify(userobj), DEBUG);
    _UserSaved = false;

    // AJAX Call to the server to save the user in DB
    var data = AjaxHelper.signup("/signup", userobj);
    if(data.status == "success"){
        log("Signup : Data Saved Successfully", INFO);
        _UserSaved = true;
    }else{
        log("Signup : Unable to save the data to DB", INFO);
        _UserSaved = false;
    }

}

// Function used for validating the User credentials from Login Screen
function ValidateCredentials(userobj){
    log("Inside fn-ValidateCredentials", DEBUG);  
    log(JSON.stringify(userobj), DEBUG);
    _validuser = false;
    sessionStorage.removeItem("username");

    if(userobj.email == "" || userobj.password == ""){
        log("ValidateCredentials : Invalid user", INFO);
    }
    else{
        var data=AjaxHelper.login("/login",userobj);
        log("returned from Ajax Helper", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data && data.username ){
            log("ValidateCredentials : Valid user", INFO);
            log("Setting session username as : " + userobj.email, DEBUG);
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