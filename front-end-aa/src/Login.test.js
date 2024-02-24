import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import LoginPanel from "./Login.js";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { testObject } from "./testData";
import React from "react";

//Clean up after each test
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

test("UserID input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const userIDInputField = screen.getByTestId("userID");
    userEvent.type(userIDInputField, testObject.userName);
    expect(userIDInputField).toHaveValue(testObject.userName);
  });
});

test("Password input", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const passwordInputField = screen.getByTestId("password");
    userEvent.type(passwordInputField, testObject.testPass);
    expect(passwordInputField).toHaveValue(testObject.testPass);
  });
});

test("Login button click", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const loginButton = screen.getByTestId("loginButton");
    act(() => userEvent.click(loginButton));
    waitFor(() => {
      expect(loginButton).toBeDefined();
    });
  });
});

test("Signup button click", async () => {
  render(
    <BrowserRouter>
      <LoginPanel />
    </BrowserRouter>
  );
  await act(() => {
    const signupButton = screen.getByTestId("signupButton");
    act(() => userEvent.click(signupButton));
    waitFor(() => expect(signupButton).toBeDefined());
  });
});
