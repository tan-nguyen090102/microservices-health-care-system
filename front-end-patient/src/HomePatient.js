import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Flex, 
  Stack, 
  Heading, 
  Text, 
  Wrap,
  Spacer,
  Box
} from "@chakra-ui/react";

export default function HomePanel() {
  const loginIP = window.location.hostname;
  const location = useLocation();

  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  useEffect(() => {
    fetch("http://" + loginIP + ":5000/cas-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        user: "",
        url: window.location.host + location.pathname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[0] === "False") {
          window.location = "http://" + loginIP + ":3000/cas-login";
        } else {
          console.log(data);
          if (data[3] === "P") {
            setUnauthorizedAccess(false);
            console.log("Welcome " + data[1]);
          } else {
            setUnauthorizedAccess(true);
          }
        }
      });
  }, [location, loginIP]);

  //Handle login
  const handleLogout = () => {
    fetch("http://" + loginIP + ":5000/cas-logout", {
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
        console.log(data);
        if (data === "Done") {
          window.location = window.location.origin + location.pathname;
        }
      });
  };

  return (
    <div>
      <Flex
        height="100vh"
        alignItems="baseline"
        justifyContent="left"
        background={isUnauthorizedAccess ? "white" : "blue.400"}
      >
        {isUnauthorizedAccess && (
          <Wrap justify="center" mt={10}>
            <Text fontSize="xxx-large" mt={3}>
              <b>401 Forbidden: Unauthorized Access.</b>
            </Text>
          </Wrap>
        )}
        {!isUnauthorizedAccess && (
          <Stack direction="column" mt={50}>
            <Flex
              width="100%"
              ml={100}
              direction="column"
              background="blue.200"
              p={12}
              rounded={6}
            >
              <Stack direction="row" justify="left">
                <Heading mb={3}>Welcome!</Heading>
              </Stack>
              
              <Box mt={4}> 
                <Flex
                  width="50vh"
                  ml={100}
                  direction="column"
                  background="blue.100"
                  p={12}
                  rounded={6}
                >
                  <Stack direction="row" justify="left">
                    <Heading size='md'>Upcoming Visits</Heading>
                  </Stack>

                  <Stack direction="column" justify="center">
                    <Wrap spacing="20px" mt={3}>
                      <Text fontSize="sm">Dates</Text>
                    </Wrap>
                  </Stack>

                </Flex>
              </Box>
              
              <Spacer />
  
              <Box mt={4}> 
                <Flex
                  width="50vh"
                  ml={100}
                  direction="column"
                  background="blue.100"
                  p={12}
                  rounded={6}
                >
                  <Stack direction="row" justify="left">
                    <Heading size='md'>Account Balance</Heading>
                  </Stack>

                  <Stack direction="column" justify="center">
                    <Wrap spacing="20px" mt={3}>
                      <Text fontSize="sm">Amount Due</Text>
                    </Wrap>
                  </Stack>
                
                </Flex>
              </Box>
  
            </Flex>
          </Stack>
        )}
      </Flex>
    </div>
  )};
