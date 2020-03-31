"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = void 0;

var _lib = require("../lib");

var createUser = function createUser(userNameInput, callback) {
  (0, _lib.makeRequest)({
    name: 'CREATE USER',
    query: "mutation CreateUser($userName: String) {\n      createUser(userName: $userName) {\n        userName\n        userID\n      }\n    }",
    variables: {
      userName: userNameInput
    },
    onSuccess: function onSuccess(_ref) {
      var createUser = _ref.createUser;
      callback(createUser);
    }
  });
};

exports.createUser = createUser;