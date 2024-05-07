import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Stack, Heading, Text, Wrap, Box } from "@chakra-ui/react";

export default function Payments() {
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
            console.log(userID);
            fetchPatientBillingInfo(userID);
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

  const [billingInfo, setBillingInfo] = useState(null);

  const fetchPatientBillingInfo = (userID) => {
    console.log(userID);
    fetch(`http://${loginIP}:5000/patient-billing/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBillingInfo(data.data);
      })
      .catch((error) => {
        console.error("Error fetching patient billing information:", error);
      });
  };

  return (
    <div>
      <Flex
        height="100vh"
        alignItems="baseline"
        justifyContent="left"
        background={isUnauthorizedAccess ? "white" : "blue.400"}
      >
        {isUnauthorizedAccess && (
          <Wrap justify="center" mt={10}>
            <Text fontSize="xxx-large" mt={3}>
              <b>401 Forbidden: Unauthorized Access.</b>
            </Text>
          </Wrap>
        )}
        {!isUnauthorizedAccess && (
          <Flex
            height="100vh"
            alignItems="baseline"
            justifyContent="left"
            background="blue.400"
          >
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
                  <Heading mb={3}>Payments</Heading>
                </Stack>
                {billingInfo &&
                  billingInfo.map((bill, index) => (
                    <Flex
                      key={index}
                      direction="column"
                      background="blue.100"
                      p={4}
                      rounded={6}
                      mt={4}
                    >
                      <Heading size="md">{bill.id}</Heading>
                      <Text>
                       <b>Charged Amount:</b> {bill.chargedAmount}
                      </Text>
                      <Text>
                       <b>Amount Paid:</b> {bill.amountPaid}
                      </Text>
                      <Text>
                       <b>Patment Status:</b> {bill.paymentStatus}
                      </Text>
                      <Text>
                       <b>Due Date:</b> {bill.dueDate}
                      </Text>
                      <Text>
                       <b>Payment Date:</b> {bill.paymentDate}
                      </Text>
                      <Text>
                       <b>Bill Date:</b> {bill.billDate}
                      </Text>
                    </Flex>
                  ))}
              </Flex>
            </Stack>
          </Flex>
        )}
      </Flex>
    </div>
  );
}
