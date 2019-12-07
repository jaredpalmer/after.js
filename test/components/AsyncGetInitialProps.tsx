import React from 'react';

export interface AsyncGetInitialPropsProps {
  stuff: string;
}

const api = () => Promise.resolve({ stuff: 'async call' });

class AsyncGetInitialProps extends React.Component<AsyncGetInitialPropsProps> {
  static async getInitialProps() {
    return await api();
  }

  render() {
    return <h1>AsyncGetInitialProps</h1>;
  }
}

export default AsyncGetInitialProps;
