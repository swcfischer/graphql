import React from 'react'
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

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
          <button onClick={(event) => {
            handleSignOut(client, history)
          }}>Sign Out</button>
        )
      }}
    </ApolloConsumer>
  )
}

export default withRouter(SignOut)
