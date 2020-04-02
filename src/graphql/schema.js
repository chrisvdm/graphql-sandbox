const { buildSchema } = require('graphql')

exports.schema = buildSchema(`
  type User {
    userID: ID
    userName: String,
    country: String,
    city: String,
    postalCode: String
  }

  type Query {
    hello: String
    authUser: User
    setUserName: String
    users: [User]
    user(userID: String): User
  }

  type Mutation {
    setUserName(userName: String): String
    createUser(userName: String): User
    updateUser(userID: String, userInput: User): User
  }
`)
