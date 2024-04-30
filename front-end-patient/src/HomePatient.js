import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Flex, 
  Stack, 
  Heading, 
  Text, 
  Wrap,
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
            const userID = data[1];
            Promise.all([
              fetchPatientVisits(userID),
              fetchPatientInfo(userID),
              console.log("Welcome " + data[1])
            ])
            .then(([visitsData, infoData]) => {
              console.log("Patient Visits:", visitsData);
              console.log("Patient Info:", infoData);
              console.log("Welcome " + data[1]);
            })
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


  const [patientInfo, setPatientInfo] = useState(null);
  const fetchPatientInfo = (userID) => {
    console.log(userID)
    fetch(`http://${loginIP}:5000/patient-info-survey/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPatientInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching patient information:", error);
      });
  };


  const [patientVisits, setPatientVisits] = useState(null);
  const fetchPatientVisits = (userID) => {
    console.log(userID)
    fetch(`http://${loginIP}:5000/scheduler/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPatientVisits(data);
      })
      .catch((error) => {
        console.error("Error fetching patient visits:", error);
      });
  };


  return (
    <div>
      <Flex
        height="100vh"
        alignItems="baseline"
        justifyContent="left"
        background={isUnauthorizedAccess ? "white" : "blue.400"}
        overflow= "auto"
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
              
              <Flex direction="row">
                <Box mt={4} flex={1}> 
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

                    {patientVisits && patientVisits.map((patient, index) => (
                    <Flex 
                      key={index} 
                      direction="column" 
                      background="blue.100" 
                      p={4} 
                      rounded={6} 
                      mt={4}>

                      <Text><b>Start Time:</b> {patient.start_time}</Text>
                      <Text><b>End Time:</b> {patient.end_time}</Text>
                      <Text><b>Appointment Details:</b> {patient.context}</Text>

                    </Flex>
                  ))}
                  </Flex>
                </Box>
              </Flex>

              <Box mt={4} ml={95}> 
                <Flex
                  direction="column"
                  background="blue.100"
                  p={12}
                  rounded={6}
                >
                  <Stack direction="row" justify="left">
                    <Heading size='md'> Patient Information</Heading>
                  </Stack>

                  {patientInfo && patientInfo.map((patient, index) => (
                    <Flex 
                      key={index} 
                      direction="column" 
                      background="blue.100" 
                      p={4} 
                      rounded={6} 
                      mt={4}>

                      <Heading size="md">{patient.fullName}</Heading>
                      <Text><b>Age:</b> {patient.age}</Text>
                      <Text><b>Date of Birth:</b> {patient.dob}</Text>
                      <Text><b>Phone:</b> {patient.phone}</Text>
                      <Text><b>Address:</b> {patient.address}</Text>
                      <Text><b>Gender:</b> {patient.gender}</Text>
                      <Text><b>Medications:</b> {patient.medications}</Text>
                      <Text><b>Family History:</b> {patient.familyHistory}</Text>
                      <Text><b>Patient History:</b> {patient.patientHistory}</Text>

                    </Flex>
                  ))}
              </Flex>
            </Box>
          </Flex>
        </Stack>
      )}
    </Flex>
  </div>
)};
