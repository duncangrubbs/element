import React from 'react';
import { render } from '@testing-library/react';
import Element from './Element';

test('renders learn react link', () => {
  const { getByText } = render(<Element />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
