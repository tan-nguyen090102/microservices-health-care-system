import { render, screen } from '@testing-library/react';
import Forgot from './forgot';

test('renders forgot password form', () => {
  render(<Forgot />);
  const userIDInput = screen.getByTestId("userID-input");
  expect(userIDInput).toBeInTheDocument();
});
