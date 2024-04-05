import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useLocation, useNavigate} from 'react-router-dom';
import {CHANGE_PASSWORD_ROUTER_PATH, LOGIN_PATH, SIGN_UP_PATH, FORGOT_PASSWORD_PATH} from "./links"
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


function ChangePw() {
  //State variables
  const [isValid, setIsValid] = React.useState(false);
  const serverIP = window.location.hostname;
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [errorMessage,setErrorMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const location = useLocation();
  //const history = useHistory();
  const navigate = useNavigate();
  const [userID, setUserID] = React.useState("");

  //Functions
  useEffect(() => {
    debugger
    if(location.state == null
      || location.state.userID === undefined 
      || location.state.userID === "" 
      || location.state.authCode === undefined 
      || location.state.authCode === ""){
        navigateToForgotPw()
      }
      else{
        setUserID(location.state.userID)
      }
        }, []);

  const handlePasswordInput = (e) => {
    const value  = e.target.value;
    setPassword(value)
    //setIsValid(validatePassword())
  };

  const handlePasswordConfirmInput = (e) => {
    const value  = e.target.value;
    setPasswordConfirm(value)
    //setIsValid(validatePassword())
  };

  const validatePassword = () => {
    return password.length > 8 && password===passwordConfirm
  };

  const handleChangePwSubmit = () => {
    setErrorMessage("")
    setIsSuccess(false) 
    fetch("http://" + serverIP + ":5000" + CHANGE_PASSWORD_ROUTER_PATH, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        userID: location.state.userID, 
        authCode: location.state.authCode,
        password: password,
        passwordConfirm: passwordConfirm,
    
      }),
    })
      ?.then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.status === "failure"){
          setErrorMessage(data.errorMessage) 
        }
        else{
          setIsSuccess(true)  
          window.history.replaceState({},'')
        }
          
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage("Unable to connect to server. Try again later")
      });
  };
  const navigateToForgotPw = () => {
    navigate(FORGOT_PASSWORD_PATH);
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
                <Heading mb={3}>Change Password</Heading>
              </Stack>
              <Stack direction="column" justify="center"></Stack>
              {isSuccess && (
                <Wrap justify="center" mt={10}>
                  <Text fontSize="x-large" mt={3} color="green" data-testid="successMessage-text">
                    <b>Password successfully changed. Please go to login.</b>
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
                  value = {userID}
                  variant="outline"
                  mb={3}
                  background="white"
                  isDisabled={true}
                ></Input>

                <Input
                  name="password"
                  data-testid="password-input"
                  placeholder="New Password"
                  value={password}
                  variant="outline"
                  onChange={handlePasswordInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="passwordConfirm"
                  data-testid="passwordConfirm-input"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  variant="outline"
                  onChange={handlePasswordConfirmInput}
                  mb={3}
                  background="white"
                ></Input>
                
              </Wrap>
              <Stack direction="column" spacing={3}>
                <Wrap spacing="20px" mt={6}>
                  <Button 
                    isDisabled={!validatePassword()}
                    data-testid="changePasswordButton"
                    colorScheme="blue"
                    onClick={() => {
                      handleChangePwSubmit();
                    }}
                  >
                    Change Password
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


export default ChangePw;
