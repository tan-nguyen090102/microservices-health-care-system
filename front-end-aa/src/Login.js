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

export default function LoginPanel() {
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
                variant="outline"
                mb={3}
                background="white"
              ></Input>
              <Input
                name="password"
                data-testid="password"
                placeholder="Password"
                variant="outline"
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
                  onClick={() => {}}
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
