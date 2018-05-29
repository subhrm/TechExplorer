// Import the required libraries
import express from "express";
import React from 'react';
var path = require("path");
var helmet = require("helmet");
var favicon = require("serve-favicon");

// Import the other modules
var logmodule = require("./log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;
const ERROR = logmodule.ERROR;

// Create the App
const app = express();

// Add security to the application
app.use(helmet());

// Response for the favicon
app.use(favicon(path.join(__dirname, "public", "favicon", "favicon.ico")))

// We're going to serve up the public folder since that's where our client bundle.js file will end up.
app.use(express.static("public"))

//creating a session;
var sessions=require('express-session');
app.use(sessions({
  secret:'aksdfklaiCharMinarwarskrqwekflanlsdf',
  resave:false,
  saveUninitialized:true
}));
var session;

// Import and use Body-Parser
var parser = require("body-parser");
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

// To render and respond with the initial HTML page for the get request on the base path '/'
// For now server side rendering is not implemented
app.get("/", (req, res, next) => {
    res.send(`
    <!DOCTYPE html>
    <html lang = "en">
        <head>
            <meta charset = "UTF-8">
            <title>Tech Explorer</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="/bundle.js" defer></script>
            <style media="screen">
                    html,body{
                        margin:0;
                        height:100%;
                    }
                    #app{
                        height: 100%;
                        width: 100%;
                    }
            </style>        
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    `)
  })

// Start the server and let it listen for incoming requests on port 3000
app.listen(4000, () => {
  log(`Server is listening on port: 4000`)
})

// Other Route Handlers for the App Server are defined as follows
