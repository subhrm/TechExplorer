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
var _alltechnologies = null;
var _allcategories = null;
var _userobj = null;
var _allevents = null;

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

    _getAllEvents:function(){
        if(_allevents){
            return (_allevents);
        }else{
            return(FetchAllEvents());
        }
    },

    _getTechnologies:function(){
        if(_alltechnologies){
            return _alltechnologies;
        }else{
            return(GetTechnologies());
        }
    },

    _getCategories:function(){
        if(_allcategories){
            return _allcategories;
        }else{
            return(GetCategories());
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

            case AppConstants.GETTECHNOLOGIES:
                GetTechnologies();
                AppStore.emitChange();
                break;

            case AppConstants.GETCATEGORIES:
                GetCategories();
                AppStore.emitChange();
                break;

            case AppConstants.ADDTOWATCHLIST:
                AddtoWatchList(action.data);
                AppStore.emitChange();
                break;

            case AppConstants.REMOVEFROMWATCHLIST:
                RemoveFromWatchList(action.data);
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

    // Hardcoding time zone for time being 
    var reqobj = {
                    "name" : userobj.username,
                    "email" : userobj.email,                    
                    "password" : userobj.password,
                    "time_zone" : "+5:30"
                };

    // AJAX Call to the server API to save the user in DB
    var data = AjaxHelper.signup("/user", reqobj);
    log("returned from Ajax Helper:signup", DEBUG);
    log(JSON.stringify(data), DEBUG);

    if(data && data.token){        
        log("Signup : User Data Saved Successfully", INFO);

        var usertoken = data.token;
        var reqobj = {
                        "email" : userobj.email,
                        "token" : usertoken,
                        "preferences" : userobj.technologies
                    };

        var data = AjaxHelper.savepreferences("/actions/update-user-preferences", reqobj);
        log("returned from Ajax Helper:savepreferences", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data && data.status == "200"){
            log("Signup : User Preferences saved Successfully", INFO);
            _UserSaved = true;
        }
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
    sessionStorage.clear();

    if(userobj.email == "" || userobj.password == ""){
        log("ValidateCredentials : Invalid user", INFO);
    }
    else{
        var reqobj = {
                        "email" : userobj.email,
                        "password" : userobj.password
                    };

        // CALL API for login
        var data=AjaxHelper.login("/user/login",reqobj);
        log("returned from Ajax Helper", DEBUG);
        log(JSON.stringify(data), DEBUG);

        if(data && data.token ){
            log("ValidateCredentials : Valid user", INFO);

            log("Setting session username as : " + userobj.email, DEBUG);
            sessionStorage.setItem("username", userobj.email);
            sessionStorage.setItem("usertoken", data.token);            

            _validuser = true;
            _userobj = {
                username : data.name,
                email : data.email_id,
                time_zone : data.time_zone,
                technologies : null,
                watchlist : null
            };

            var req_obj = {
                        email : _userobj.email,
                        token : data.token
                    };

            // Get the user preferences from the API
            var data=AjaxHelper.getuserpreferences("/actions/get-user-preferences",req_obj);
            log("returned from Ajax Helper : getuserpreferences", DEBUG);
            log(JSON.stringify(data), DEBUG);
            if(data && data.preferences ){
                _userobj.technologies = data.preferences;
            }

            // Get the user watch list from API            
            var data=AjaxHelper.getuserwatchlist("/actions/get-watch-list",req_obj);
            log("returned from Ajax Helper : getuserwatchlist", DEBUG);
            log(JSON.stringify(data), DEBUG);
            if(data && data.events ){
                _userobj.watchlist = data.events;
            }
        }     
    }
}

// Function to handler logout functionality
function Logout(){
    log("Inside the function Logout", DEBUG);

    var reqobj = {
                    "email" : sessionStorage.getItem("username"),
                    "token" : sessionStorage.getItem("usertoken")
                };
    // CALL API for logout 
    var data=AjaxHelper.logout("/user/logout", reqobj);
    log("returned from Ajax Helper : logout", DEBUG);
    log(JSON.stringify(data), DEBUG);

    if(data && data.status == "200"){

        log("User Logged out successfully", INFO);
        // Clear the Global data
        _validuser = false;
        _userobj = null;

        // Clear the session data
        sessionStorage.clear();
    }
}

// Function to save the user profile
function SaveProfile(userobj){
    log("Inside the function SaveProfile", DEBUG);
    log(JSON.stringify(userobj), DEBUG);
    _UserSaved = false;

    if(userobj.preferencesupdate){

        var reqobj = {
                    "email" : sessionStorage.getItem("username"),
                    "token" : sessionStorage.getItem("usertoken"),
                    "preferences" : userobj.technologies
                };

        // AJAX Call to the server API to save the user in DB
        var data = AjaxHelper.savepreferences("/actions/update-user-preferences", reqobj);
        log("returned from Ajax Helper:savepreferences", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data && data.status == "200"){
            _userobj.technologies = userobj.technologies;
        }
    }

    if(userobj.profileupdate){
        // DEPENDENCY - Ignoring this functionality for time being
        /*
            // AJAX Call to the server API to save the user in DB
            var data = AjaxHelper.saveprofile("/user/saveprofile", userobj);
            log("returned from Ajax Helper:signup", DEBUG);
            log(JSON.stringify(data), DEBUG);
            if(data && data.status == "success"){
                log("Signup : Data Saved Successfully", INFO);
                _UserSaved = true;
                _userobj = {
                    username : data.username,
                    email : data.email,
                    password : "password",
                    technologies : data.technologies,
                    watchlist : data.watchlist
                };        
            }else{
                log("Signup : Unable to save the data to DB", INFO);
                _UserSaved = false;
            }    
        */

        // Test Data till this functionailty API gets implemented/working
        _UserSaved = true;
        _userobj.username = userobj.username;
    }
}

// Function to retrieve events
function FetchAllEvents(){
    log("Inside fn-FetchAllEvents",DEBUG);
    // DEPENDENCY
    //  adding /events in SPEC to fetch initial list of events, categories, and technology from Server 
    var data=AjaxHelper.getallevents("/events/list-all-events","");
    log("returned from Ajax Helper : FetchAllEvents", DEBUG);
    //log(JSON.stringify(data), DEBUG);
    if(data){
        // log("Events : " + JSON.stringify(data), INFO);
        _allevents = data;
        return _allevents;
    }
}

// Function to retrieve events
function FetchEvents(){
    log("Inside fn-FetchEvents",DEBUG);
    // DEPENDENCY
    //  adding /events in SPEC to fetch initial list of events, categories, and technology from Server 
    var data=AjaxHelper.getallevents("/events/list-all-events","");
    log("returned from Ajax Helper : FetchEvents", DEBUG);
    //log(JSON.stringify(data), DEBUG);
    if(data){
        // log("Events : " + JSON.stringify(data), INFO);
        _events = data;
        return _events;
    }
}

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
            return -events;
        }
*/}


