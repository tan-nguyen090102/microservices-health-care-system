<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
=======
import React from 'react';
import { Link } from 'react-router-dom';
>>>>>>> back end patient
=======
import React from "react";
import { Link } from "react-router-dom";
>>>>>>> patient home page and sign up page
import {
  Flex,
  Stack,
  Heading,
  Wrap,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";

export default function SignUpPanel() {
  const serverIP = window.location.hostname;
  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  useEffect(() => {
    document.title = "Healthcare System Authentication";

    fetch("http://" + serverIP + ":3000/cas-signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({}),
    })
      ?.then((response) => response.json())
      .then((data) => {
        console.log(data);
        //User signed up, if credentials are valid they will be logged in to the system
        if (data[0] !== "False") {
          setUnauthorizedAccess(false);
          window.location = data[1];
        } else {
          setUnauthorizedAccess(false);
          //setNextURL(data[1]);

          //Check if the url is null
          if (data[1] === null) {
            setUnauthorizedAccess(true);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [serverIP]);

<<<<<<< HEAD
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  //Input listeners
  const [inputValue, setInputValue] = React.useState(initialValues);
=======
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }

  const [inputValue, setInputValue] = React.useState(initialValue);
>>>>>>> back end patient
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setPopUpInvalid(false);
  };

<<<<<<< HEAD
  //Handle login
  const [isPopUpInvalid, setPopUpInvalid] = React.useState(false);
=======
  const passwordRegex = [];
  const isValidPassword = (password) => {
    return passwordRegex.test(password);
  };

  const emailRegex = [];
  const isValidEmail = (email) => {
    return emailRegex.test(email);
  }


>>>>>>> patient home page and sign up page
  const handleSignUp = () => {
    if (!inputValue.firstName || !inputValue.lastName || !inputValue.email || !inputValue.password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!isValidPassword(inputValue.password)) {
      setErrorMessage(
        "Password must meet the following criteria:" +
        "Be at least 8 characters long," +
        "Have at least one number and one special character," +
        "Have at least one lowercase and one uppercase character."
      );
      return;
    }

    if (!isValidEmail(inputValue.email)){
      setErrorMessage("Please enter email in the correct format.");
      return;
    }

    fetch("http://" + serverIP + ":5000/cas-signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        firstname: inputValue.firstname,
        lastname: inputValue.lastname,
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      ?.then((response) => response.json())
      .then((data) => {
<<<<<<< HEAD
<<<<<<< HEAD
        if (data[0] === "Authorized") {
          window.location = "http://" + data[1];
        } else if (data[0] === "Invalid") {
          setPopUpInvalid(true);
        }
=======
        //User has signed up
        setIsSuccess(true);
      })
      .catch((error) => { 
        setErrorMessage("Error");
>>>>>>> back end patient
=======
        if (data.status === "Success") {
          setIsSuccess(true);
          setErrorMessage("");
        }
        else if (data.status === "Error") {
          console.log(data.Message);
          setErrorMessage(data.Message);
        }
      })
      .catch((error) => { 
        console.log(error);
        setErrorMessage(error.message);
>>>>>>> patient home page and sign up page
      });
  };

  //DOM
  return (
    <div>
      <Flex
        height="50vh"
        alignItems="baseline"
        justifyContent="left"
        background={isUnauthorizedAccess ? "white" : "blue.500"}
      >
        {isUnauthorizedAccess && (
          <Wrap justify="center" mt={10}>
<<<<<<< HEAD
            <Text fontSize="xxx-large" mt={3}>
              <b>401 Forbidden: Unauhorized Access.</b>
            </Text>
          </Wrap>
        )}
        {!isUnauthorizedAccess && (
=======
            <Text fontSize="x-large" mt={3} color="white" data-testid="successMessage-text">
              <b>Success! Your account has been created.</b>
            </Text>
          </Wrap>
        )}
        {errorMessage && (
          <Wrap justify="center" mt={10}>
            <Text fontSize="x-large" mt={3} color="white" data-testid="errorMessage-text">
              <b>{errorMessage}</b>
            </Text>
          </Wrap>
        )}
        {!isSuccess && (
>>>>>>> patient home page and sign up page
          <Stack direction="row" mt={50}>
            <Flex
              width="100vh"
              ml={100}
              direction="column"
              background="blue.200"
              p={12}
              rounded={6}
            >
              <Stack direction="row" justify="left">
                <Heading mb={3}>Sign up</Heading>
              </Stack>
              <Stack direction="column" justify="center"></Stack>
              <Wrap spacing="20px" mt={3}>
                <Input
<<<<<<< HEAD
                  name="First Name"
                  data-testid="First Name"
=======
                  name="firstName"
                  data-testid="firstName"
>>>>>>> back end patient
                  placeholder="First Name"
                  value={inputValue.firstname}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>
                <Input
<<<<<<< HEAD
                  name="Last Name"
                  data-testid="Last Name"
=======
                  name="lastName"
                  data-testid="lastName"
>>>>>>> back end patient
                  placeholder="Last Name"
                  value={inputValue.lastname}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>
                <Input
                  name="Email"
                  data-testid="Email"
                  placeholder="Email"
                  value={inputValue.email}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>
                <Input
                  name="Password"
                  data-testid="Password"
                  placeholder="Password"
                  value={inputValue.password}
                  variant="outline"
                  type="password"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>
              </Wrap>
            </Flex>
            <Flex
              width="auto"
              height="fit-content"
              ml={10}
              direction="column"
              background="blue.200"
              p={12}
              rounded={6}
            >
              <Stack direction="column" spacing={3}>
                <Wrap spacing="20px" mt={6}>
                  <Button
                    data-testid="submitButton"
                    colorScheme="blue"
                    onClick={() => {
                      handleSignUp();
                    }}
                  >
                    Submit
                  </Button>
                </Wrap>
                <Link href="/SignUp" color="blue" mt={6}>
                </Link>
                <Text fontSize = "s" > Already have an account? <a href="/login"><u>Log in</u></a> 
                </Text>
<<<<<<< HEAD
                <Text fontSize = "s" > Forgot username or password? <a href="/login"><u>Reset username/password</u></a> 
=======

                <Text fontSize = "s" >
                  Forgot your password? <Link to= '/cas-forgot-pw' data-testid = "forgotlink" style={{textDecoration:'underline'}}>
                  Reset Password </Link>
>>>>>>> back end patient
                </Text>
                {isPopUpInvalid && (
                  <Text data-testid="invalidInput" color="red">
                    *Invalid Credential*
                  </Text>
                )}
                <Wrap justify="center">
                  <Text fontSize="xs" mt={isPopUpInvalid ? 3 : 6}>
                    Healthcare System
                  </Text>
                </Wrap>
              </Stack>
            </Flex>
          </Stack>
        )}
      </Flex>
      {!isUnauthorizedAccess && (
        <Flex height="50vh" justifyContent="center" background="blue.500">
          <Wrap justify="center" mt={10}>
            <Text fontSize="x-large" mt={6}>
            </Text>
          </Wrap>
        </Flex>
      )}
    </div>
  );
}
  
