import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Signout from './auth/Signout';
import './NavBar.css';

export default ({ session }) => {
  return (
    <div>
    <AppBar className="app-bar" position="static">
        <Toolbar>
          <Typography variant="title" style={{ color: '#FFC107', fontWeight: 'bold'}}>
            BRAWL HOLLA !
          </Typography>
          <Typography variant="title" color="inherit">
            {session && session.getCurrentUser ? <NavBarAuth session={session} /> : <NavBarUnAuth />}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const NavBarUnAuth = () => (
  <ul>
    <li><NavLink to="/" exact >Home</NavLink></li>
    <li><NavLink to="/search">Search</NavLink></li>
    <li><NavLink to="/signin">Sign in</NavLink></li>
    <li><NavLink to="/signup">Sign up</NavLink></li>
  </ul>  
);

const NavBarAuth = ({session}) => (
  <Fragment>
    <ul>
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink to="/search">Search</NavLink></li>
      <li><NavLink to="/profile">Profile</NavLink></li>
      <li><Signout /></li>
    </ul>
    <h4 className="app">{`Welcome, ${session.getCurrentUser.username}`}</h4>
  </Fragment>
);
