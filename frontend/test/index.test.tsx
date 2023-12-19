import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../src/routes/Routes';

describe('', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Routes />, div);
  });
});
