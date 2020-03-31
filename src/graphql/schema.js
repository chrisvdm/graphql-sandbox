const { buildSchema } = require('graphql')

exports.schema = buildSchema(`
  type User {
    userID: ID
    userName: String
  }

  type Query {
    hello: String
    authUser: User
    setUserName: String
    users: [User]
  }

  type Mutation {
    setUserName(userName: String): String
    createUser(userName: String): User
  }
`)
