// Explains how/where to get data / Resolvers could live here (whatever they are)
exports.root = {
  hello: () => 'Hello world!',
  authUser: () => fauxDB.authUser,
  setUserName: ({ userName }) => {
    fauxDB.authUser.userName = userName
    return userName
  },
  createUser: ({ userName }) => {
    const createdUser = {
      userName,
      userID: Date.now()
    }
    fauxDB.users.push(createdUser)
    return createdUser
  },
  users: () => fauxDB.users
}

var fauxDB = {
  authUser: {
    userID: '2341',
    userName: 'Chris'
  },
  users: [
    {
      userID: '2341',
      userName: 'Chris'
    },
    {
      userID: '43456',
      userName: 'Justin'
    },
    {
      userID: '9735',
      userName: 'Flynn'
    }
  ]
}
