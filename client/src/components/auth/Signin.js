import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core'
import { SIGNIN_USER } from '../queries';
import Error from './Error';
import backgroundImage from './background.jpeg';

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
      <div 
        className="app"
      >
        <h1 className="app">Sign In</h1>
        <Mutation mutation={SIGNIN_USER} variables={{username, password}}>

          {( signinUser, {data, loading, error}) => {
            if (loading) {
              return (
                <div>Loading...</div>
              )
            }

            return (
              <form className="form"
                noValidate
                autoComplete="off"
              onSubmit={(event) => {
                this.handleSubmit(event, signinUser)
              }}>
                <TextField
                  label="Username"
                  type="text"
                  margin="normal"
                  name="username" 
                  value={username}
                  onChange={this.handleChange} 
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password" 
                  value={password}
                  onChange={this.handleChange} 
                  margin="normal"
                />
                <Button 
                  type="submit" 
                  className="button-primary"
                  variant="contained"
                  disabled={loading || this.validateForm()}
                >Submit
                </Button>
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