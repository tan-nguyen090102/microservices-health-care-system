import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Flex, Stack, Button, Icon, Wrap, Text } from "@chakra-ui/react";
//import { MdOutlineOtherHouses } from "react-icons/md";
// import { BiCalendar } from "react-icons/bi";
// import { TbMessages } from "react-icons/tb";
// import { GiMedicines } from "react-icons/gi";
// import { GrTest } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";

function PatientDashboard() {
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

  const IP = window.location.hostname;
  const [isServiceDown, setServiceDown] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  const navigate = useNavigate();
  const handleNavigate = async (path, target) => {
    if (path !== "/schedule") {
      navigate(path, { state: { target: target } });
    } else {
      const result = await fetch("http://" + IP + ":3010/scheduler", {
        method: "HEAD",
      }).catch((error) => {
        setServiceDown(true);
        setErrorMessage(error.toString());
        alert(error);
      });

      if (result?.ok === true) {
        window.location = "http://" + IP + ":3010/scheduler";
      }
    }
  };

  return (
    <div>
      {!isUnauthorizedAccess && (
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
            color="black"
          >
            <Stack direction="row" spacing={6}>
              <Link to="/patient-home">
                <Icon
                  as={MdOutlineOtherHouses}
                  color="blue.400"
                  boxSize={4}
                  ml={4}
                />
                Home
              </Link>
              <Link onClick={() => handleNavigate("/schedule", "schedule")}>
              <Icon as={AiOutlineSchedule} 
                color="blue.400" 
                boxSize={4} ml={4}/> 
                Scheduler 
            </Link>
            <Link to="/appointments"> 
                <Icon as={BiCalendar} color="blue.400" boxSize={4} ml={4} />
                Appointments
              </Link>
              <Link to="/messages">
                <Icon as={TbMessages} color="blue.400" boxSize={4} ml={4} />
                Messages
              </Link>
              <Link to="/test-results">
                <Icon as={GrTest} color="blue.400" boxSize={4} ml={4} />
                Test Results
              </Link>
              <Link to="/medications">
                <Icon as={GiMedicines} color="blue.400" boxSize={4} ml={4} />
                Medications
              </Link>
            </Stack>
          </Flex>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
