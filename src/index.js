import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime.js'

import { makeRequest } from './graphql/lib'

import { UserCreateForm, UserUpdateForm } from './components'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      action: 'update',
      userList: [],
      userUpdate: {},
      userUpdateID: ''
    }

    this.onUserUpdateChange = this.onUserUpdateChange.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount () {
    makeRequest({
      query: `{
        users {
          userID
          userName
        }
      }`
    }).then(({ users }) => {
      const userList = users.map(u => ({ value: u.userID, label: u.userName }))
      this.setState({ userList })
    })
  }

  onInputChange (v, f) {
    this.setState({ [f]: v })
  }

  onUserUpdateChange (id) {
    makeRequest({
      query: `query GetUser($userID: String) {
        user (userID: $userID) {
          userID
          userName
          country
          city
          postalCode
        }
      }`,
      variables: {
        userID: id
      }
    })
      .then(({ user }) => {
        this.setState({
          userUpdateID: id,
          userUpdate: user
        })
      })
      .catch(err => console.log(err))
  }

  // async userDataFormSubmitted (e) {
  //   e.preventDefault()
  //   const { formUserName, formNewUser } = this.state
  //   try {
  //     const res = await makeRequest({
  //       query: `mutation handleUserFormSubmission($userName: String, $authUserName: String) {
  //         setUserName(userName: $authUserName)
  //         createUser(userName: $userName) {
  //           userName
  //           userID
  //         }
  //       }`,
  //       variables: {
  //         authUserName: formUserName,
  //         userName: formNewUser
  //       }
  //     })
  //     this.setState({
  //       formUserName: res.setUserName,
  //       formNewUser: res.createUser,
  //       formSubmissionMsg: `User ${res.createUser.userName} (${
  //         res.createUser.userID
  //       }) was created.`
  //     })
  //   } catch (e) {
  //     console.log('FORM SUBMIT ERROR:', e)
  //   }
  // }

  render () {
    const { userList, action, userUpdate, userUpdateID } = this.state

    return (
      <div className='app'>
        <h1>Graphql Test</h1>

        <p>Select an action to perform:</p>
        <input
          name='userAction'
          type='radio'
          onChange={e => this.onInputChange(e.target.value, 'action')}
          value='update'
          checked={action === 'update'}
        />
        <label htmlFor='userAction'>Update user</label>
        <input
          name='userAction'
          type='radio'
          onChange={e => this.onInputChange(e.target.value, 'action')}
          value='create'
          checked={action === 'create'}
        />
        <label htmlFor='userAction'>Create user</label>

        {action === 'update' ? (
          <div className='user-form'>
            <h3>Select user to update</h3>
            <select
              name='userUpdate'
              onChange={e => this.onUserUpdateChange(e.target.value)}
              value={userUpdateID}
            >
              {userList.map((user, i) => (
                <option key={`userlist-0${i}`} value={user.value}>
                  {user.label}
                </option>
              ))}
            </select>

            {Object.keys(userUpdate).length > 0 && (
              <UserUpdateForm user={userUpdate} />
            )}
          </div>
        ) : (
          <UserCreateForm />
        )}
      </div>
    )
  }
}

const wrapper = document.getElementById('container')
wrapper ? ReactDOM.render(<App />, wrapper) : false
