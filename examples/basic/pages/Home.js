import React from 'react';
import Nav from '../components/Nav';

class Home extends React.Component {
  static async getInitialProps({ req }) {
    return { thing: 'hello' };
  }

  render() {
    return (
      <div>
        <Nav />Home {JSON.stringify(this.props.data, null, 2)}
      </div>
    );
  }
}

export default Home;
