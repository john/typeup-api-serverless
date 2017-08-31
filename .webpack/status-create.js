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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = call;

var _awsSdk = __webpack_require__(3);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ region: 'us-west-2' });

function call(action, params) {
  var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(5);

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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 7 */
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
    var data, statusId, statusItem, userUpdateExpression, userAttributeValues, tableName, status_params, user_update_params, status_result, user_result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = JSON.parse(event.body);
            statusId = _uuid2.default.v1();

            // base status item

            statusItem = {
              statusId: statusId,
              cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
              userId: data.userId,
              title: data.title,
              content: null,
              userState: data.userState,
              attachment: data.attachment,
              createdAt: new Date().toISOString()
            };
            userUpdateExpression = 'set lastStatusId=:sid, lastStatusTitle = :t, lastStatusContent = :c, lastStatusCreatedAt = :ca, lastStatusAttachment = :lsa';
            userAttributeValues = {
              ":sid": statusId,
              ":t": data.title,
              ":c": null,
              ":ca": new Date().toISOString(),
              ":lsa": data.attachment

              // update status & user data if there's content
            };
            if (data.content) {
              statusItem.content = data.content;
              userAttributeValues[":c"] = data.content;
            }

            tableName = 'typeup-statuses-' + process.env.stage;
            status_params = {
              TableName: tableName,
              Item: statusItem
            };
            user_update_params = {
              TableName: 'users',
              Key: {
                userId: data.userId
              },
              UpdateExpression: userUpdateExpression,
              ExpressionAttributeValues: userAttributeValues,
              ReturnValues: "UPDATED_NEW"

              // separate failure statuses for user vs status
            };
            _context.prev = 9;
            _context.next = 12;
            return dynamoDbLib.call('put', status_params);

          case 12:
            status_result = _context.sent;
            _context.next = 15;
            return dynamoDbLib.call('update', user_update_params);

          case 15:
            user_result = _context.sent;


            callback(null, (0, _responseLib.success)(status_params.Item));
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](9);

            console.log(_context.t0);
            callback(null, (0, _responseLib.failure)({ status: false }));

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 19]]);
  }));

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _dynamodbLib = __webpack_require__(2);

var dynamoDbLib = _interopRequireWildcard(_dynamodbLib);

var _responseLib = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ })
/******/ ])));