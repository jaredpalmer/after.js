import React, { Component } from 'react';
import logo from './react.svg';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    var data = { stuff: 'whatevs' };
    if (req) {
      // this block is only executed in the server
      try {
        const hashed = await require('./server/util').hashString('Hello world');
        data['hashed'] = hashed;
      } catch (error) {
        console.log(error);
      }
    }
    return data;
  }
  render() {
    console.log(this.props);
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to After.js</h2>
        </div>
        <p className="Home-intro">
          To get started, edit
          <code>src/Home.js</code> or <code>src/About.js</code>
          and save to reload.
        </p>
        {this.props.hashed && <p>{this.props.hashed}</p>}
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

export default Home;
