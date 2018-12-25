import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './react.svg';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { stuff: 'whatevs' };
  }
  render() {
    console.log(this.props);
    return (
      <SampleStyledComponent className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to After.js</h2>
        </div>
        <p className="Home-intro">
          To get started, edit
          <code>src/Home.js</code> or <code>src/About.js</code>and save to
          reload.
        </p>
        <Link to="/about">About -></Link>
      </SampleStyledComponent>
    );
  }
}

export default Home;
const SampleStyledComponent = styled.div`
  color: red;
`;
