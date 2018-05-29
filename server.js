/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Import the required libraries\nvar path = __webpack_require__(/*! path */ \"path\");\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\nvar favicon = __webpack_require__(/*! serve-favicon */ \"serve-favicon\");\n\n// Import the other modules\nvar logmodule = __webpack_require__(/*! ./log.js */ \"./src/server/log.js\");\nvar log = logmodule.log;\nvar INFO = logmodule.INFO_LOG;\nvar DEBUG = logmodule.DEBUG_LOG;\nvar ERROR = logmodule.ERROR;\n\n// Create the App\nvar app = (0, _express2.default)();\n\n// Add security to the application\napp.use(helmet());\n\n// Response for the favicon\napp.use(favicon(path.join(__dirname, \"public\", \"favicon\", \"favicon.ico\")));\n\n// We're going to serve up the public folder since that's where our client bundle.js file will end up.\napp.use(_express2.default.static(\"public\"));\n\n//creating a session;\nvar sessions = __webpack_require__(/*! express-session */ \"express-session\");\napp.use(sessions({\n  secret: 'aksdfklaiCharMinarwarskrqwekflanlsdf',\n  resave: false,\n  saveUninitialized: true\n}));\nvar session;\n\n// Import and use Body-Parser\nvar parser = __webpack_require__(/*! body-parser */ \"body-parser\");\napp.use(parser.json());\napp.use(parser.urlencoded({ extended: false }));\n\n// To render and respond with the initial HTML page for the get request on the base path '/'\n// For now server side rendering is not implemented\napp.get(\"/\", function (req, res, next) {\n  res.send(\"\\n    <!DOCTYPE html>\\n    <html lang = \\\"en\\\">\\n        <head>\\n            <meta charset = \\\"UTF-8\\\">\\n            <title>Tech Explorer</title>\\n            <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1\\\">\\n            <script src=\\\"/bundle.js\\\" defer></script>\\n            <style media=\\\"screen\\\">\\n                    html,body{\\n                        margin:0;\\n                        height:100%;\\n                    }\\n                    #app{\\n                        height: 100%;\\n                        width: 100%;\\n                    }\\n            </style>        \\n            <link rel=\\\"stylesheet\\\" href=\\\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css\\\"/>\\n        </head>\\n        <body>\\n          <div id=\\\"app\\\"></div>\\n        </body>\\n      </html>\\n    \");\n});\n\n// Start the server and let it listen for incoming requests on port 3000\napp.listen(4000, function () {\n  log(\"Server is listening on port: 4000\");\n});\n\n// Other Route Handlers for the App Server are defined as follows\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/log.js":
/*!***************************!*\
  !*** ./src/server/log.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.log = log;\n// Logging level \n// LOGLEVEL = 1  -- Normal logging\n// LOGLEVEL = 5  -- Info logging\n// LOGLEVEL = 10 -- Debug logging\nvar NORMAL_LOG = exports.NORMAL_LOG = 1;\nvar INFO_LOG = exports.INFO_LOG = 5;\nvar DEBUG_LOG = exports.DEBUG_LOG = 10;\nvar ERROR = exports.ERROR = 0;\n\nvar LOGLEVEL = DEBUG_LOG;\n\nfunction log(logmsg, loglvl) {\n    if (loglvl === undefined) {\n        loglvl = 1;\n    }\n    if (loglvl <= LOGLEVEL) {\n\n        if (loglvl === NORMAL_LOG) {\n            console.log(logmsg);\n        } else if (loglvl === ERROR) {\n            console.log(\"ERROR : \" + logmsg);\n        } else if (loglvl === INFO_LOG) {\n            console.log(\"INFO : \" + logmsg);\n        } else if (loglvl === DEBUG_LOG) {\n            console.log(\"DEBUG : \" + logmsg);\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/server/log.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serve-favicon\");\n\n//# sourceURL=webpack:///external_%22serve-favicon%22?");

/***/ })

/******/ });