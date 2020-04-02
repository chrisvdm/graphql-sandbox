"use strict";

var _require = require('graphql'),
    buildSchema = _require.buildSchema;

exports.schema = buildSchema("\n  type User {\n    userID: ID\n    userName: String,\n    country: String,\n    city: String,\n    postalCode: String\n  }\n\n  type Query {\n    hello: String\n    authUser: User\n    setUserName: String\n    users: [User]\n    user(userID: String): User\n  }\n\n  type Mutation {\n    setUserName(userName: String): String\n    createUser(userName: String): User\n    updateUser(userID: String, userInput: User): User\n  }\n");