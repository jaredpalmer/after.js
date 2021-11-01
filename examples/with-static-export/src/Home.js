import React, { Component } from 'react';
import logo from './react.svg';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to After.js</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/Home.js</code> or{' '}
        <code>src/About.js</code>and save to reload.
      </p>
      <Link to="/about">About -></Link>
    </div>
  );
}

Home.getInitialProps = async ({
  req,
  res,
  match,
  history,
  location,
  ...ctx
}) => {
  return { whatever: 'stuff' };
};

export default Home;
