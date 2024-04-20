import React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Stack,
  Heading,
  Wrap,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";

function SignUpPanel() {
  const serverIP = window.location.hostname;
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }

  const [inputValue, setInputValue] = React.useState(initialValue);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = (email) => {
    return emailRegex.test(email);
  }

  const handleSignUp = () => {
    if (!inputValue.firstName || !inputValue.lastName || !inputValue.email || !inputValue.password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if ((inputValue.password.length) < 8) {
      setErrorMessage(
        "Password must be at least 8 characters long."
      );
      return;
    }

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
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      ?.then((response) => response.json())
      .then((data) => {
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
      });
  };
  
  //DOM
  return (
    <div>
      <Flex
        height="100vh"
        alignItems="baseline"
        justifyContent="left"
        background= "blue.500"
      >
        {isSuccess && (
          <Wrap justify="center" mt={10}>
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
                  name="firstName"
                  data-testid="firstName"
                  placeholder="First Name"
                  value={inputValue.firstName}
                  variant="outline"
                  onChange={handleInput}
                  required
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="lastName"
                  data-testid="lastName"
                  placeholder="Last Name"
                  value={inputValue.lastName}
                  variant="outline"
                  onChange={handleInput}
                  required
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="email"
                  data-testid="email"
                  placeholder="Email"
                  value={inputValue.email}
                  variant="outline"
                  onChange={handleInput}
                  required
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="password"
                  data-testid="password"
                  placeholder="Password"
                  value={inputValue.password}
                  variant="outline"
                  type="password"
                  onChange={handleInput}
                  required
                  mb={3}
                  background="white"
                ></Input>


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
              <Stack direction="column" spacing={1}>

                <Text fontSize = "s" >
                  Already have an account? <Link to= '/cas-login' data-testid = "loginlink" style={{textDecoration:'underline'}}>
                  Log in </Link>
                </Text>

                <Text fontSize = "s" >
                  Forgot your password? <Link to= '/cas-forgot-pw' data-testid = "forgotlink" style={{textDecoration:'underline'}}>
                  Reset Password </Link>
                </Text>
              
                <Wrap justify="center">
                  <Text fontSize="xs" mt={ 3 }>
                    Healthcare System
                  </Text>
                </Wrap>
              </Stack>
            </Flex>
          </Stack>
        )}
        </Flex>
    </div>
  );
}
export default SignUpPanel;
  
