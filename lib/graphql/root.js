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
  updateUser: function updateUser(_ref3) {
    var userID = _ref3.userID,
        userInput = _ref3.userInput;
    var index = fauxDB.users.findIndex(function (u) {
      return u.userID === userID;
    });
    fauxDB.users[index] = userInput;
  },
  users: function users() {
    return fauxDB.users;
  },
  user: function user(_ref4) {
    var userID = _ref4.userID;
    return fauxDB.users.find(function (user) {
      return user.userID === userID;
    });
  }
};
var fauxDB = {
  authUser: {
    userID: '2341',
    userName: 'Chris',
    city: 'Berlin',
    country: 'DE',
    postalCode: '9065'
  },
  users: [{
    userID: '2341',
    userName: 'Chris',
    city: 'Berlin',
    country: 'DE',
    postalCode: '9065'
  }, {
    userID: '43456',
    userName: 'Justin',
    city: 'Berlin',
    country: 'DE',
    postalCode: '9065'
  }, {
    userID: '9735',
    userName: 'Flynn',
    city: 'Berlin',
    country: 'DE',
    postalCode: '9065'
  }, {
    userID: '9105',
    userName: 'Dylan',
    city: 'Cape Town',
    country: 'RSA',
    postalCode: '8000'
  }]
};