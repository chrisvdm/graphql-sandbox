// const { App } = require('./lib')

const http = require('http')
const url = require('url')
const bodyParser = require('body-parser')

const { graphql } = require('graphql')
const { schema } = require('./lib/graphql/schema')
const { root } = require('./lib/graphql/root')

const React = require('react')
const ReactDOMServer = require('react-dom/server')

const port = '8080'

const server = http.createServer(async (req, res) => {
  const urlParts = url.parse(req.url, true)

  let queryObject = {
    params: urlParts.query,
    pathname: urlParts.pathname
  }

  if (queryObject.pathname === '/favicon.ico') {
    return null
  } else if (queryObject.pathname === '/graphql') {
    // Get body from request
    let body = {}
    await req.on('data', chunk => {
      body = JSON.parse(chunk)
    })
    req.on('end', () => {
      console.log('end of stream')
    })

    console.log('QUERY:', body.query)
    console.log('VARIABLES:', body.variables)

    const result = await graphql(
      schema,
      body.query,
      root,
      undefined,
      body.variables
    )
      .then(r => {
        queryObject = {
          ...queryObject,
          result: r.data
        }
        console.log('RESULT:', r)
        return res.end(JSON.stringify(r))
      })
      .catch(error => console.log(error))
    return null
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      <div id="container"></div>
      <script src='http://localhost:8081/main.js'></script>
    </body>
  </html>`)
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
