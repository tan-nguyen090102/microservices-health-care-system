import { BrowserRouter } from "react-router-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import Forgot from './forgot';
import userEvent from "@testing-library/user-event";

test('renders forgot password form', () => {
  render(
    <BrowserRouter>
      <Forgot />
    </BrowserRouter>
  );
  const userIDInput = screen.getByTestId("userID-input");
  expect(userIDInput).toBeInTheDocument();
  expect(userIDInput).toHaveValue( "");

  const forgotpasswordButton = screen.getByTestId("forgotpasswordButton");
  expect(forgotpasswordButton).toBeDisabled();

  const loginLink = screen.getByTestId("login-link");
  expect(loginLink).toBeInTheDocument();

  const signUpLink = screen.getByTestId("sign-up-link");
  expect(signUpLink).toBeInTheDocument();
});

test('submit forgot password form', () => {
  render(
    <BrowserRouter>
      <Forgot />
    </BrowserRouter>
  );
  const userIDInput = screen.getByTestId("userID-input");
  expect(userIDInput).toBeInTheDocument();

  const forgotpasswordButton = screen.getByTestId("forgotpasswordButton");
  expect(forgotpasswordButton).toBeDisabled();

  userEvent.type(userIDInput, "abc@gmail.com")
  expect(userIDInput).toHaveValue( "abc@gmail.com");

  expect(forgotpasswordButton).toBeEnabled();

  userEvent.click(forgotpasswordButton)

});

afterEach(() => {
  cleanup();
});

//Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mock" }),
  })
);

let spy = jest.SpyInstance;
beforeEach(() => {
  spy = jest.spyOn(console, "error").mockImplementation(() => null);
});
afterEach(() => {
  spy.mockRestore();
});



