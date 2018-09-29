import React from 'react'
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { Button } from '@material-ui/core';

const handleSignOut = (client, history) => {
  localStorage.setItem('token', '')
  client.resetStore()
  history.push('/')
}

const SignOut = ({ history }) => {
  return (
    <ApolloConsumer>
      {client => {
        return (
          <Button
            variant="contained"
            color="inherit"
            onClick={(event) => {
            handleSignOut(client, history)
          }}>Sign Out</Button>
        )
      }}
    </ApolloConsumer>
  )
}

export default withRouter(SignOut)
