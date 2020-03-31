"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = void 0;

var _lib = require("../lib");

var createUser = function createUser(_ref, callback) {
  var userNameInput = _ref.userNameInput;
  (0, _lib.makeRequest)({
    name: 'CREATE USER',
    query: "mutation CreateUser($userName: String) {\n      createUser(userName: $userName) {\n        userName \n        userID\n      }\n    }",
    variables: {
      userName: userNameInput
    },
    onSuccess: function onSuccess(results) {
      console.log(results);
      callback(results);
    }
  });
};

exports.createUser = createUser;