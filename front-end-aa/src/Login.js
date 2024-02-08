import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [nexturl, setNextURL] = React.useState("");
  useEffect(() => {
    fetch("http://localhost:5000/cas-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        //User has not log in
        if (data[0] !== "False") {
          window.location = data[1];
        } else {
          setNextURL(data[1]);
        }
      });
  }, []);

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
  };

  //Handle login
  const handleLogin = () => {
    fetch("http://localhost:5000/cas-login", {
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
        nexturl: nexturl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[0] === "Authorized") {
          window.location = data[1];
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
        background="blue.500"
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
                  data-testid="loginButton"
                  colorScheme="blue"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </Button>
                <Button
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
              <Wrap justify="center">
                <Text fontSize="xs" mt={6}>
                  Healthcare System
                </Text>
              </Wrap>
            </Stack>
          </Flex>
        </Stack>
      </Flex>
      <Flex height="50vh" justifyContent="center" background="blue.500">
        <Wrap justify="center" mt={10}>
          <Text fontSize="x-large" mt={6}>
            Once log in, these modules are accessible
          </Text>
        </Wrap>
      </Flex>
    </div>
  );
}
