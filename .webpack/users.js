(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(4);

var _stringify2 = _interopRequireDefault(_stringify);

exports.success = success;
exports.failure = failure;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(body) {
  return buildResponse(200, body);
}

function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: (0, _stringify2.default)(body)
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = __webpack_require__(0);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(1);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event, context, callback) {
    var params, cognitoidentityserviceprovider;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const params = {
            //   TableName: 'statuses',
            //   // 'KeyConditionExpression' defines the condition for the query
            //   // - 'userId = :userId': only return items with matching 'userId' partition key
            //   // 'ExpressionAttributeValues' defines the value in the condition
            //   // - ':userId': defines 'userId' to be Identity Pool identity id of the authenticated user
            //   KeyConditionExpression: "userId = :userId",
            //   ExpressionAttributeValues: {
            //     ":userId": event.requestContext.identity.cognitoIdentityId,
            //   }
            // };

            // from: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#listUsers-property
            // move this to a cognito-config.js file
            // const cognito: {
            //   REGION: 'us-west-2',
            //   USER_POOL_ID : 'us-west-2_7TooDx4yJ',
            //   APP_CLIENT_ID : '2sdk53svubdtll8gigcscjb0an',
            //   IDENTITY_POOL_ID: 'us-west-2:a29de7a9-b998-43cf-913d-201086b4442e',
            // }

            params = {
              UserPoolId: 'us-west-2_7TooDx4yJ', /* required */
              AttributesToGet: ['Username']
              // Filter: 'STRING_VALUE',
              // Limit: 0,
              // PaginationToken: 'STRING_VALUE'
            };


            try {
              // const result = await dynamoDbLib.call('query', params);
              // Return the matching list of items in response body

              // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#listUsers-property
              // const result = await CognitoUserPool.call('something' params)


              // Instead of stuff below try just instantiating a cognito userpool direction, as in login.js on the client:
              // const userPool = new CognitoUserPool({
              //   UserPoolId: config.cognito.USER_POOL_ID,
              //   ClientId: config.cognito.APP_CLIENT_ID
              // });


              cognitoidentityserviceprovider = new _awsSdk2.default.CognitoIdentityServiceProvider();
              // cognitoidentityserviceprovider.adminForgetDevice(params, function (err, data) {
              //   if (err) console.log(err, err.stack); // an error occurred
              //   else     console.log(data);           // successful response
              // });

              cognitoidentityserviceprovider.listUsers(params, function (err, data) {
                if (err) {
                  console.log(err, err.stack); // an error occurred
                } else {
                  // console.log(data);           // successful response
                  return data;
                }
              });

              callback(null, (0, _responseLib.success)(result.Items));
            } catch (e) {
              console.log(e);
              callback(null, (0, _responseLib.failure)({ status: false }));
            }

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // replace with something calling cognito, unless it turns out you need to create a 'users' table in ddb
// import * as dynamoDbLib from './libs/dynamodb-lib';


var _responseLib = __webpack_require__(3);

var _awsSdk = __webpack_require__(2);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _amazonCognitoIdentityJs = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("amazon-cognito-identity-js");

/***/ })
/******/ ])));