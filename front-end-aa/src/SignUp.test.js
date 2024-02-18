<<<<<<< HEAD
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import SignUpPanel from "./SignUp";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { testObject } from "./testUser";
import React from "react";
=======
import '@testing-library/jest-dom';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import SignUpPanel from './SignUp';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { testObject } from './testData';
import React from 'react';
>>>>>>> front end for signup

//Clean up after each test
afterEach(() => {
    cleanup();
})

//Mock fetch
global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve({ data: "mock" }),
    })
);

let spy = jest.SpyInstance;
beforeEach(() => {
<<<<<<< HEAD
    spy = jest.spyOn(console, "error").mockImplementation(() => null);
=======
    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
>>>>>>> front end for signup
})
afterEach(() => {
    spy.mockRestore();
});

test("first name input", async () => {
    render(
        <BrowserRouter>
            <SignUpPanel />
        </BrowserRouter>
    );
    await act(() => {
<<<<<<< HEAD
        const firstnameInputField = screen.getByTestId("firstName");
=======
        const firstnameInputField = screen.getByTestId("firstname");
>>>>>>> front end for signup
        userEvent.type(firstnameInputField, testObject.firstname);
        expect(firstnameInputField).toHaveValue(testObject.firstname);
    });
});

<<<<<<< HEAD
test("last name input", async () => {
=======
test('last name input', async () => {
>>>>>>> front end for signup
    render(
        <BrowserRouter>
            <SignUpPanel />
        </BrowserRouter>
    );
    await act(() => {
<<<<<<< HEAD
        const lastnameInputField = screen.getByTestId("lastName");
        userEvent.type(lastnameInputField, testObject.lastname);
        expect(lastnameInputField).toHaveValue(testObject.lastname);
    });
})

test("email", async () => {
=======
        const lastnameInputField = screen.getByTestId("lastname");
        userEvent.type(lastnameInputField, testObject.lastname);
        expect(lastnameInputField).toHaveValue(testObject.firstname);
    });
})

test('email', async () => {
>>>>>>> front end for signup
    render(
        <BrowserRouter>
            <SignUpPanel />
        </BrowserRouter>
    );
    await act(() => {
        const emailInputField = screen.getByTestId("email");
        userEvent.type(emailInputField, testObject.email);
        expect(emailInputField).toHaveValue(testObject.email);
    });
})

<<<<<<< HEAD
test("password", async () => {
=======
test('password', async () => {
>>>>>>> front end for signup
    render(
        <BrowserRouter>
            <SignUpPanel />
        </BrowserRouter>
    );
    await act(() => {
        const passwordInputField = screen.getByTestId("password");
        userEvent.type(passwordInputField, testObject.password);
        expect(passwordInputField).toHaveValue(testObject.password);
    });
})

test("Signup button click", async () => {
    render(
        <BrowserRouter>
            <SignUpPanel />
        </BrowserRouter>
    );
    await act(() => {
        const submitButton = screen.getByTestId("submitButton");
        act(() => userEvent.click(submitButton));
        waitFor(() => expect(submitButton).toBeDefined());
    })
<<<<<<< HEAD
})

test("login link", async () => {
    render(
        <BrowserRouter>
            <SignUpPanel />
        </BrowserRouter>
    );
    await act(() => {
        const loginlink = screen.getByTestId("loginlink");
        act(() => userEvent.click(loginlink));
        waitFor(() => expect(loginlink).toBeDefined());
    })
})

test("forgot link", async () => {
    render(
        <BrowserRouter>
            <SignUpPanel />
        </BrowserRouter>
    );
    await act(() => {
        const resetlink = screen.getByTestId("forgotlink");
        act(() => userEvent.click(resetlink));
        waitFor(() => expect(resetlink).toBeDefined());
    })
})
=======
})
>>>>>>> front end for signup
