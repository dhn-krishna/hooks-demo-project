import { useKeycloak } from "@react-keycloak/web";
const KeyCloakData = () => {
  const { keycloak } = useKeycloak();
  // const data = JSON.stringify(keycloak);
  return keycloak;
};
export default KeyCloakData;
