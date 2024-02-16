import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Flex, Text, Wrap } from "@chakra-ui/react";

export default function HomePanel() {
  const location = useLocation();

  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/cas-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        user: "",
        url: window.location.origin + location.pathname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[0] === "False") {
          window.location = "http://localhost:3000/cas-login";
        } else {
          console.log(data);
          if (data[3] === "A") {
            setUnauthorizedAccess(false);
            console.log("Welcome " + data[1]);
          } else {
            setUnauthorizedAccess(true);
          }
        }
      });
  }, [location]);

  //Handle login
  const handleLogout = () => {
    fetch("http://localhost:5000/cas-logout", {
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
        <Button
          data-testid="logoutButton"
          colorScheme="blue"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Button>
      </Flex>
    </div>
  );
}
