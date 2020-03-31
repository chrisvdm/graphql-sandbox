"use strict";

// Explains how/where to get data / Resolvers could live here (whatever they are)
exports.root = {
  hello: function hello() {
    return 'Hello world!';
  },
  authUser: function authUser() {
    return fauxDB.authUser;
  },
  setUserName: function setUserName(_ref) {
    var userName = _ref.userName;
    fauxDB.authUser.userName = userName;
    return userName;
  },
  createUser: function createUser(_ref2) {
    var userName = _ref2.userName;
    var createdUser = {
      userName: userName,
      userID: Date.now()
    };
    fauxDB.users.push(createdUser);
    return createdUser;
  },
  users: function users() {
    return fauxDB.users;
  }
};
var fauxDB = {
  authUser: {
    userID: '2341',
    userName: 'Chris'
  },
  users: [{
    userID: '2341',
    userName: 'Chris'
  }, {
    userID: '43456',
    userName: 'Justin'
  }, {
    userID: '9735',
    userName: 'Flynn'
  }]
};