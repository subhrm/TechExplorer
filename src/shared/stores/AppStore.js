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
var _alltechnologies = [];
var _allcategories = [];
var _userobj = null;

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
        return(user);
    },

    _getUserObj:function(){
        return _userobj;
    },

    _getEvents:function(){
        return _events;
    },

    _getTechnologies:function(){
        if(_alltechnologies && _alltechnologies.length > 0){
            return _alltechnologies;
        }else{
            return(GetTechnologies);
        }
    },

    _getCategories:function(){
        if(_allcategories && _allcategories.length > 0){
            return _allcategories;
        }else{
            return(GetCategories);
        }
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

            case  AppConstants.SAVEPROFILE:
                SaveProfile(action.data);
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

    log("Inside function CheckEmail", DEBUG);
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
    var data = AjaxHelper.signup("/user", userobj);
    log("returned from Ajax Helper:signup", DEBUG);
    log(JSON.stringify(data), DEBUG);
    if(data && data.status == "success"){
        log("Signup : Data Saved Successfully", INFO);
        _UserSaved = true;
    }else{
        log("Signup : Unable to save the data to DB", INFO);
        _UserSaved = false;
    }
}

// Function used for validating the User credentials from Login Screen
function ValidateCredentials(userobj){
    log("Inside function ValidateCredentials", DEBUG);  
    log(JSON.stringify(userobj), DEBUG);
    _validuser = false;
    sessionStorage.removeItem("username");

    if(userobj.email == "" || userobj.password == ""){
        log("ValidateCredentials : Invalid user", INFO);
    }
    else{
        // CALL API for login
        var data=AjaxHelper.login("/user/login",userobj);
        log("returned from Ajax Helper", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data && data.username ){
            log("ValidateCredentials : Valid user", INFO);

            log("Setting session username as : " + userobj.email, DEBUG);
            sessionStorage.setItem("username",userobj.email);

            _validuser = true;
            _userobj = {
                username : data.username,
                email : data.email,
                phone : data.phone,
                password : "password",
                technologies : data.technologies,
                watchlist : data.watchlist
            };
        }
    

// Test data     
_validuser = true;
sessionStorage.setItem("username","ramana@infosys.com");
_userobj = {
                username : "Ramana",
                email : "ramana@infosys.com",
                phone : "99122",
                password : "ram@123",
                technologies : ["C", "C++", "Java", "Java Script", "MongoDB", "React JS", "Angular JS"],
                watchlist : []
        };
     
    }
}

// Function to handler logout functionality
function Logout(){
    log("Inside the function Logout", DEBUG);

    // CALL API for logout 
    var data=AjaxHelper.logout("/user/logout","");
    log("returned from Ajax Helper", DEBUG);
    log(JSON.stringify(data), DEBUG);

    if(data && data.status == "success"){
        // Clear the Global data
        _validuser = false;
        _userobj = null;

        // Clear the session data
        sessionStorage.clear();
    }

// TEST data till API gets to proper state    
_validuser = false;
_userobj = null;
sessionStorage.clear();
}

// Function to save the user profile
function SaveProfile(userobj){
    log("Inside the function SaveProfile", DEBUG);
    log(JSON.stringify(userobj), DEBUG);
    _UserSaved = false;
// DEPENDENCY
/*
    // AJAX Call to the server API to save the user in DB
    var data = AjaxHelper.saveprofile("/user/save", userobj);
    log("returned from Ajax Helper:signup", DEBUG);
    log(JSON.stringify(data), DEBUG);
    if(data && data.status == "success"){
        log("Signup : Data Saved Successfully", INFO);
        _UserSaved = true;
        _userobj = {
            username : data.username,
            email : data.email,
            phone : data.phone,
            password : "password",
            technologies : data.technologies,
            watchlist : data.watchlist
        };        
    }else{
        log("Signup : Unable to save the data to DB", INFO);
        _UserSaved = false;
    }    
*/

// Test Data till API gets working
_UserSaved = true;
var newuserobj = {
    username : userobj.username,
    email : userobj.email,
    phone : userobj.phone,
    password : "password",
    technologies : userobj.technologies,
    watchlist : userobj.watchlist
}; 
_userobj = newuserobj;

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

// Function to get the technologies list
function GetTechnologies(){
    log("Inside function GetTechnologies", DEBUG);
    var data=AjaxHelper.gettechnologies("/event/list-technologies","");
    log("returned from Ajax Helper : gettechnologies", DEBUG);
    log(JSON.stringify(data), DEBUG);
    if(data && data.length > 0){
        _alltechnologies = data;
        return _alltechnologies;
    }
}

// Function to get the technologies list
function GetCategories(){
    log("Inside function GetCategories", DEBUG);
    var data=AjaxHelper.getcategories("/event/list-categories","");
    log("returned from Ajax Helper : getcategories", DEBUG);
    log(JSON.stringify(data), DEBUG);
    if(data && data.length > 0){
        _allcategories = data;
        return _allcategories;    
    }
}

}

module.exports=AppStore;