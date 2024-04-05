import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './App.css';
import { useNavigate } from "react-router-dom";

import {
  Flex,
  Stack,
  Heading,
  Wrap,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";
import {LOGIN_PATH, SIGN_UP_PATH, CHANGE_PASSWORD_PATH, FORGOT_PASSWORD_ROUTER_PATH} from "./links"


function Forgot() {
  //State variables
  const [isValid, setIsValid] = React.useState(false);
  const serverIP = window.location.hostname;
  const [userID, setUserID] = React.useState("");
  const [errorMessage,setErrorMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  //const [authCode, setAuthCode] = React.useState("");
  const navigate = useNavigate();

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

  
  const handleForgotpwSubmit = async() => {
    setErrorMessage("")
    setIsSuccess(false) 
    const response = await fetch("http://" + serverIP + ":5000"+FORGOT_PASSWORD_ROUTER_PATH, {
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
        debugger
        console.log(data)
        if(data.status === "failure"){
          setErrorMessage(data.errorMessage) 
        }
        else{
          navigateToChangePw(data.resetCode) 
        }

           
        //setAuthCode(data)   
        //navigateToChangePw(data) 
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage("Unable to connect to server. Try again later")
     });
  };
  const navigateToChangePw = (authCode) => {
    navigate(CHANGE_PASSWORD_PATH, {state:{userID:userID,authCode:authCode}});
  }

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
                    <b>Success! Please change your password.</b>
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
                      handleForgotpwSubmit();
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
                  <Link data-testid="login-link" to={LOGIN_PATH} color="blue" mt={6}>
                    Go to Login
                  </Link>
                </Wrap>
                <Wrap>
                  <Link data-testid="sign-up-link" to={SIGN_UP_PATH} color="blue" mt={6}>
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