// Function to retrieve events by CATEGORY
function FetchEventsByCat(techobj){
    log("Inside fn-FetchEventsByCategory",DEBUG);
    // DEPENDENCY
/*      
        var data=AjaxHelper.fetch("/event/by-category/{category_id}");
        log("returned from Ajax Helper", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data){
            log("Events : data", INFO);
            _events = data;
            return -events;
        }
*/}

// Function to get the technologies list
function GetTechnologies(){
    log("Inside function GetTechnologies", DEBUG);
    var data=AjaxHelper.gettechnologies("/events/list-technologies","");
    log("returned from Ajax Helper : gettechnologies", DEBUG);
    log(JSON.stringify(data), DEBUG);
    if(data){
        _alltechnologies = data.technologies;
        return _alltechnologies;
    }
}

// Function to get the technologies list
function GetCategories(){
    log("Inside function GetCategories", DEBUG);
    var data=AjaxHelper.getcategories("/events/list-categories","");
    log("returned from Ajax Helper : getcategories", DEBUG);
    log(JSON.stringify(data), DEBUG);
    if(data){
        _allcategories = data.categories;
        return _allcategories;    
    }
}

// Function to add to watchlist
function AddtoWatchList(dataobj){
    log("Inside function AddtoWatchList", DEBUG);
    log(JSON.stringify(dataobj), DEBUG);

    var reqobj = {
        "email" : sessionStorage.getItem("username"),
        "token" : sessionStorage.getItem("usertoken"),
        "event_id" : dataobj.event_id
    };    

    var data=AjaxHelper.addtowatchlist("/actions/add-to-watch-list",reqobj);
    log("returned from Ajax Helper : addtowatchlist", DEBUG);
    log(JSON.stringify(data), DEBUG);
    if(data && data.status == "200"){
        log("Succesfully added to user's watchlist");

        // Get the user's new watch list from API    
        var req_obj = {
            email : _userobj.email,
            token : sessionStorage.getItem("usertoken")
        };                
        var data=AjaxHelper.getuserwatchlist("/actions/get-watch-list",req_obj);
        log("returned from Ajax Helper : getuserwatchlist", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data && data.events ){
            _userobj.watchlist = data.events;
        }
    }else{
        log("Failed to add to user's watchlist");
    }
}

function RemoveFromWatchList(dataobj){
    log("Inside function RemoveFromWatchList", DEBUG);
    log(JSON.stringify(dataobj), DEBUG);

    var reqobj = {
        "email" : sessionStorage.getItem("username"),
        "token" : sessionStorage.getItem("usertoken"),
        "event_id" : dataobj.event_id
    };    

    var data=AjaxHelper.removefromwatchlist("/actions/remove-from-watch-list",reqobj);
    log("returned from Ajax Helper : removefromwatchlist", DEBUG);
    log(JSON.stringify(data), DEBUG);
    if(data && data.status == "200"){
        log("Succesfully removed from user's watchlist");

        // Get the user's new watch list from API   
        var req_obj = {
            email : _userobj.email,
            token : sessionStorage.getItem("usertoken")
        };                 
        var data=AjaxHelper.getuserwatchlist("/actions/get-watch-list",req_obj);
        log("returned from Ajax Helper : getuserwatchlist", DEBUG);
        log(JSON.stringify(data), DEBUG);
        if(data && data.events ){
            _userobj.watchlist = data.events;
        }        
    }else{
        log("Failed to remove from user's watchlist");
    }
}

module.exports=AppStore;