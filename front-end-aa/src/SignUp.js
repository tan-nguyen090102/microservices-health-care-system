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

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const [inputValue, setInputValue] = React.useState(initialValues);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const handleSignUp = () => {
    fetch("http://" + serverIP + ":5000/cas-signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      ?.then((response) => response.json())
      .then((data) => {
        console.log(data);
        //User has signed up
       
          setIsSuccess(true);
      })
      .catch((error) => { 
        setErrorMessage(error.message);
      }, [serverIP]);
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
            <Text fontSize="x-large" mt={3} color="green" data-testid="successMessage-text">
              <b>Success! Your account has been created.</b>
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
                  data-testid="firstname"
>>>>>>> edits
                  placeholder="First Name"
                  value={inputValue.firstName}
                  variant="outline"
                  onChange={handleInput}
                  required
                  mb={3}
                  background="white"
                ></Input>
                <Input
<<<<<<< HEAD
                  name="Last Name"
                  data-testid="Last Name"
=======
                  name="lastName"
                  data-testid="lastname"
>>>>>>> edits
                  placeholder="Last Name"
                  value={inputValue.lastName}
                  variant="outline"
                  onChange={handleInput}
                  required
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
                  required
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
                  required
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
<<<<<<< HEAD
                <Text fontSize = "s" > Already have an account? <a href="/login"><u>Log in</u></a> 
                </Text>
                <Text fontSize = "s" > Forgot username or password? <a href="/login"><u>Reset username/password</u></a> 
=======
                <Text fontSize = "s" > Already have an account? <Link to= '/cas-login' data-testid = "loginlink" style={{textDecoration: 'underline'}}> Log in </Link>
                </Text>
                <Text fontSize = "s" > Forgot your password? <Link to= '/cas-forgot' data-testid = "forgotlink" style={{textDecoration: 'underline'}}> Reset Password </Link>
>>>>>>> edits
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
<<<<<<< HEAD
=======
export default SignUpPanel;
>>>>>>> edits
  
