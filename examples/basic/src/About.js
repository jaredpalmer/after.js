import React, { Component } from 'react';

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    console.log('getting called');
    return { things: 'whateverssssss' };
  }

  render() {
    console.log(this.props);
    return <div>about</div>;
  }
}

export default Home;
