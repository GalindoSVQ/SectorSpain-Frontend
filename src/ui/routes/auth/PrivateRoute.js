import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import DesktopLogin from "../../components/login-view/DesktopLogin";

function PrivateRoute({ component, ...options }) {
  const { loggedIn } = useAuth();

  const finalComponent = loggedIn ? component : DesktopLogin;

  return <Route {...options} component={finalComponent} />;
}

export default PrivateRoute;
