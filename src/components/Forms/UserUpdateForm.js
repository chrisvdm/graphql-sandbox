import React, { Component } from 'react'

import { makeRequest } from '../../graphql/lib'

class UserUpdateForm extends Component {
  constructor (props) {
    super(props)

    const { user } = props
    this.state = {
      name: user.userName,
      postalCode: user.postalCode,
      city: user.city,
      country: user.country
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmission = this.onFormSubmission.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.user !== this.props.user) {
      const { user } = this.props
      this.setState({
        name: user.userName,
        postalCode: user.postalCode,
        city: user.city,
        country: user.country
      })
    }
  }

  onInputChange (value, name) {
    this.setState({ [name]: value })
  }

  onFormSubmission (e) {
    e.preventDefault()
    console.log(this.state)
    makeRequest({
      query: `mutation updateUser ($userID: String, $userInput: User)
      updateUser(userID: $userID, userInput: $userInput) {
        userName 
        country 
        city 
        postalCode
      }`,
      variables: {
        userID: this.props.user.userID,
        userInput: { ...this.state }
      }
    })
  }

  render () {
    const { name, country, city, postalCode } = this.state
    return (
      <form onSubmit={e => this.onFormSubmission(e)}>
        <h3>Update User : {name}</h3>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={e => this.onInputChange(e.target.value, 'name')}
        />

        <label htmlFor='city'>City</label>
        <input
          type='text'
          name='city'
          value={city}
          onChange={e => this.onInputChange(e.target.value, 'city')}
        />

        <label htmlFor='postalCode'>Postal Code</label>
        <input
          type='text'
          name='postalCode'
          value={postalCode}
          onChange={e => this.onInputChange(e.target.value, 'postalCode')}
        />

        <label htmlFor='country'>Country</label>
        <input
          type='text'
          name='country'
          value={country}
          onChange={e => this.onInputChange(e.target.value, 'country')}
        />

        <input type='submit' value='Update User' />
      </form>
    )
  }
}

export default UserUpdateForm
