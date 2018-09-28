import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { SIGNIN_USER } from '../queries';
import Error from './Error';

const initialState = {
  username: '',
  password: '',
}

class Signin extends Component {
  state = { ...initialState }

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then( async ({data: { signinUser }}) => {
      console.log(signinUser)
      localStorage.setItem('token', signinUser.token)
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
    const { password, username } = this.state;
    const isInvalid = !password || !username;
    return isInvalid;
  }

  clearState = () => {
    this.setState({ ...initialState })
  }
  render() {
    const { password, username } = this.state;
    return (
      <div className="app">
        <h1 className="app">Sign In</h1>
        <Mutation mutation={SIGNIN_USER} variables={{username, password}}>

          {( signinUser, {data, loading, error}) => {
            if (loading) {
              return (
                <div>Loading...</div>
              )
            }

            return (
              <form className="form" onSubmit={(event) => {
                this.handleSubmit(event, signinUser)
              }}>
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange} 
                />
                <input 
                type="password" 
                name="password"
                placeholder="Password"
                value={password}
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

export default withRouter(Signin);