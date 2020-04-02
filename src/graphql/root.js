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
  updateUser: ({ userID, userInput }) => {
    const index = fauxDB.users.findIndex(u => u.userID === userID)
    fauxDB.users[index] = userInput
  },
  users: () => fauxDB.users,
  user: ({ userID }) => fauxDB.users.find(user => user.userID === userID)
}

var fauxDB = {
  authUser: {
    userID: '2341',
    userName: 'Chris',
    city: 'Berlin',
    country: 'DE',
    postalCode: '9065'
  },
  users: [
    {
      userID: '2341',
      userName: 'Chris',
      city: 'Berlin',
      country: 'DE',
      postalCode: '9065'
    },
    {
      userID: '43456',
      userName: 'Justin',
      city: 'Berlin',
      country: 'DE',
      postalCode: '9065'
    },
    {
      userID: '9735',
      userName: 'Flynn',
      city: 'Berlin',
      country: 'DE',
      postalCode: '9065'
    },
    {
      userID: '9105',
      userName: 'Dylan',
      city: 'Cape Town',
      country: 'RSA',
      postalCode: '8000'
    }
  ]
}
