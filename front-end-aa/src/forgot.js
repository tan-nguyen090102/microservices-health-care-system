import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './App.css';
import {
  Flex,
  Stack,
  Heading,
  Wrap,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";

function Forgot() {
  //State variables
  const [isValid, setIsValid] = React.useState(false);
  const serverIP = window.location.hostname;
  const [userID, setUserID] = React.useState("");
  const [errorMessage,setErrorMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  //Functions
  const handleInput = (e) => {
    const value  = e.target.value;
    setUserID (value)
    setIsValid(validateEmail(value))
  };
  const validateEmail = (email)=> {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const handleForgotpw = () => {
    fetch("http://" + serverIP + ":5000/cas-forgot-pw", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        userID: userID
       
      }),
    })
      ?.then((response) => response.json())
      .then((data) => {
        //TODO HANDLE FORGOT PASSWORD 
        setIsSuccess(true)       
      })
      .catch((err) => {
        setErrorMessage(err.message)
      });
  };
  return (
    <div>
      <Flex
        height="50vh"
        alignItems="baseline"
        justifyContent="left"
        background= "white" 
      >
      

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
                <Heading mb={3}>Forgot Password</Heading>
              </Stack>
              <Stack direction="column" justify="center"></Stack>
              {isSuccess && (
                <Wrap justify="center" mt={10}>
                  <Text fontSize="x-large" mt={3} color="green" data-testid="successMessage-text">
                    <b>Success! Please check your email to change your password.</b>
                  </Text>
                </Wrap>
              )}
              {errorMessage && (
                <Wrap justify="center" mt={10}>
                  <Text fontSize="x-large" mt={3} color="red" data-testid="errorMessage-text">
                    <b>Failure: {errorMessage}</b>
                  </Text>
                </Wrap>
              )}
              {!isSuccess && (

              <>
              <Wrap spacing="20px" mt={3}>
                <Input
                  name="userID"
                  data-testid="userID-input"
                  placeholder="Email"
                  value={userID}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>
                
              </Wrap>
              <Stack direction="column" spacing={3}>
                <Wrap spacing="20px" mt={6}>
                  <Button 
                    isDisabled={!isValid}
                    data-testid="forgotpasswordButton"
                    colorScheme="blue"
                    onClick={() => {
                      handleForgotpw();
                    }}
                  >
                    Submit
                  </Button>
                 
                </Wrap>
               
              </Stack>
              </>
              )}

              <Stack>
              <Wrap justify="center">
                  <Text fontSize="xs" mt={ 3 }>
                    Healthcare System
                  </Text>
                </Wrap>
              </Stack>
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
                  <Link href="/login" color="blue" mt={6}>
                    Go to Login
                  </Link>
                </Wrap>
                <Wrap>
                  <Link href="/login" color="blue" mt={6}>
                    Sign Up Now
                  </Link>
                </Wrap>
                
               
                <Wrap justify="center">
                  <Text fontSize="xs" mt={ 3 }>
                    Healthcare System
                  </Text>
                </Wrap>
              </Stack>
            </Flex>
          </Stack>
       
      </Flex>
      
    </div>
  );
}


export default Forgot;
