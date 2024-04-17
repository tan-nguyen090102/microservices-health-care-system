import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import HandleChooseLink from "./LinkToReturn";
import "react-calendar/dist/Calendar.css";
import {
  Button,
  Flex,
  Text,
  Wrap,
  Stack,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  useDisclosure,
  useToast,
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
import Calendar from "react-calendar";

export default function SchedulePanel() {
  const IP = window.location.hostname;
  const location = useLocation();

  const initialValues = {
    content: "",
    recipientName: "",
    startTime: "",
    endTime: "",
  };

  const [userName, setUserName] = React.useState("");
  const [userID, setUserID] = React.useState("");
  const [authorizedCode, setAuthorizedCode] = React.useState("");

  const [isSchedulePresent, setSchedulePresent] = React.useState(false);
  const [listOfScheduleSFX, setListOfScheduleSFX] = React.useState([]);
  const [listOfSchedule, setListOfSchedule] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState();

  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  const [isServiceDown, setServiceDown] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const [linkToReturn, setLinkToReturn] = React.useState("");

  const [inputValue, setInputValue] = React.useState(initialValues);
  const [isPopUpInvalid, setPopUpInvalid] = React.useState(false);
  const [isUserInvalid, setUserInvalid] = React.useState(false);

  //Receive data from other page.
  const { state } = useLocation();
  const { code } = state || { code: "" };

  //Adding box and toast
  const modalBox = useDisclosure();
  const addToast = useToast();

  useEffect(() => {
    document.title = "Healthcare System Scheduler";

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
          if (data[3] === "P" || data[3] === "H" || data[3] === "C") {
            setAuthorizedCode(data[3]);
            fetch("http://" + IP + ":5000/schedule", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "content-type": "application/json; charset=UTF-8",
              },
              mode: "cors",
              credentials: "include",
              body: JSON.stringify({
                userID: data[1],
                date:
                  new Date().toISOString().split("T")[0] +
                  "T" +
                  new Date().toString().split(" ")[4],
                startTime: new Date().toISOString().split("T")[0] + "T00:00:00",
                endTime: new Date().toISOString().split("T")[0] + "T23:59:59",
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data !== "False") {
                  setListOfSchedule(data);
                  setListOfScheduleSFX(CreateListOfSchedule(data));
                  setSchedulePresent(true);
                } else {
                  setListOfScheduleSFX([]);
                  setListOfSchedule([]);
                  setSchedulePresent(false);
                }
              })
              .catch((error) => {
                setServiceDown(true);
                setErrorMessage(error.toString());
              });

            setUnauthorizedAccess(false);
            setUserName(data[4]);
            setUserID(data[1]);
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
            setListOfScheduleSFX([]);
            setListOfSchedule([]);
            setSchedulePresent(false);
          }
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setUnauthorizedAccess(true);
        setErrorMessage(error.toString());
      });
  }, [location, IP]);

  const handleRefreshList = (dateValue) => {
    var startTime = dateValue.toISOString().split("T")[0] + "T00:00:00";
    var endTime = dateValue.toISOString().split("T")[0] + "T23:59:59";

    fetch("http://" + IP + ":5000/schedule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        userID: userID,
        startTime: startTime,
        endTime: endTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== "False") {
          setListOfSchedule(data);
          setListOfScheduleSFX(CreateListOfSchedule(data));
          setSchedulePresent(true);
        } else {
          setListOfScheduleSFX([]);
          setListOfSchedule([]);
          setSchedulePresent(false);
        }
        setServiceDown(false);
      })
      .catch((error) => {
        setServiceDown(true);
        setErrorMessage(error.toString());
      });
  };

  const handleReturnModule = () => {
    var link = HandleChooseLink(authorizedCode);
    window.location = link;
  };

  function CreateListOfSchedule(list = []) {
    var scheduleList = [];
    scheduleList = list.map((item, index) => {
      return (
        <Tbody key={index}>
          <Tr>
            <Td>{item[0]}</Td>
            <Td>{item[2] + " " + item[3]}</Td>
            <Td>{item[4]}</Td>
            <Td>{item[5]}</Td>
            <Td>{item[6]}</Td>
          </Tr>
        </Tbody>
      );
    });
    return scheduleList;
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
      if (
        inputValue.recipientName &&
        inputValue.content &&
        inputValue.startTime &&
        inputValue.endTime
      ) {
        isFilled = true;
      }

      if (isFilled) {
        //Fetch the backend to send the data
        setPopUpInvalid(false);
        var date = selectedDate.toISOString().split("T")[0];

        await fetch("http://" + IP + ":5000/schedule", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json; charset=UTF-8",
          },
          mode: "cors",
          body: JSON.stringify({
            content: inputValue.content,
            hostID: userID,
            recipientName: inputValue.recipientName,
            startTime: date + "T" + inputValue.startTime + ":00",
            endTime: date + "T" + inputValue.endTime + ":00",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data === "404") {
              setUserInvalid(true);
            } else if (data !== "False") {
              setUserInvalid(false);
              handleRefreshList(selectedDate);

              //Call from the top DOM
              modalBox.onClose();

              //Adding toast
              if (!isServiceDown) {
                addToast({
                  title: "Event Added!",
                  description: `The event on ${
                    inputValue.date + " at " + inputValue.time
                  } is scheduled.`,
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                addToast({
                  title: "Error!",
                  description: `There is a problem while the system is trying to add the new event`,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
            } else {
              setListOfScheduleSFX([]);
              setListOfSchedule([]);
              setSchedulePresent(false);
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
          <ModalHeader>Add new event</ModalHeader>
          <ModalBody>
            {isPopUpInvalid && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *Please fill out all required fields*
              </Text>
            )}
            <FormControl>
              <FormLabel>Recipient name:</FormLabel>
              <Input
                name="recipientName"
                data-testid="recipientName"
                onChange={handleInput}
                value={inputValue.recipientName}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>
            {isUserInvalid && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *Recipient name not found*
              </Text>
            )}
            <FormControl>
              <FormLabel>Content:</FormLabel>
              <Input
                name="content"
                data-testid="content"
                onChange={handleInput}
                value={inputValue.content}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>
            <Stack direction="row" align="baseline" spacing="20px" mt={3}>
              <FormLabel>Start Time: </FormLabel>
              <Input
                name="startTime"
                data-testid="startTime"
                type="time"
                width="auto"
                variant="outline"
                border="2px"
                onChange={handleInput}
                value={inputValue.startTime}
              ></Input>
            </Stack>
            <Stack direction="row" align="baseline" spacing="27px" mt={3}>
              <FormLabel>End Time: </FormLabel>
              <Input
                name="endTime"
                data-testid="endTime"
                type="time"
                width="auto"
                variant="outline"
                border="2px"
                onChange={handleInput}
                value={inputValue.endTime}
              ></Input>
            </Stack>

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

  //DOM
  return (
    <div>
      <Flex
        height="100vh"
        alignItems="baseline"
        justifyContent="left"
        background={isUnauthorizedAccess ? "white" : "teal.100"}
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
            background={isUnauthorizedAccess ? "white" : "teal.100"}
          >
            <Flex
              width="auto"
              p={5}
              direction="column"
              background="teal.100"
              rounded={6}
            ></Flex>
            <Flex
              width="150vh"
              ml={100}
              direction="column"
              background="teal.300"
              p={12}
              rounded={6}
            >
              <Heading mb={3}>Schedule for {userName}</Heading>
              <Stack direction="column" justify="left">
                <Stack direction="row">
                  <div>
                    <Calendar
                      calendarType="gregory"
                      minDate={new Date()}
                      onChange={(value) => {
                        setSelectedDate(value);
                        handleRefreshList(value);
                      }}
                    ></Calendar>
                  </div>
                  {!isSchedulePresent && (
                    <Text ml={50}>There is no event at this date.</Text>
                  )}
                </Stack>
                <Stack direction="column" ml={50}>
                  {isSchedulePresent && (
                    <TableContainer>
                      <Table variant="striped" colorScheme="teal">
                        <Thead>
                          <Tr>
                            <Td>ID</Td>
                            <Td>Recipient Name</Td>
                            <Td>Start Time</Td>
                            <Td>End Time</Td>
                            <Td>Note</Td>
                          </Tr>
                        </Thead>
                        {listOfScheduleSFX}
                      </Table>
                    </TableContainer>
                  )}
                  {CreateInsertModalBox(modalBox)}

                  <Stack direction="row">
                    <Button
                      data-testid="addButton"
                      backgroundColor="red.300"
                      mt={3}
                      onClick={handleReturnModule}
                      alignSelf="left"
                    >
                      Back to the Module
                    </Button>
                    <Button
                      data-testid="addButton"
                      colorScheme="teal"
                      mt={3}
                      onClick={modalBox.onOpen}
                      alignSelf="left"
                    >
                      Add Event
                    </Button>
                  </Stack>

                  {isServiceDown && (
                    <Wrap justify="center" mt={10}>
                      <Text fontSize="medium" mt={3}>
                        <Stack direction="column">
                          <b>404 Service is not Available.</b>
                          <b>Error: {errorMessage}</b>
                        </Stack>
                      </Text>
                    </Wrap>
                  )}
                </Stack>
              </Stack>
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  );
}
