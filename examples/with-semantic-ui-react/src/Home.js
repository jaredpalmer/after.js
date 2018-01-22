import React from 'react';

import { Input, Grid, Message } from 'semantic-ui-react';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }
  handleNameInputChange = (event, data) => {
    this.setState({
      name: data.value,
    });
  };
  render() {
    return (
      <Grid className="container">
        <Grid.Row centered verticalAlign="middle">
          <Grid.Column>
            <Message
              header={`Hello, ${this.state.name || 'Stranger'}`}
              content="This example show you how to use Semantic-UI-React with After.js"
              color="blue"
            />
            <Input
              placeholder="Enter your name here"
              onChange={this.handleNameInputChange}
              fluid
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
