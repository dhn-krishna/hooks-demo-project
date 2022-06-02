import { ControlPoint } from "@mui/icons-material";
import { Fragment } from "react";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab } from "@mui/material";
import AddBusinessOwner from "components/updateKyc/AddBusinessOwner";
import BusinessOwnerList from "components/updateKyc/BusinessOwnerList";
import FlexBox from "components/FlexBox";
import { H5, H1 } from "components/Typography";
import { deleteUser, getAllAccounts, postAddUserWithRole, putUpdateUser } from "helpers/apifunctions";
import KeyCloakData from "helpers/KeyCloakData";
import useTitle from "hooks/useTitle";
import PeopleIcon from "icons/PeopleIcon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "utils/axios";
import LoadingScreen from "components/LoadingScreen";

import ManageUserList from "components/manageTeam/ManageUserList";
import AddManageUser from "components/manageTeam/AddManageUser";
// styled components

const Wrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "0 1.5rem",
  paddingTop: "1rem",
}));
const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  width: 40,
  height: 40,
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "0.5rem",
}));
const TabListWrapper = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(700)]: {
    order: 3,
    marginTop: 1,
  },
}));

const ManageTeam = (props) => {
  // change navbar title
  useTitle("Manage Team");
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setToLoading] = useState(false);
  const [isModified,setToModified]=useState(false)
  const [Data, setToData] = useState({
    data: null,
    error: null,
  });
  const keycloak = KeyCloakData();
  const token = keycloak.token;
  const accountId = keycloak.tokenParsed.accountId;

  const count = 100;
  const from = 0;
  const skip = 0;
  const to = 100;

  useEffect(() => {
    setToLoading(true)
    const fetchData = async () => {
      try {
        const response = await getAllAccounts(accountId, token, count, from, skip, to);
        console.log("res",response)
        setToData({
          data: response,
          error: null,
        });
      } catch (error) {
        console.log("error",error)
        if (error.errorCode === "user.not.found") {
          setToData({
            data: null,
            error: null,
          });
        } else {
          setToData({
            data: null,
            error: error.errorUserMsg,
          });
        }
      }
      setToLoading(false);
    };
    fetchData();
  }, [accountId, token,isModified]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleDelete = async (userId) => {
    console.log("Delete User");
    try {
      const response = await deleteUser(accountId, userId, token);
      console.log(response);
      setToModified(!isModified)
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddUser = async (data) => {
    console.log("Add User");
    console.log(data);
    try {
      const response = await postAddUserWithRole(accountId, token, data);
      console.log(response);
      setToModified(!isModified)
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateUser = async (userId, data) => {
    console.log("Update User");
    console.log(data);
    try {
      const response = await putUpdateUser(accountId, userId, token, data);
      console.log(response);
      setToModified(!isModified)
    } catch (error) {
      console.log(error);
    }
  };

  const filterTable = Data.data;

  return (
    <Fragment>
      {Data.error !== null && isLoading && <LoadingScreen />}
      {Data.error !== null && !isLoading && <H1>Something Went Wrong Please Try Again Later</H1>}
      {Data.error === null && !isLoading && (
        <Box pt={2} pb={4}>
          <Card
            sx={{
              boxShadow: 4,
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Wrapper>
                  <FlexBox alignItems="center">
                    <IconWrapper>
                      <PeopleIcon
                        sx={{
                          color: "primary.main",
                        }}
                      />
                    </IconWrapper>
                    <H5>{t("Business Owners")}</H5>
                  </FlexBox>

                  <Button
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                    startIcon={
                      <ControlPoint
                        sx={{
                          color: "text.secondary",
                        }}
                      />
                    }
                    sx={{
                      fontSize: 12,
                      boxShadow: 3,
                    }}
                  >
                    {t("Add New User")}
                  </Button>
                </Wrapper>

                <AddManageUser save={handleAddUser} open={openModal} onClose={() => setOpenModal(false)} />

                {/*  Data Table */}
                {Data.data !== null && Data.error === null && <ManageUserList data={filterTable} handleDelete={handleDelete} handleUpdate={handleUpdateUser} />}
                {Data.data === null && Data.error === null && (
                  <H1
                    sx={{
                      padding: 3,
                    }}
                  >
                    No Users Found
                  </H1>
                )}
              </Grid>
            </Grid>
          </Card>
        </Box>
      )}
    </Fragment>
  );
};

export default ManageTeam;
