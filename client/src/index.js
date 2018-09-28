import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import './index.css';
import App from './components/App';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import withSession from './components/withSession';
import NavBar from './components/NavBar';
import Profile from './components/Profile/Profile';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({networkError }) => {
    // console.log('networkError',networkError)
  }
})

const Root = ({ refetch, session}) => (
  <Router>
    <Fragment>
      <NavBar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client} >
    <RootWithSession />
  </ApolloProvider>
, document.getElementById('root'));
