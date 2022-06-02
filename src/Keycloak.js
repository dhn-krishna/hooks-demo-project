import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  url: "http://20.87.48.237:8080",
  realm: "merchant",
  clientId: "sasaiclientlocal",
});

export default keycloak;
