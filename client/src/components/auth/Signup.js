import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { TextField, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel  } from '@material-ui/core';

import { SIGNUP_USER } from '../queries';
import Error from './Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  console: 'PS4'
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
    const { email, password, username, passwordConfirmation, console } = this.state;
    return (
      <div className="app">
        <Typography variant="display1">Sign Up</Typography>
        <Mutation mutation={SIGNUP_USER} variables={{username, password, email, console}}>

          {( signupUser, {data, loading, error}) => {
            if (loading) {
              return (
                <div>Loading...</div>
              )
            }

            return (
              <form
                noValidate
                autoComplete="off"
                className="form" 
                onSubmit={(event) => {
                  this.handleSubmit(event, signupUser)
                }}
              >
              <TextField
                  label="Username"
                  type="text"
                  margin="normal"
                  name="username" 
                  value={username}
                  onChange={this.handleChange} 
                />
                <TextField
                  label="Email"
                  type="email"
                  margin="normal"
                  name="email" 
                  value={email}
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
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.handleChange} 
                  margin="normal"
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Console</FormLabel>
                  <RadioGroup
                    aria-label="console"
                    name="console"
                    value={this.state.console}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="PS4"
                      control={<Radio color="primary" />}
                      label="PS4"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="Switch"
                      control={<Radio color="primary" />}
                      label="Switch"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="Xbox One"
                      control={<Radio color="primary" />}
                      label="Xbox One"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  type="submit" 
                  className="button-primary"
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

export default withRouter(Signup);