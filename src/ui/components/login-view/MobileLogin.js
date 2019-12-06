import React, { useState } from "react";
import { useAuth } from "../../../context/auth/";
import { Link } from "react-router-dom";
import "./LoginView.scss";

import Head from "../head/Head";

function MobileLogin() {
  const { login, attemptingLogin, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function postLogin() {
    login({
      email,
      password
    });
  }

  return (
    <>
      <Head />
      <span className="login-background"> </span>
      <div className="box-login">
        <div className="title-login">CLIMBER LOGIN</div>
        <form>
          <div className="box-form">
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
            <button
              disabled={attemptingLogin}
              className="button-login"
              onClick={postLogin}
            >
              Sign In
            </button>
            <div className="forgot-login">
              <Link to="/signup">Forgot your password?</Link>
              <span className="new-climber">
                <Link to="/signup">New climber?</Link>
              </span>
            </div>
            {error && (
              <span className="errorMessage">
                Sorry climber, something went wrong, please check your
                equipment!
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default MobileLogin;
