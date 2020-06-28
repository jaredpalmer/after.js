import React from 'react';

class Home extends React.Component {
  static displayName = 'Assessments';

  static async getInitialProps() {
    return { stuff: 'home stuffs' };
  }

  render() {
    return <h1>Home</h1>;
  }
}

export default Home;
