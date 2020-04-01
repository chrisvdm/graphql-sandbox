import React, { Component } from 'react'

class UserUpdateForm extends Component {
  construct (props) {
    super()
    this.state = {
      name: '',
      postalCode: '',
      city: '',
      country: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmission = this.onFormSubmission.bind(this)
  }

  onInputChange (value, name) {
    this.setState({ [name]: value })
  }

  onFormSubmission (e) {
    e.preventDefault()
    console.log(this.state)
  }

  render () {
    const { name, country, city, postalCode } = this.state

    return (
      <form onSubmit={e => this.onFormSubmission(e)}>
        <h3>Create User</h3>

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

        <input type='submit' value='Create User' />
      </form>
    )
  }
}

export default UserUpdateForm
