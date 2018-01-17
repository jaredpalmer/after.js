import * as React from 'react';
import './Home.css';
import logo from './logo.svg';
import { AfterProps } from '@jaredpalmer/after';

class Home extends React.Component<AfterProps<{}>> {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to the Afterparty</h2>
        </div>
      </div>
    );
  }
}

export default Home;
