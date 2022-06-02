import KeyCloakData from "helpers/KeyCloakData";
import useAuth from "hooks/useAuth";
import Login from "pages/authentication/Login";
import ComponentsPage from "pages/ComponentsPage";
import React, { Fragment, useState } from "react";
import { Navigate, useLocation } from "react-router-dom"; // component props interface

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  const keycloak = KeyCloakData()

  // console.log(keycloak);
  const isLoggedIn = keycloak.authenticated;

  //if (!isAuthenticated) {
  if (!isLoggedIn) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    // return <Login />;
    return <ComponentsPage />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
