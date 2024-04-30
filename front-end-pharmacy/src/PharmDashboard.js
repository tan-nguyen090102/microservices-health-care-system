import React from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Flex, 
  Stack, 
  Button,
  Icon,
} from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";

function PharmDashboard() {
    const loginIP = window.location.hostname;
    const location = useLocation();

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
        justify="space-between"
        align="center"
        background="blue.400"
        p={2}
        color="white"
        fontWeight="bold"
      >
        Pharmacy
        <Button color="white" colorScheme="blue.100" onClick={handleLogout}>
        Logout
      </Button>
      </Flex>
    <Flex
      justify="space-between"
      align="center" 
      background="blue.100"
      p={2}
      color="black">

      <Stack direction="row" spacing={6}>
        <Link to="/pharm-home">
          <Icon as={IoMenuOutline} color="blue.400" boxSize={5} ml={4}/> </Link>
        <Link to="/messages">
          <Icon as={TbMessages} color="blue.400" boxSize={4} ml={4}/> Messages </Link>
      </Stack>
    </Flex>
    </div>
  );
}

export default PharmDashboard;
