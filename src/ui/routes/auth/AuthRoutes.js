import React from "react";
import { Route, Switch } from "react-router-dom";
import useMedia from "../../components/hooks/useMedia";
import { useAuth } from "../../../context/auth";

import MobileLogin from "../../components/login-view/MobileLogin";
import MobileHome from "../../components/home/MobileHome";
import MobileMap from "../../components/map/MobileMap";

import DesktopLayout from "../../views/desktop/DesktopLayout";
import DesktopLogin from "../../components/login-view/DesktopLogin";
import DesktopHome from "../../components/home/DesktopHome";

import BrowserCrags from "../../components/crags/BrowserCrags";
import DesktopMap from "../../components/map/DesktopMap";
import LoggedIn from "../../components/logged-in/";
import CragDetail from "../../components/crags/CragDetail";
import NewCrag from "../../components/crags/NewCrag";
import SectorDetail from "../../components/sectors/SectorDetail";
import RouteList from "../../components/routes/RouteList";
import NewSector from "../../components/sectors/NewSector";
import NewRoute from "../../components/routes/NewRoute";
import NewUser from "../../components/new-user/NewUser";

import PrivateRoute from "./PrivateRoute";

function AuthRoutes() {
  const isWide = useMedia("(min-width: 769px)");
  const { loggedIn } = useAuth();

  return (
    <>
      {isWide ? (
        <DesktopLayout>
          <Switch>
            <Route exact path="/" component={DesktopHome} />
            <Route path="/map" component={DesktopMap} />
            <Route exact path="/crags" component={BrowserCrags} />
            <PrivateRoute
              exact
              path="/new-crag/:province"
              component={NewCrag}
            />
            <Route exact path="/crags/:province" component={CragDetail} />
            <Route exact path="/sectors/:cragName" component={SectorDetail} />
            <PrivateRoute
              exact
              path="/sectors/new-sector/:crag"
              component={NewSector}
            />
            <PrivateRoute
              exact
              path="/routes/new-route/:sectorName"
              component={NewRoute}
            />
            <Route exact path="/routes/:sectorName" component={RouteList} />
            {loggedIn ? (
              <Route path="/account" component={LoggedIn} />
            ) : (
              <Route path="/account" component={DesktopLogin} />
            )}
            <Route exact path="/signup" component={NewUser} />
          </Switch>
        </DesktopLayout>
      ) : (
        <Switch>
          <Route exact path="/" component={MobileHome} />
          <Route path="/map" component={MobileMap} />
          <Route exact path="/crags" component={BrowserCrags} />
          <Route exact path="/crags/:province" component={CragDetail} />
          <Route exact path="/sectors/:cragName" component={SectorDetail} />
          <Route exact path="/routes/:sectorName" component={RouteList} />
          <PrivateRoute
            exact
            path="/routes/new-route/:sectorName"
            component={NewRoute}
          />
          {loggedIn ? (
            <Route path="/new-crag/:province" component={NewCrag} />
          ) : (
            <Route path="/new-crag/:province" component={MobileLogin} />
          )}

          {loggedIn ? (
            <Route path="/account" component={LoggedIn} />
          ) : (
            <Route path="/account" component={MobileLogin} />
          )}
          <Route exact path="/signup" component={NewUser} />
        </Switch>
      )}
    </>
  );
}

export default AuthRoutes;
