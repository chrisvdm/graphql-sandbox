"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthUser = exports.setAuthUserName = void 0;

var _lib = require("../lib");

var setAuthUserName = function setAuthUserName(userNameInput, callback) {
  (0, _lib.makeRequest)({
    name: 'SET AUTH USERNAME',
    query: "mutation SetUserName($userName: String) {\n      setUserName(userName: $userName)\n      \n    }",
    variables: {
      userName: userNameInput
    },
    onSuccess: function onSuccess(_ref) {
      var setUserName = _ref.setUserName;
      callback({
        userName: setUserName
      });
    }
  });
};

exports.setAuthUserName = setAuthUserName;

var getAuthUser = function getAuthUser(callback) {
  (0, _lib.makeRequest)({
    name: 'GET AUTH USER',
    query: "{\n      authUser {\n      userID\n      userName\n      }\n    }",
    onSuccess: function onSuccess(_ref2) {
      var authUser = _ref2.authUser;
      console.log(authUser);
      callback(authUser);
    }
  });
};

exports.getAuthUser = getAuthUser;