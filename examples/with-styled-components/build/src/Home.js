import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.svg';
import { Page, Logo } from './components';

class Home extends React.Component {
  render() {
    return (
      <Page>
        <Logo src={logo} alt="After.js Logo" />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <h1>Home</h1>
      </Page>
    );
  }
}

export default Home;
