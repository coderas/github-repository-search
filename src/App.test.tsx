import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the app', async () => {
  const { getByText } = render(<App />);
  expect(await getByText(/Loading/i)).toBeInTheDocument();
});
