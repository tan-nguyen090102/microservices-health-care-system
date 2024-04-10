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
  Card,
  CardBody,
  List,
  ListItem,
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

export default function ManagePanel() {
  const IP = window.location.hostname;
  const location = useLocation();
  const [isUserPresent, setUserPresent] = React.useState(false);
  const [listOfUserSFX, setListOfUserSFX] = React.useState([]);
  const [listOfUser, setListOfUser] = React.useState([]);
  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  const [isServiceDown, setServiceDown] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const [linkToReturn, setLinkToReturn] = React.useState("");

  //Receive data from other page.
  const { state } = useLocation();
  const { target, code } = state || { target: "", code: "" };

  //Adding box and toast
  const modalBox = useDisclosure();
  const addToast = useToast();

  useEffect(() => {
    document.title = "Healthcare System Administration";

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
          if (data[3] === "A") {
            setUnauthorizedAccess(false);
            fetch("http://" + IP + ":5000/user-list", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "content-type": "application/json; charset=UTF-8",
              },
              mode: "cors",
              credentials: "include",
              body: JSON.stringify({
                requestCode: code,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data !== "False") {
                  setListOfUser(data);
                  setListOfUserSFX(CreateListOfUser(data));
                  setUserPresent(true);
                } else {
                  setListOfUserSFX([]);
                  setListOfUser([]);
                  setUserPresent(false);
                }
                setServiceDown(false);
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
            setListOfUserSFX([]);
            setListOfUser([]);
            setUserPresent(false);
          }
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setErrorMessage(error.toString());
      });
  }, [location, IP]);

  //Handle delete notification
  const handleDeleteUser = (userID) => {
    //Fetch to backend
    fetch("http://" + IP + ":5000/user-list", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        userID: userID,
        requestCode: code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== "False") {
          setListOfUser(data);
          setListOfUserSFX(CreateListOfUser(data));
        } else {
          setListOfUserSFX([]);
          setListOfUser([]);
          setUserPresent(false);
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

  const navigate = useNavigate();
  const handleNavigate = (path, target, code) => {
    navigate(path, { state: { target: target, code: code } });
  };

  function CreateListOfUser(list = []) {
    var userList = [];
    userList = list.map((item, index) => {
      return (
        <ListItem mb={3} key={index}>
          <Flex width="auto" height="auto">
            <Card>
              <Stack direction="row">
                <CardBody>
                  <Text wordBreak="break-all">
                    {item[1]} ({item[0]})
                  </Text>
                </CardBody>
                <Button
                  alignSelf="center"
                  backgroundColor="red.200"
                  rounded={20}
                  mr={3}
                  onClick={() => handleDeleteUser(item[0])}
                >
                  Delete
                </Button>
              </Stack>
            </Card>
          </Flex>
        </ListItem>
      );
    });
    return userList;
  }

  function CreateInsertModalBox(modalBox) {
    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    //Input listeners
    const [inputValue, setInputValue] = React.useState(initialValues);
    const [isPopUpInvalid, setPopUpInvalid] = React.useState(false);
    const handleInput = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });

      setPopUpInvalid(false);
    };

    const handleRefreshList = () => {
      fetch("http://" + IP + ":5000/user-list", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          requestCode: code,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data !== "False") {
            setListOfUser(data);
            setListOfUserSFX(CreateListOfUser(data));
            setUserPresent(true);
          } else {
            setListOfUserSFX([]);
            setListOfUser([]);
            setUserPresent(false);
          }
          setServiceDown(false);
        });
    };

    //Add button listener
    const handleAdd = async () => {
      let isFilled = false;

      //Check if all the field is filled
      if (
        inputValue.firstName &&
        inputValue.lastName &&
        inputValue.email &&
        inputValue.password
      ) {
        isFilled = true;
      }

      if (isFilled) {
        //Fetch the backend to send the data
        setPopUpInvalid(false);
        await fetch("http://" + IP + ":5000/user-list", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json; charset=UTF-8",
          },
          mode: "cors",
          body: JSON.stringify({
            requestCode: code,
            firstName: inputValue.firstName,
            lastName: inputValue.lastName,
            email: inputValue.email,
            password: inputValue.password,
            authorizationCode: code,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data !== "False") {
              handleRefreshList();
            } else {
              setListOfUserSFX([]);
              setListOfUser([]);
              setUserPresent(false);
            }
          })
          .catch((error) => {
            setServiceDown(true);
            setErrorMessage(error.toString());
          });

        //Call from the top DOM
        modalBox.onClose();

        //Adding toast
        if (!isServiceDown) {
          addToast({
            title: "User Added!",
            description: `The ${target} ${
              inputValue.firstName + " " + inputValue.lastName
            } is ready.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          addToast({
            title: "Error!",
            description: `There is a problem while the system is trying to add the new user.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
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
          <ModalHeader>Add new {target}</ModalHeader>
          <ModalBody>
            {isPopUpInvalid && (
              <Text data-testid="unfilledFields" color="red" mb={3}>
                *Please fill out all required fields*
              </Text>
            )}
            <FormControl>
              <FormLabel>First name:</FormLabel>
              <Input
                name="firstName"
                data-testid="firstName"
                onChange={handleInput}
                value={inputValue.firstName}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Last name:</FormLabel>
              <Input
                name="lastName"
                data-testid="lastName"
                onChange={handleInput}
                value={inputValue.lastName}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Work email:</FormLabel>
              <Input
                name="email"
                data-testid="email"
                onChange={handleInput}
                value={inputValue.email}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Initial Password:</FormLabel>
              <Input
                name="password"
                data-testid="password"
                onChange={handleInput}
                value={inputValue.password}
                variant="filled"
                background="gray.200"
              ></Input>
            </FormControl>
            <ModalFooter>
              <Button
                data-testid="addAddButton"
                colorScheme="green"
                onClick={handleAdd}
              >
                Add
              </Button>
              <Button
                data-testid="cancelButton"
                colorScheme="green"
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
        background={isUnauthorizedAccess ? "white" : "green.500"}
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
            background={isUnauthorizedAccess ? "white" : "green.500"}
          >
            <Flex
              width="auto"
              p={5}
              direction="column"
              background="green.200"
              rounded={6}
            >
              <Stack direction="column" spacing={5}>
                <Button
                  backgroundColor="green.100"
                  rounded={20}
                  onClick={() => handleNavigate("/admin-home", "", "")}
                >
                  HOME
                </Button>
                <Button
                  backgroundColor="green.100"
                  rounded={20}
                  onClick={() =>
                    handleNavigate("/admin-patient", "patient", "P")
                  }
                >
                  PATIENT
                </Button>
                <Button
                  backgroundColor="green.100"
                  rounded={20}
                  onClick={() =>
                    handleNavigate("/admin-physician", "physician", "H")
                  }
                >
                  PHYSICIAN
                </Button>
                <Button
                  backgroundColor="green.100"
                  rounded={20}
                  onClick={() =>
                    handleNavigate("/admin-pharmacist", "pharmacist", "C")
                  }
                >
                  PHARMACIST
                </Button>
                <Button
                  backgroundColor="green.100"
                  rounded={20}
                  onClick={() =>
                    handleNavigate("/admin-lab", "lab operator", "L")
                  }
                >
                  LAB
                </Button>
                <Button
                  backgroundColor="green.100"
                  rounded={20}
                  onClick={() =>
                    handleNavigate("/admin-billing", "billing manager", "B")
                  }
                >
                  BILLING
                </Button>
                <Button
                  backgroundColor="green.100"
                  rounded={20}
                  onClick={() => handleNavigate("/admin-admin", "admin", "A")}
                >
                  ADMIN
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
              background="green.200"
              p={12}
              rounded={6}
            >
              <Stack direction="column" justify="left">
                <Heading mb={3}>List of {target} on the system.</Heading>
                {!isUserPresent && <Text>There is no {target} recently.</Text>}
                {isUserPresent && <List>{listOfUserSFX}</List>}
                {CreateInsertModalBox(modalBox)}
                <Button
                  data-testid="addButton"
                  colorScheme="green"
                  mt={3}
                  onClick={modalBox.onOpen}
                  alignSelf="left"
                >
                  Add
                </Button>
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
            </Flex>
          </Flex>
        )}
      </Flex>
    </div>
  );
}
