<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect } from "react";
>>>>>>> front end for signup
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

<<<<<<< HEAD
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
=======
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

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  //Input listeners
  const [inputValue, setInputValue] = React.useState(initialValues);
>>>>>>> front end for signup
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
<<<<<<< HEAD
    })
  }

  const passwordRegex = [];
  const isValidPassword = (password) => {
    return passwordRegex.test(password);
  };

  const emailRegex = [];
  const isValidEmail = (email) => {
    return emailRegex.test(email);
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
=======
    });

    setPopUpInvalid(false);
  };

  //Handle login
  const [isPopUpInvalid, setPopUpInvalid] = React.useState(false);
  const handleSignUp = () => {
    fetch("http://" + serverIP + ":3000/cas-signup", {
>>>>>>> front end for signup
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
<<<<<<< HEAD
      body: JSON.stringify({
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
=======
      credentials: "include",
      body: JSON.stringify({
        firstname: inputValue.firstname,
        lastname: inputValue.lastname,
>>>>>>> front end for signup
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      ?.then((response) => response.json())
      .then((data) => {
<<<<<<< HEAD
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
  
=======
        if (data[0] === "Authorized") {
          window.location = "http://" + data[1];
        } else if (data[0] === "Invalid") {
          setPopUpInvalid(true);
        }
      });
  };

>>>>>>> front end for signup
  //DOM
  return (
    <div>
      <Flex
<<<<<<< HEAD
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
=======
        height="50vh"
        alignItems="baseline"
        justifyContent="left"
        background={isUnauthorizedAccess ? "white" : "blue.500"}
      >
        {isUnauthorizedAccess && (
          <Wrap justify="center" mt={10}>
            <Text fontSize="xxx-large" mt={3}>
              <b>401 Forbidden: Unauhorized Access.</b>
            </Text>
          </Wrap>
        )}
        {!isUnauthorizedAccess && (
>>>>>>> front end for signup
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
=======
                  name="First Name"
                  data-testid="First Name"
                  placeholder="First Name"
                  value={inputValue.firstname}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>
                <Input
                  name="Last Name"
                  data-testid="Last Name"
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
>>>>>>> front end for signup
                  placeholder="Email"
                  value={inputValue.email}
                  variant="outline"
                  onChange={handleInput}
<<<<<<< HEAD
                  required
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="password"
                  data-testid="password"
=======
                  mb={3}
                  background="white"
                ></Input>
                <Input
                  name="Password"
                  data-testid="Password"
>>>>>>> front end for signup
                  placeholder="Password"
                  value={inputValue.password}
                  variant="outline"
                  type="password"
                  onChange={handleInput}
<<<<<<< HEAD
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

=======
                  mb={3}
                  background="white"
                ></Input>
              </Wrap>
            </Flex>
>>>>>>> front end for signup
            <Flex
              width="auto"
              height="fit-content"
              ml={10}
              direction="column"
              background="blue.200"
              p={12}
              rounded={6}
            >
<<<<<<< HEAD
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
=======
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
                <Text fontSize = "s" > Forgot username or password? <a href="/login"><u>Reset username/password</u></a> 
                </Text>
                {isPopUpInvalid && (
                  <Text data-testid="invalidInput" color="red">
                    *Invalid Credential*
                  </Text>
                )}
                <Wrap justify="center">
                  <Text fontSize="xs" mt={isPopUpInvalid ? 3 : 6}>
>>>>>>> front end for signup
                    Healthcare System
                  </Text>
                </Wrap>
              </Stack>
            </Flex>
          </Stack>
        )}
<<<<<<< HEAD
        </Flex>
    </div>
  );
}
export default SignUpPanel;
  
=======
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
  
>>>>>>> front end for signup
