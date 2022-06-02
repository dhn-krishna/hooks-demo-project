import React, { Fragment } from "react"; // component props interface
import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router";

const GuestGuard = ({ children }) => {
  const { keycloak } = useKeycloak();

  console.log(keycloak);
  const isLoggedIn = keycloak.authenticated;

  //// UNCOMMNET BELOW CODE IF YOU WANT TO HIDE AUTH PAGES TO AUTHENTICATED USERS
  //   const { isAuthenticated } = useAuth();
  //   if (isAuthenticated) {
  //     return <Navigate to="/dashboard" />;
  //   }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
