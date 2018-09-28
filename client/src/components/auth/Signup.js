import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { SIGNUP_USER } from '../queries';
import Error from './Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

class Signup extends Component {
  state = { ...initialState }

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then( async ({data: signupUser}) => {
      localStorage.setItem('token', signupUser.token)
      await this.props.refetch();
      this.clearState()
      this.props.history.push('/')
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  validateForm = () => {
    const { email, password, username, passwordConfirmation } = this.state;
    const isInvalid = !email || !password || !username || password !== passwordConfirmation;
    return isInvalid;
  }

  clearState = () => {
    this.setState({ ...initialState })
  }
  render() {
    const { email, password, username, passwordConfirmation } = this.state;
    return (
      <div className="app">
        <h1 className="app">Sign Up</h1>
        <Mutation mutation={SIGNUP_USER} variables={{username, password, email}}>

          {( signupUser, {data, loading, error}) => {
            if (loading) {
              return (
                <div>Loading...</div>
              )
            }

            return (
              <form className="form" onSubmit={(event) => {
                this.handleSubmit(event, signupUser)
              }}>
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange} 
                />
                <input 
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange} 
                />
                <input 
                type="password" 
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange} 
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
                <button 
                  type="submit" 
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >Submit
                </button>
                {error && <Error error={error} />}
              </form>
            )
          }}
          
        </Mutation>

      </div>
    )
  }
}

export default withRouter(Signup);