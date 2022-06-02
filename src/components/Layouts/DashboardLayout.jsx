import { Box, styled } from "@mui/material";
import LoadingScreen from "components/LoadingScreen";
import { H1 } from "components/Typography";
import { getUserData } from "helpers/apifunctions";
import KeyCloakData from "helpers/KeyCloakData";
import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSideBar"; // styled components

const Wrapper = styled(Box)(({ theme, show }) => ({
  width: `calc(100% - ${show ? "320px" : "80px"})`,
  paddingLeft: "3rem",
  paddingRight: "3rem",
  transition: "all 0.3s",
  marginLeft: show ? 320 : 80,
  [theme.breakpoints.down(1200)]: {
    width: "100%",
    marginLeft: 0,
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
}));
const InnerWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    maxWidth: 1200,
    margin: "auto",
  },
}));

const DashboardLayout = ({ children }) => {
  const [sideBarLocked, setSideBarLocked] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);
  const [openSecondarySideBar, setOpenSecondarySideBar] = useState(false);
  const keycloak = KeyCloakData();
  const token = keycloak.token;
  const accountId = keycloak.tokenParsed.accountId;
  const [initData, setToInitData] = useState();
  const [initError, setToInitError] = useState(false);
  const [isLoading, setToLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData(accountId, token);
        console.log(response);
        setToInitData(response);
      } catch (error) {
        console.log(error);
        setToInitError(true);
      }
      setToLoading(false);
    };
    fetchData();
  }, [accountId, token]);
  return (
    <Fragment>
      {initError && !isLoading && (
        <H1>Something went wrong!Please reload this website Now!!!</H1>
      )}
      {!initError && isLoading && <LoadingScreen />}
      {!initError && !isLoading && (
        <Fragment>
          <DashboardSidebar
            initData={initData}
            sideBarLocked={sideBarLocked}
            showMobileSideBar={showMobileSideBar}
            openSecondarySideBar={openSecondarySideBar}
            setOpenSecondarySideBar={setOpenSecondarySideBar}
            closeMobileSideBar={() => setShowMobileSideBar(false)}
          />

          <Wrapper show={openSecondarySideBar}>
            <InnerWrapper>
              <DashboardNavbar
                initData={initData}
                sideBarLocked={sideBarLocked}
                setOpenSecondarySideBar={() =>
                  setOpenSecondarySideBar((state) => !state)
                }
                setSideBarLocked={() => setSideBarLocked((state) => !state)}
                setShowMobileSideBar={() =>
                  setShowMobileSideBar((state) => !state)
                }
              />
              {children || <Outlet />}
            </InnerWrapper>
          </Wrapper>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DashboardLayout;
