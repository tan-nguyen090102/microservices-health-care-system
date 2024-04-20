import React from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Flex, 
  Stack, 
  Button,
  Icon,
} from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";
import { GrTest } from "react-icons/gr";

function PatientDashboard() {
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
        Healthcare System
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
        <Link to="/patient-home">
          <Icon as={IoMenuOutline} color="blue.400" boxSize={5} ml={4}/> </Link>
        <Link to="/visits">
          <Icon as={BiCalendar} color="blue.400" boxSize={4} ml={4}/> Visits </Link>
        <Link to="/messages">
          <Icon as={TbMessages} color="blue.400" boxSize={4} ml={4}/> Messages </Link>
        <Link to="/test-results">
          <Icon as={GrTest} color="blue.400" boxSize={4} ml={4}/> Test Results</Link>
        <Link to="/medications">
          <Icon as={GiMedicines} color="blue.400" boxSize={4} ml={4}/> Medications </Link>
      </Stack>
    </Flex>
    </div>
  );
}

export default PatientDashboard;
