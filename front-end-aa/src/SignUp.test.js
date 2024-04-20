import '@testing-library/jest-dom';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import SignUpPanel from './SignUp';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { testObject } from './testData';
import React from 'react';

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
    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
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
        const firstnameInputField = screen.getByTestId("firstName");
        userEvent.type(firstnameInputField, testObject.firstname);
        expect(firstnameInputField).toHaveValue(testObject.firstname);
    });
});

test('last name input', async () => {
    render(
        <BrowserRouter>
            <SignUpPanel />
        </BrowserRouter>
    );
    await act(() => {
        const lastnameInputField = screen.getByTestId("lastName");
        userEvent.type(lastnameInputField, testObject.lastname);
        expect(lastnameInputField).toHaveValue(testObject.firstname);
    });
})

test('email', async () => {
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

test('password', async () => {
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
})
<<<<<<< HEAD
=======

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
>>>>>>> back end patient
