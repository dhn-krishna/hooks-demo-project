import { ControlPoint } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab } from "@mui/material";
import AddBusinessOwner from "./AddBusinessOwner";
import FlexBox from "components/FlexBox";
import { H5 } from "components/Typography";
import useTitle from "hooks/useTitle";
import PeopleIcon from "icons/PeopleIcon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../utils/axios"; // styled components
import BusinessOwnerList from "./BusinessOwnerList";

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

const BusinessOwners = (props) => {
  // change navbar title
  useTitle("Account Settings");
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { next, data, postData, save } = props;
  // const [pData,setToPData] = useState(postData)

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleDelete = async (ids) => {
    console.log(ids);
    const { data } = await axios.post("/api/tableData1/delete", {
      ids,
    });
    setTableData(data);
  };

  const filterTable = data;
  return (
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

            <AddBusinessOwner open={openModal} postData={postData} save={save} onClose={() => setOpenModal(false)} />

            {/*  Data Table */}
            <BusinessOwnerList data={filterTable} handleDelete={handleDelete} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default BusinessOwners;
