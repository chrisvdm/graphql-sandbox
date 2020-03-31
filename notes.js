var { graphql, buildSchema } = require('graphql')

var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// Explains how/where to get data
var root = { hello: () => 'Hello world!' }

graphql(schema, '{ hello }', root).then(response => {
  console.log(response)
})
