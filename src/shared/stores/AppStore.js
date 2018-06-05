var objectAssign = require('object-assign');

var BaseStore = require('./BaseStore');
var AppDispatcher = require('../dispatcher/dispatcher').AppDispatcher;
var AppConstants = require('../constants/AppConstants');

var AjaxHelper=require('./../Helper/AjaxHelper.js');
var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

var _validuser = false;
var _UserSaved = false;
var _UniqueEmail = true;
var _events = [];

var AppStore = objectAssign({}, BaseStore, {

    isAuthenticated:function(){
        return _validuser;        
    },

    isUserSaved:function(){
        return _UserSaved;
    },

    isUniqEmail:function(){
        return _UniqueEmail;
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

    _getEvents:function(){
        return _events;
    },

    dispatchToken: AppDispatcher.register(function(action){
        switch(action.type){

            case AppConstants.CHECKEMAIL:
                CheckEmail(action.data);
                AppStore.emitChange();
                break;

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

            case AppConstants.FETCHEVENTS:
                FetchEvents();
                AppStore.emitChange();
                break;

            case AppConstants.FETCHEVENTSBYTECH:
                FetchEventsByTech();
                AppStore.emitChange();
                break;
        }
    })
});

// Function to validate the uniqueness of email id for signup
function CheckEmail(emailobj){

    log("Inside fn-CheckEmail", DEBUG);
    log(JSON.stringify(emailobj), DEBUG);

    _UniqueEmail = false;
    if(emailobj.email == ""){
        log("Invalid Email ID to check ", DEBUG);
    }
    else{
        // AJAX Call to the server API to check the uniqueness of email ID
//DEPENDENCY
/*        
        var data = AjaxHelper.checkemail("/checkemail", useremail);
        log("returned from Ajax Helper", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data && data.exists)  {
            log("Email is already taken", INFO);
        }else{
            log("Email is available", INFO);
            _UniqueEmail = true;
        }
*/        
_UniqueEmail = true;
    }
}

// Function used to register the new user from Signup Screen
function Signup(userobj){

    log("Inside fn-Signup", DEBUG);
    log(JSON.stringify(userobj), DEBUG);
    _UserSaved = false;

    // AJAX Call to the server API to save the user in DB
//DEPENDENCY
/*    
    var data = AjaxHelper.signup("/signup", userobj);
    if(data.status == "success"){
        log("Signup : Data Saved Successfully", INFO);
        _UserSaved = true;
    }else{
        log("Signup : Unable to save the data to DB", INFO);
        _UserSaved = false;
    }
*/
_UserSaved = true;

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
        // CALL API for login
// DEPENDENCY
/*        
        var data=AjaxHelper.login("/login",userobj);
        log("returned from Ajax Helper", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data && data.username ){
            log("ValidateCredentials : Valid user", INFO);
            log("Setting session username as : " + userobj.email, DEBUG);
            sessionStorage.setItem("username",userobj.email);
            _validuser = true;
        }
*/        
_validuser = true;
    }
}

// Function to handler logout functionality
function Logout(){
    sessionStorage.clear();
        // CALL API for logout if you want to do something on server side for logout action
// DEPENDENCY
/*
*/
_validuser = false;
}

// Function to retrieve events
function FetchEvents(){
    log("Inside fn-FetchEvents",DEBUG);
    // DEPENDENCY
/*      adding /events in SPEC to fetch initial list of events, categories, and technology from Server 
        var data=AjaxHelper.fetch("/events");
        log("returned from Ajax Helper", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data){
            log("Events : data", INFO);
            _events = data
        }
*/

// Function to retrieve events by TECHNOLOGY
function FetchEventsByTech(techobj){
    log("Inside fn-FetchEventsByTechnology",DEBUG);
    // DEPENDENCY
/*      
        var data=AjaxHelper.fetch("/event/by-technology/{techobj.id}?start=0&page-size=size");
        log("returned from Ajax Helper", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data){
            log("Events : data", INFO);
            _events = data
        }
*/}

}

module.exports=AppStore;