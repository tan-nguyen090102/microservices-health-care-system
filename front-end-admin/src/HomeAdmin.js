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
} from "@chakra-ui/react";

export default function HomePanel() {
  const IP = window.location.hostname;
  const location = useLocation();
  const [isNotiPresent, setNotiPresent] = React.useState(false);
  const [listOfNotiSFX, setListOfNotiSFX] = React.useState([]);
  const [listOfNoti, setListOfNoti] = React.useState([]);
  const [isUnauthorizedAccess, setUnauthorizedAccess] = React.useState(false);
  const [isServiceDown, setServiceDown] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const [linkToReturn, setLinkToReturn] = React.useState("");
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
            fetch("http://" + IP + ":5000/noti", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "content-type": "application/json; charset=UTF-8",
              },
              mode: "cors",
              credentials: "include",
              body: JSON.stringify({
                requestCode: "A",
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data !== "False") {
                  setListOfNoti(data);
                  setListOfNotiSFX(CreateListOfNoti(data));
                  setNotiPresent(true);
                } else {
                  setListOfNotiSFX([]);
                  setListOfNoti([]);
                  setNotiPresent(false);
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
            setListOfNotiSFX([]);
            setListOfNoti([]);
            setNotiPresent(false);
          }
        }
      })
      .catch((error) => {
        setServiceDown(true);
        setErrorMessage(error.toString());
      });
  }, [location, IP]);

  //Handle delete notification
  const handleDeleteNoti = (notiID) => {
    //Fetch to backend
    fetch("http://" + IP + ":5000/noti", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        notiID: notiID,
        requestCode: "A",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== "False") {
          setListOfNoti(data);
          setListOfNotiSFX(CreateListOfNoti(data));
        } else {
          setListOfNotiSFX([]);
          setListOfNoti([]);
          setNotiPresent(false);
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

  function CreateListOfNoti(list = []) {
    var notiList = [];
    notiList = list.map((item, index) => {
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
                  backgroundColor="grey.100"
                  rounded={20}
                  mr={3}
                  onClick={() => handleDeleteNoti(item[0])}
                >
                  X
                </Button>
              </Stack>
            </Card>
          </Flex>
        </ListItem>
      );
    });
    return notiList;
  }

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
                <Heading mb={3}>Notification</Heading>
                {!isNotiPresent && (
                  <Text>There is no notification recently.</Text>
                )}
                {isNotiPresent && <List>{listOfNotiSFX}</List>}
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
