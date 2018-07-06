import React from 'react';

class About extends React.Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { stuff: 'more stuffs' };
  }
  render() {
    return this.props.stuff ? <div>about</div> : null;
  }
}

export default About;
