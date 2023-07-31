import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
 
  const wrapper =  render(<App />);
  const linkElement = wrapper.getByText('Danger');
  expect(linkElement).toBeInTheDocument();
});
