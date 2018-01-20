import React from 'react';
import { NavLink } from 'react-router-dom';
import { Page } from './components';

class About extends React.Component {
  render() {
    return (
      <Page>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <h1>About</h1>
      </Page>
    );
  }
}

export default About;
