import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function HomePanel() {
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/cas-login")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //User has not log in
        if (data[0] === "False") {
          console.log("Has not log in");
          fetch("http://localhost:5000/cas-login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "content-type": "application/json; charset=UTF-8",
            },
            mode: "cors",
            body: JSON.stringify({
              url: window.location.origin + location.pathname,
            }),
          });

          window.location = "http://localhost:3001/cas-login";
        } else {
          console.log("Welcome" + data[0]);
        }
      });
  }, []);
}
