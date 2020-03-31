import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime.js'

import { makeRequest } from './graphql/lib'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      formUserName: '',
      formSubmissionMsg: '',
      formNewUser: '',
      newUser: null,
      users: []
    }

    this.userDataButtonClicked = this.userDataButtonClicked.bind(this)
    this.userDataFormSubmitted = this.userDataFormSubmitted.bind(this)
    this.formFieldChanged = this.formFieldChanged.bind(this)
  }

  componentDidMount () {
    makeRequest({
      query: `{
        users {
          userID
          userName
        }
      }`
    }).then(({ users }) => this.setState({ users }))
  }

  userDataButtonClicked () {
    makeRequest({
      query: `{
        authUser {
        userID
        userName
        }
      }`
    }).then(({ authUser }) => this.setState({ name: authUser.userName }))
  }

  formFieldChanged (v, f) {
    this.setState({ [f]: v })
  }

  async userDataFormSubmitted (e) {
    e.preventDefault()
    const { formUserName, formNewUser } = this.state
    try {
      const res = await makeRequest({
        query: `mutation handleUserFormSubmission($userName: String, $authUserName: String) {
          setUserName(userName: $authUserName)
          createUser(userName: $userName) {
            userName
            userID
          }
        }`,
        variables: {
          authUserName: formUserName,
          userName: formNewUser
        }
      })
      this.setState({
        formUserName: res.setUserName,
        formNewUser: res.createUser,
        formSubmissionMsg: `User ${res.createUser.userName} (${
          res.createUser.userID
        }) was created.`
      })
    } catch (e) {
      console.log('FORM SUBMIT ERROR:', e)
    }
  }

  render () {
    const {
      name,
      formUserName,
      formNewUser,
      formSubmissionMsg,
      newUser,
      users
    } = this.state
    return (
      <div>
        <h1>Graphql Test</h1>
        <h2>{name}</h2>

        {}
        {/* Retrieve data */}
        <div>
          <button onClick={this.userDataButtonClicked}>Get UserData</button>
        </div>

        <form onSubmit={e => this.userDataFormSubmitted(e)}>
          <p>{formSubmissionMsg}</p>

          <label htmlFor='formUserName'>Enter new username</label>
          <input
            type='text'
            name='formUserName'
            value={formUserName}
            onChange={e =>
              this.formFieldChanged(e.target.value, 'formUserName')
            }
          />

          <br />

          <label htmlFor='formNewUser'>
            Add new User by typing new username:{' '}
          </label>
          <input
            name='formNewUser'
            type='text'
            value={formNewUser}
            onChange={e => this.formFieldChanged(e.target.value, 'formNewUser')}
          />
          <br />
          <input type='submit' value='Update User' />
        </form>

        <ul>
          {users.map((user, id) => (
            <li key={`${id}userlist`}>{user.userName}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const wrapper = document.getElementById('container')
wrapper ? ReactDOM.render(<App />, wrapper) : false
