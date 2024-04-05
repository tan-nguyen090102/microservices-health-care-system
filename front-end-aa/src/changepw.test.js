import { BrowserRouter, isRouteErrorResponse } from "react-router-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import ChangePw from "./changepw"
import userEvent from "@testing-library/user-event";

const userID = "abc@gmail.com"
const state = { userID: "abc@gmail.com", authCode: "abcdefghijkl" }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
  
  state: state
  })
}));


describe('changepw', () => {
  test('renders change password form', async () => {
    render(
      <BrowserRouter>
        <ChangePw />
      </BrowserRouter>
    );
    const userIDInput = screen.getByTestId("userID-input");
    expect(userIDInput).toHaveValue(userID);

    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeInTheDocument();


    const passwordConfirmInput = screen.getByTestId("passwordConfirm-input");
    expect(passwordConfirmInput).toBeInTheDocument();


    const changePasswordButton = screen.getByTestId("changePasswordButton");
    expect(changePasswordButton).toBeDisabled();
  // user.type(userIDInput, "abc@gmail.com")

    const loginLink = screen.getByTestId("login-link");
    expect(loginLink).toBeInTheDocument();

    const signUpLink = screen.getByTestId("sign-up-link");
    expect(signUpLink).toBeInTheDocument();
  });

  test('submit change password form', async () => {
    render(
      <BrowserRouter>
        <ChangePw />
      </BrowserRouter>
    );
    const userIDInput = screen.getByTestId("userID-input");
    expect(userIDInput).toHaveValue(userID);
 
    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeInTheDocument();

    const passwordConfirmInput = screen.getByTestId("passwordConfirm-input");
    expect(passwordConfirmInput).toBeInTheDocument();

    const changePasswordButton = screen.getByTestId("changePasswordButton");
    expect(changePasswordButton).toBeDisabled();

    await userEvent.type(passwordInput, "123456789")
    expect(passwordInput).toHaveValue("123456789")

    expect(changePasswordButton).toBeDisabled();

    await userEvent.type(passwordConfirmInput, "123456789")
    expect(passwordConfirmInput).toHaveValue("123456789")

    expect(changePasswordButton).toBeEnabled();

    await userEvent.click(changePasswordButton)

  });
})
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



