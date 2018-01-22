import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class About extends React.Component {
  static getInitialProps() {
    return sleep(300).then(() => ({ stuff: 'about' }));
  }

  static propTypes = {
    stuff: PropTypes.node,
  };

  static defaultProps = {
    stuff: null,
  };

  render() {
    return (
      <div className="page">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <h1>About</h1>
        <pre>data: {this.props.stuff ? this.props.stuff : 'Loading...'}</pre>
      </div>
    );
  }
}

export default About;
