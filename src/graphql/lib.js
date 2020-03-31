exports.makeRequest = ({ query, variables = {}, name, method = 'POST' }) => {
  return fetch('/graphql', {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ query, variables })
  })
    .then(res => {
      return res.json()
    })
    .then(result => {
      console.log(`%c SUCCESS`, 'color: green')
      return result.data
    })
    .catch(error => {
      console.log(`%c ERROR`, 'color: red', error)
    })
}
