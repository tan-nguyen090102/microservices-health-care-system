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

export default function LoginPanel() {
  const serverIP = window.location.hostname;

  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  useEffect(() => {
    document.title = "Healthcare System Authentication";

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
      .then((data) => {
        console.log(data);
        //User has logged in
        if (data[0] !== "False") {
          setUnauthorizedAccess(false);
          window.location = data[1];
        } else {
          setUnauthorizedAccess(false);

          //Check if the url is null
          if (data[1] === null) {
            setUnauthorizedAccess(true);
          }
        }
      })
      .catch((error) => console.log(error));
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
      .then((data) => {
        if (data[0] === "Authorized") {
          window.location = "http://" + data[1];
        } else if (data[0] === "Invalid") {
          setPopUpInvalid(true);
        }
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
            <Text fontSize="xxx-large" mt={3}>
              <b>401 Forbidden: Unauthorized Access.</b>
            </Text>
          </Wrap>
        )}
        {!isUnauthorizedAccess && (
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
                <Link href="/forgot_password" color="blue" mt={6}>
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
          <Wrap justify="center" mt={10}>
            <Text fontSize="x-large" mt={6}>
              Log in to other modules
            </Text>
          </Wrap>
        </Flex>
      )}
    </div>
  );
}
