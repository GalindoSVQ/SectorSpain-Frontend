import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import http from "../../../api/http";
import axios from "axios";
import Head from "../head/Head";

import "./logged.scss";

function LoggedIn() {
  const { logout } = useAuth();

  const [first_name, setFirst_name] = useState(" ");
  const [last_name, setLast_name] = useState(" ");
  const [location, setLocation] = useState(" ");
  const [email, setEmail] = useState(" ");

  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`${http.defaults.baseURL}users/me/`, {
        headers: { Authorization: http.defaults.headers["Authorization"] }
      })
      .then(function(response) {
        setFirst_name(response.data.first_name);
        setLast_name(response.data.last_name);
        setLocation(response.data.location);
        setEmail(response.data.email);
      })
      .catch(error => {
        console.log("error " + error);
      });
  }, []);

  const update = e => {
    e.preventDefault();

    try {
      axios
        .patch(
          `${http.defaults.baseURL}users/me/`,
          {
            first_name: first_name,
            last_name: last_name,
            location: location,
            email: email
          },
          {
            headers: { Authorization: http.defaults.headers["Authorization"] }
          }
        )
        .then(response => {
          setMessage("Data updated correctly");
        });
    } catch (e) {
      console.log(e);
    } finally {
      setMessage(null);
    }
  };

  return (
    <>
      <div className="head-mobile">
        <Head />
      </div>
      <div className="user-table">
        <button className="button-logout" onClick={logout}>
          LOGOUT
        </button>
        <form>
          <div className="user-detail">
            <label htmlFor="first-name">First Name</label>
            <input
              className="input-user-detail"
              type="text"
              id="first-name"
              value={first_name}
              onChange={e => setFirst_name(e.target.value)}
            />
            <label htmlFor="last-name">Last Name</label>
            <input
              className="input-user-detail"
              type="text"
              id="last-name"
              value={last_name}
              onChange={e => setLast_name(e.target.value)}
            />
            <label htmlFor="location">Location</label>
            <input
              className="input-user-detail"
              type="text"
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              className="input-user-detail"
              type="text"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="buttom-update" onClick={update}>
              UPDATE
            </button>
          </div>
          <span className="message-patch">{message ? message : null}</span>
        </form>
      </div>
    </>
  );
}

export default LoggedIn;
