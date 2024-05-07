import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Button,
  Flex,
  Text,
  Wrap,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export default function InterfacePanel() {
  const IP = window.location.hostname;
  const location = useLocation();

  const initialValues = {
    patientID: "",
  };

  useEffect(() => {
    document.title = "Healthcare System FHIR Search";
    setUserValid(true);
  }, []);

  //Input listeners
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [isPopUpInvalid, setPopUpInvalid] = React.useState(false);
  const [isUserValid, setUserValid] = React.useState(false);

  const [isServiceDown, setServiceDown] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setPopUpInvalid(false);
  };

  //Add button listener
  const handleSearch = async () => {
    let isFilled = false;

    //Check if all the field is filled
    if (inputValue.patientID) {
      isFilled = true;
    }

    if (isFilled) {
      //Fetch the backend to send the data
      setPopUpInvalid(false);
      await fetch("http://" + IP + ":5000/search_fhir", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        body: JSON.stringify({
          patientID: inputValue.patientID.toUpperCase(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data !== "False") {
            handleDownloadJSON(data);
            setUserValid(true);
          } else {
            setUserValid(false);
          }
        })
        .catch((error) => {
          setServiceDown(true);
          setErrorMessage(error.toString());
          alert(error);
        });
    } else {
      setPopUpInvalid(true);
    }
  };

  const handleDownloadJSON = (data) => {
    const dataString =
      "data:application/json;charset=utf-8, " +
      encodeURIComponent(JSON.stringify(data));
    const download = document.createElement("a");
    download.setAttribute("href", dataString);
    download.setAttribute("download", data[0]["userID"] + ".json");
    document.body.appendChild(download);
    download.click();
    download.remove();
  };

  return (
    <div>
      <Flex
        height="100vh"
        alignItems="baseline"
        justifyContent="center"
        background={"white"}
      >
        <Flex
          width="auto"
          mt={50}
          p={5}
          direction="column"
          background="white"
          rounded={6}
        >
          <Stack direction="column">
            {isPopUpInvalid && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *Please fill out all required fields*
              </Text>
            )}
            <FormControl>
              <FormLabel fontSize="large">
                Search and Download with Patient ID:
              </FormLabel>
              <Input
                name="patientID"
                data-testid="patientID"
                onChange={handleInput}
                value={inputValue.patientID}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>
            <Button
              data-testid="addAddButton"
              colorScheme="green"
              onClick={handleSearch}
            >
              Download
            </Button>
            {!isUserValid && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *Patient is not found*
              </Text>
            )}
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
}
