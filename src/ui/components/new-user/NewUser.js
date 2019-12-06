import React, { useState } from "react";
import Head from "../head/Head";
import axios from "axios";
import http from "../../../api/http";

import "./NewUser.scss";

function NewUser() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);

  const createUser = e => {
    e.preventDefault();
    try {
      axios
        .post(`${http.defaults.baseURL}auth/create/`, {
          first_name: firstName,
          email: email,
          password: password
        })
        .then(response => {
          setMessage("Climber registered correctly, thanks!");
          resetInput();
        })
        .catch(err => {
          setMessage("Please, check your data. " + err);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setMessage(null);
    }
  };

  const resetInput = () => {
    setFirstName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="head-mobile">
        <Head />
      </div>
      <span className="login-background"> </span>

      <div className="new-user-view">
        <div className="box-login">
          <div className="title-login">CLIMBER SIGN UP</div>
          <form>
            <div className="box-form">
              <label htmlFor="first_name">NAME</label>
              <input
                className="inputLogin"
                type="first_name"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
                id="first_name"
              />
              <label htmlFor="email">EMAIL</label>
              <input
                className="inputLogin"
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                id="email"
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                className="inputLogin"
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                id="password"
              />
              <button className="button-login" onClick={createUser}>
                Sign Up
              </button>
            </div>
          </form>
          <div className="message-new-climber">{message && message}</div>
        </div>
      </div>
    </>
  );
}
export default NewUser;
