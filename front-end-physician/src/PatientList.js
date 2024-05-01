import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import HandleChooseLink from "./LinkToReturn";
import {
  Button,
  Flex,
  Text,
  Wrap,
  Stack,
  Heading,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

export default function PatientPanel() {
  const IP = window.location.hostname;
  const location = useLocation();

  const initialValues = {
    content: "",
    patientName: "",
  };

  const alertBox = useDisclosure();
  const modalBox = useDisclosure();
  const addToast = useToast();
  const cancelRef = React.useRef(null);

  const [isPatientPresent, setPatientPresent] = React.useState(false);
  const [listOfPatientSFX, setListOfPatientSFX] = React.useState([]);
  const [listOfNoti, setListOfPatient] = React.useState([]);

  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  const [isServiceDown, setServiceDown] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const [linkToReturn, setLinkToReturn] = React.useState("");

  const [physicianID, setPhysicianID] = React.useState("");
  const [itemID, setCurrentItem] = React.useState("");
  const [inputValue, setInputValue] = React.useState(initialValues);
  const [isPopUpInvalid, setPopUpInvalid] = React.useState(false);
  const [isUserInvalid, setUserInvalid] = React.useState(false);

  useEffect(() => {
    document.title = "Healthcare System Physician";

    fetch("http://" + IP + ":5000/cas-login", {
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
      .then(async (data) => {
        if (data[0] === "False") {
          const result = await fetch("http://" + IP + ":3000/cas-login", {
            method: "HEAD",
          });
          if (result.ok === true) {
            window.location = "http://" + IP + ":3000/cas-login";
          }
        } else {
          if (data[3] === "H") {
            console.log(data);
            setPhysicianID(data[1]);
            setUnauthorizedAccess(false);
            fetch("http://" + IP + ":5000/physician-patient", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "content-type": "application/json; charset=UTF-8",
              },
              mode: "cors",
              credentials: "include",
              body: JSON.stringify({
                userID: data[1],
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data !== "False") {
                  setListOfPatient(data);
                  setListOfPatientSFX(CreateListOfPatient(data));
                  setPatientPresent(true);
                } else {
                  setListOfPatientSFX([]);
                  setListOfPatient([]);
                  setPatientPresent(false);
                }
              });
          } else {
            setLinkToReturn(HandleChooseLink(data[3]));
            const result = await fetch(HandleChooseLink(data[3]), {
              method: "HEAD",
            })
              .then(() => {
                setErrorMessage("");
              })
              .catch(() => {
                setErrorMessage(
                  "Your intended service is not available at the moment."
                );
              });
            setUnauthorizedAccess(true);
            setListOfPatientSFX([]);
            setListOfPatient([]);
            setPatientPresent(false);
          }
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setErrorMessage(error.toString());
      });
  }, [location, IP]);

  //Handle delete patient from this physician
  const handleDeletePatient = (phpaID) => {
    //Fetch to backend
    console.log(phpaID);
    fetch("http://" + IP + ":5000/physician-patient", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        phpaID: phpaID,
        userID: physicianID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== "False") {
          setListOfPatient(data);
          setListOfPatientSFX(CreateListOfPatient(data));
          CreateAlertBox(alertBox);
        } else {
          setListOfPatientSFX([]);
          setListOfPatient([]);
          setPatientPresent(false);
          CreateAlertBox(alertBox);
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setErrorMessage(error.toString());
      });
  };

  //Handle login
  const handleLogout = () => {
    fetch("http://" + IP + ":5000/cas-logout", {
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
        if (data === "Done") {
          window.location = window.location.origin + location.pathname;
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setErrorMessage(error.toString());
      });
  };

  const handleRefreshList = () => {
    fetch("http://" + IP + ":5000/physician-patient", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        userID: physicianID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== "False") {
          setListOfPatient(data);
          setListOfPatientSFX(CreateListOfPatient(data));
          setPatientPresent(true);
        } else {
          setListOfPatientSFX([]);
          setListOfPatient([]);
          setPatientPresent(false);
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setErrorMessage(error.toString());
      });
  };

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

  //Pointer to current Accordion item
  const handlePointer = (item) => {
    setCurrentItem(item);
  };

  function CreateListOfPatient(list = []) {
    var patientList = [];
    patientList = list.map((item, index) => {
      return (
        <AccordionItem mb={3} key={index}>
          <h2>
            <AccordionButton
              backgroundColor="teal.400"
              border="2px"
              onClick={() => {
                handlePointer(item[0]);
              }}
            >
              <Box as="span" flex="1" textAlign="left">
                Service ID #{item[0]}
              </Box>
              <AccordionIcon></AccordionIcon>
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            width="100%"
            backgroundColor="white"
            border="1px"
          >
            <Stack direction="row" justifyContent="flex-end">
              <List marginRight="auto">
                <ListItem>Patient ID: {item[1]}</ListItem>
                <ListItem>Name: {item[2]}</ListItem>
                <ListItem>Age: {item[3]}</ListItem>
                <ListItem>Date of Birth: {item[4]}</ListItem>
                <ListItem>Gender: {item[6]}</ListItem>
                <ListItem>Phone #: {item[5]}</ListItem>
                <ListItem>Primary care: {item[7]}</ListItem>
                <ListItem>Medication: {item[8]}</ListItem>
                <ListItem>Family History: {item[9]}</ListItem>
                <ListItem>Medication History: {item[10]}</ListItem>
              </List>
              <Button
                data-testid="deleteButton"
                bg="red.400"
                onClick={() => {
                  //alertBox.onOpen();
                  handleDeletePatient(item[0]);
                }}
              >
                Delete
              </Button>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      );
    });
    return patientList;
  }

  function CreateInsertModalBox(modalBox) {
    //Input listeners
    const handleInput = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });

      setPopUpInvalid(false);
      setUserInvalid(false);
    };

    //Add button listener
    const handleAdd = async () => {
      let isFilled = false;

      //Check if all the field is filled
      if (inputValue.patientName && inputValue.content) {
        isFilled = true;
      }

      if (isFilled) {
        //Fetch the backend to send the data
        setPopUpInvalid(false);

        await fetch("http://" + IP + ":5000/physician-patient", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json; charset=UTF-8",
          },
          mode: "cors",
          body: JSON.stringify({
            content: inputValue.content,
            patientName: inputValue.patientName,
            requestPatientCode: "P",
            userID: physicianID,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data === "404") {
              setUserInvalid(true);
            } else if (data !== "False") {
              setUserInvalid(false);
              handleRefreshList();

              //Call from the top DOM
              modalBox.onClose();

              //Adding toast
              if (!isServiceDown) {
                addToast({
                  title: "Patient Added!",
                  description: `The patient is on your list.`,
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                addToast({
                  title: "Error!",
                  description: `There is a problem while the system is trying to add the new patient.`,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
            } else {
              setListOfPatientSFX([]);
              setListOfPatient([]);
              setPatientPresent(false);
            }
          })
          .catch((error) => {
            setServiceDown(true);
            setErrorMessage(error.toString());
          });
      } else {
        setPopUpInvalid(true);
      }
    };

    //Box DOM
    return (
      <Modal
        isOpen={modalBox.isOpen}
        onClose={modalBox.onClose}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>Add new patient</ModalHeader>
          <ModalBody>
            {isPopUpInvalid && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *Please fill out all required fields*
              </Text>
            )}
            <FormControl>
              <FormLabel>Patient name:</FormLabel>
              <Input
                name="patientName"
                data-testid="patientName"
                onChange={handleInput}
                value={inputValue.patientName}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>
            {isUserInvalid && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *Patient name not found*
              </Text>
            )}
            <FormControl>
              <FormLabel>Primary Care:</FormLabel>
              <Input
                name="content"
                data-testid="content"
                onChange={handleInput}
                value={inputValue.content}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>

            <ModalFooter>
              <Button
                data-testid="addAddButton"
                colorScheme="teal"
                onClick={handleAdd}
              >
                Add
              </Button>
              <Button
                data-testid="cancelButton"
                colorScheme="teal.200"
                variant="outline"
                onClick={modalBox.onClose}
                ml={3}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  function CreateAlertBox(alertBox) {
    return (
      <AlertDialog
        isOpen={alertBox.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={alertBox.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Patient
            </AlertDialogHeader>
            <AlertDialogBody>
              <b>Are you sure to remove this patient service from your list?</b>
              <List marginRight="auto" mt={3}></List>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeletePatient(itemID);
                  alertBox.onClose();
                }}
              >
                Delete
              </Button>
              <Button onClick={alertBox.onClose} ml={3}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }

  return (
    <div>
      <Flex
        height="100vh"
        alignItems="baseline"
        justifyContent="left"
        background={isUnauthorizedAccess ? "white" : "teal.400"}
      >
        {errorMessage === ""
          ? isUnauthorizedAccess && (
              <Wrap justify="center" mt={10}>
                <Text fontSize="xxx-large" mt={3}>
                  <b>401 Forbidden: Unauthorized Access. </b>
                  {errorMessage}
                  <Link to={linkToReturn} color="blue" mt={6}>
                    Return to your service.
                  </Link>
                </Text>
              </Wrap>
            )
          : isUnauthorizedAccess && (
              <Wrap justify="center" mt={10}>
                <Text fontSize="xxx-large" mt={3}>
                  <b>401 Forbidden: Unauthorized Access. </b>
                  {errorMessage}
                </Text>
              </Wrap>
            )}
        {!isUnauthorizedAccess && (
          <Flex
            height="100vh"
            alignItems="baseline"
            justifyContent="left"
            background={isUnauthorizedAccess ? "white" : "teal.400"}
          >
            <Flex
              width="auto"
              p={5}
              direction="column"
              background="teal.200"
              rounded={6}
            >
              <Stack direction="column" spacing={5}>
                <Button
                  backgroundColor="teal.100"
                  rounded={20}
                  onClick={() => handleNavigate("/physician-home", "", "")}
                >
                  HOME
                </Button>
                <Button
                  backgroundColor="teal.100"
                  rounded={20}
                  onClick={() =>
                    handleNavigate("/physician-patient", "patient")
                  }
                >
                  PATIENT
                </Button>
                <Button
                  backgroundColor="teal.100"
                  rounded={20}
                  onClick={() => handleNavigate("/schedule", "schedule")}
                >
                  SCHEDULE
                </Button>
                <Button
                  backgroundColor="red.300"
                  textColor="white"
                  data-testid="logoutButton"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </Stack>
            </Flex>
            <Flex
              width="100vh"
              ml={100}
              direction="column"
              background="teal.200"
              p={12}
              rounded={6}
            >
              <Stack direction="column" justify="left">
                <Heading mb={3}>List of currently served patient</Heading>
                {!isPatientPresent && (
                  <Text>There is no patient recently.</Text>
                )}
                {isPatientPresent && (
                  <Accordion allowToggle>{listOfPatientSFX}</Accordion>
                )}
                <Button
                  data-testid="addButton"
                  colorScheme="teal"
                  mt={3}
                  onClick={modalBox.onOpen}
                  alignSelf="left"
                >
                  Add Patient
                </Button>
                {CreateInsertModalBox(modalBox)}
              </Stack>
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  );
}
