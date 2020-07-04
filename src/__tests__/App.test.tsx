import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders Kaseb.io link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Kaseb.io/i);
  expect(linkElement).toBeInTheDocument();
});
