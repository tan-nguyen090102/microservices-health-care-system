import React, { useEffect } from "react";
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
import HandleChooseLink from "./LinkToReturn";

export default function LoginPanel() {
  const serverIP = window.location.hostname;

  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  const [isServiceDown, setServiceDown] = React.useState(false);
  const [whichService, setWhichServiceDown] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState();
  useEffect(() => {
    document.title = "Healthcare System Authentication";
    //var userID = "daniel.stone@yahoo.com";
    //var password = "12345";
    fetch("http://" + serverIP + ":5000/cas-login", {
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
      .then(async (data) => {
        //User has logged in
        if (data[0] !== "False") {
          setUnauthorizedAccess(false);
          const result = await fetch(data[1], {
            method: "HEAD",
          });
          if (result.ok === true) {
            window.location = data[1];
          }
        } else {
          setUnauthorizedAccess(false);

          //Check if the url is null
          if (data[1] === null) {
            setUnauthorizedAccess(true);
          }
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setWhichServiceDown("Service is not available");
        setErrorMessage(error.toString());
      });
  }, [serverIP]);

  const initialValues = {
    userID: "",
    password: "",
  };

  //Input listeners
  const [inputValue, setInputValue] = React.useState(initialValues);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setPopUpInvalid(false);
  };

  //Handle login
  const [isPopUpInvalid, setPopUpInvalid] = React.useState(false);
  const handleLogin = () => {
    fetch("http://" + serverIP + ":5000/cas-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        userID: inputValue.userID,
        password: inputValue.password,
      }),
    })
      ?.then((response) => response.json())
      .then(async (data) => {
        if (data[0] === "Authorized") {
          const result = await fetch("http://" + data[1], {
            method: "HEAD",
          });
          if (result.ok === true) {
            window.location = "http://" + data[1];
          }
        } else if (data[0] === "Invalid") {
          setPopUpInvalid(true);
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setWhichServiceDown("Server is down at the moment");
        setErrorMessage(error.toString());
      });
  };

  const handleReroute = async (servicePath) => {
    const result = await fetch(servicePath, {
      method: "HEAD",
    }).catch((error) => {
      setServiceDown(true);
      setWhichServiceDown("Server is down at the moment");
      setErrorMessage(error.toString());
    });

    if (result?.ok === true) {
      window.location = servicePath;
    }
  };

  //DOM
  return (
    <div>
      <Flex
        height="50vh"
        alignItems="baseline"
        justifyContent="left"
        background={
          isUnauthorizedAccess || isServiceDown ? "white" : "blue.500"
        }
      >
        {isUnauthorizedAccess && (
          <Wrap justify="center" mt={10}>
            <Text fontSize="xxx-large" mt={3}>
              <b>401 Forbidden: Unauthorized Access.</b>
            </Text>
          </Wrap>
        )}
        {isServiceDown && (
          <Wrap justify="center" mt={10}>
            <Text fontSize="xxx-large" mt={3}>
              <Stack direction="column">
                <b>404 {whichService}.</b>
                <b>Error: {errorMessage}</b>
              </Stack>
            </Text>
          </Wrap>
        )}
        {!isUnauthorizedAccess && !isServiceDown && (
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
                <Heading mb={3}>Login</Heading>
              </Stack>
              <Stack direction="column" justify="center"></Stack>
              <Wrap spacing="20px" mt={3}>
                <Input
                  name="userID"
                  data-testid="userID"
                  placeholder="Email"
                  value={inputValue.userID}
                  variant="outline"
                  onChange={handleInput}
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
                    name="loginButton"
                    data-testid="loginButton"
                    colorScheme="blue"
                    onClick={() => {
                      handleLogin();
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    name="signupButton"
                    data-testid="signupButton"
                    colorScheme="blue"
                    variant="outline"
                  >
                    Sign Up
                  </Button>
                </Wrap>
                <Link to={"/forgotpw"} color="blue" mt={6}>
                  Forgot your Password?
                </Link>
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
          <Stack direction="column">
            <Wrap justify="center" mt={10}>
              <Text fontSize="x-large" mt={6}>
                Log in to other modules
              </Text>
            </Wrap>
            <Stack direction="row">
              <Button
                name="patientButton"
                data-testid="patientButton"
                backgroundColor="blue.200"
                variant="outline"
                onClick={() => {
                  handleReroute(HandleChooseLink("P"));
                }}
              >
                PATIENT
              </Button>
              <Button
                name="physicianButton"
                data-testid="physicianButton"
                backgroundColor="teal.400"
                variant="outline"
                onClick={() => {
                  handleReroute(HandleChooseLink("H"));
                }}
              >
                PHYSICIAN
              </Button>
              <Button
                name="pharmacistButton"
                data-testid="pharmacistButton"
                backgroundColor="red.200"
                variant="outline"
                onClick={() => {
                  handleReroute(HandleChooseLink("C"));
                }}
              >
                PHARMACIST
              </Button>
              <Button
                name="labButton"
                data-testid="labButton"
                backgroundColor="yellow.200"
                variant="outline"
                onClick={() => {
                  handleReroute(HandleChooseLink("L"));
                }}
              >
                LAB
              </Button>
              <Button
                name="billingButton"
                data-testid="billingButton"
                backgroundColor="purple.200"
                variant="outline"
                onClick={() => {
                  handleReroute(HandleChooseLink("B"));
                }}
              >
                BILLING
              </Button>
              <Button
                name="adminButton"
                data-testid="adminButton"
                backgroundColor="green.200"
                variant="outline"
                onClick={() => {
                  handleReroute(HandleChooseLink("A"));
                }}
              >
                ADMIN
              </Button>
            </Stack>
          </Stack>
        </Flex>
      )}
    </div>
  );
}
