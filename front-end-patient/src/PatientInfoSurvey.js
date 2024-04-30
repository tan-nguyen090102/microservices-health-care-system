import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Flex,
  Stack,
  Heading,
  Wrap,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";

function PatientInfoSurvey() {
  const loginIP = window.location.hostname;
  const location = useLocation();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

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
  
  const initialValue = {
    fullName: "",
    email: "",
    age: "",
    dob: "",
    phone: "",
    address: "",
    gender: "",
    medications: "",
    familyHistory: "",
    patientHistory: ""
  };

  const [inputValue, setInputValue] = React.useState(initialValue);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = (email) => {
    return emailRegex.test(email);
  }

  const handleSubmit = () => {
    if (!inputValue.fullName || !inputValue.email || !inputValue.age || !inputValue.dob || !inputValue.phone
       || !inputValue.address || !inputValue.gender || !inputValue.medications || !inputValue.familyHistory || !inputValue.patientHistory) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(inputValue.email)){
      setErrorMessage("Please enter email in the correct format.");
      return;
    }

    fetch("http://" + loginIP + ":5000/patient-info-survey", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify({
        fullName: inputValue.fullName,
        email: inputValue.email,
        age: inputValue.age,
        dob: inputValue.dob,
        phone: inputValue.phone,
        address: inputValue.address,
        gender: inputValue.gender,
        medications: inputValue.medications,
        familyHistory: inputValue.familyHistory,
        patientHistory: inputValue.patientHistory
      }),
    })
      ?.then((response) => response.json())
      .then((data) => {
        if (data.status === "Success") {
          setIsSuccess(true);
          setErrorMessage("");
        }
        else if (data.status === "Error") {
          console.log(data.Message);
          setErrorMessage(data.Message);
        }
      })
      .catch((error) => { 
        console.log(error);
        setErrorMessage(error.message);
      });
  };


  return (
    <div>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="baseline"
        justifyContent="left"
        background= {isUnauthorizedAccess ? "white" : "blue.400"}
        overflow= "auto"
      >
        {isSuccess && (
          <Wrap justify="center" mt={10}>
            <Text fontSize="x-large" mt={3} color="white" data-testid="successMessage-text">
              <b>Success! Questionnaire has been submitted.</b>
            </Text>
          </Wrap>
        )}
        {errorMessage && (
          <Wrap justify="center" mt={10}>
            <Text fontSize="x-large" mt={3} color="white" data-testid="errorMessage-text">
              <b>{errorMessage}</b>
            </Text>
          </Wrap>
        )}
        {isUnauthorizedAccess && (
          <Wrap>
            <Text fontSize="xxx-large" mt={3}>
              <b> 401 Forbidden: Unauthorized Access.</b>
            </Text>
          </Wrap>
        )}
        {!isSuccess && !isUnauthorizedAccess && (
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
                <Heading mb={3}>Patient Information Questionnaire</Heading>
              </Stack>
              <Stack direction="column" justify="center"></Stack>
              <Wrap spacing="20px" mt={3}>
                <Input
                  name="fullName"
                  data-testid="fullName"
                  placeholder="Full Name"
                  value={inputValue.fullName}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="email"
                  data-testid="email"
                  placeholder="Email"
                  value={inputValue.email}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="age"
                  data-testid="age"
                  placeholder="Age"
                  value={inputValue.age}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="dob"
                  data-testid="dob"
                  placeholder="Date of Birth"
                  value={inputValue.dob}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="phone"
                  data-testid="phone"
                  placeholder="Phone Number"
                  value={inputValue.phone}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="address"
                  data-testid="address"
                  placeholder="Address"
                  value={inputValue.address}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="gender"
                  data-testid="gender"
                  placeholder="Gender"
                  value={inputValue.gender}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="medications"
                  data-testid="medications"
                  placeholder="What medications are you taking?"
                  value={inputValue.medications}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input> 

                <Input
                  name="familyHistory"
                  data-testid="familyHistory"
                  placeholder="Family History"
                  value={inputValue.familyHistory}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>

                <Input
                  name="patientHistory"
                  data-testid="patientHistory"
                  placeholder="Patient History"
                  value={inputValue.patientHistory}
                  variant="outline"
                  onChange={handleInput}
                  mb={3}
                  background="white"
                ></Input>
                <Wrap spacing="20px" mt={6}>
                  <Button
                    name="submitButton"
                    data-testid="submitButton"
                    colorScheme="blue"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Submit
                  </Button>
                </Wrap>
              </Wrap>
            </Flex>
          </Stack>
        )}
      </Flex>
    </div>
  );
}
export default PatientInfoSurvey;
