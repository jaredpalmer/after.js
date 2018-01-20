import React from 'react';
import About from './About';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('<About />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <About stuff={'hello'} />
      </MemoryRouter>,
      div
    );
  });
});
