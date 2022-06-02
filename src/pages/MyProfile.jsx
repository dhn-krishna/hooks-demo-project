import { MoreHoriz } from "@mui/icons-material";
import { Box, Card, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import FlexBox from "components/FlexBox";
import LoadingScreen from "components/LoadingScreen";
import { H1, H2, H3, H4, H5, H6, Paragraph, Small } from "components/Typography";
import { getBankUserInfo, getUserData } from "helpers/apifunctions";
import KeyCloakData from "helpers/KeyCloakData";
import useTitle from "hooks/useTitle";
import DeleteIcon from "icons/DeleteIcon";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MyProfile = (props) => {
  useTitle("My Profile");
  const keycloak = KeyCloakData();
  const { t } = useTranslation();
  const token = keycloak.token;
  const accountId = keycloak.tokenParsed.accountId;
  const [initError, setToInitError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setToData] = useState();
  const [bankData, setToBankData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData(accountId, token);
        const data = {
          businessType: response?.businessDetail?.businessType || "",
          businessCategory: response?.businessOverview?.category || "",
          subCategory: response?.businessOverview?.subcategory || "",
          businessDescription: response?.businessOverview?.description || "",
          rStreet1: response?.businessOverview?.addresses?.registered?.street1 || "",
          rStreet2: response?.businessOverview?.addresses?.registered?.street2 || "",
          rPincode: response?.businessOverview?.addresses?.registered?.postalCode || "",
          rCity: response?.businessOverview?.addresses?.registered?.city || "",
          rCountry: response?.businessOverview?.addresses?.registered?.country || "",
          rState: response?.businessOverview?.addresses?.registered?.state || "",
          oStreet1: response?.businessOverview?.addresses?.operation?.street1 || "",
          oStreet2: response?.businessOverview?.addresses?.operation?.street2 || "",
          oPincode: response?.businessOverview?.addresses?.operation?.postalCode || "",
          oCity: response?.businessOverview?.addresses?.operation?.city || "",
          oCountry: response?.businessOverview?.addresses?.operation?.country || "",
          oState: response?.businessOverview?.addresses?.operation?.state || "",

          lbName: response?.businessDetail?.legalBusinessName || "",
          cfbName: response?.businessDetail?.customerFacingBusinessName || "",
          wurl: response?.businessDetail?.apps.websites[0] || "",
          aurl: response?.businessDetail?.apps.android[0].url || "",
          aname: response?.businessDetail?.apps.android[0].name || "",
          iurl: response?.businessDetail?.apps.ios[0].url || "",
          iname: response?.businessDetail?.apps.ios[0].name || "",

          businessOwners: response?.businessOwners || "",

          cemail: response?.contactInfo?.chargeback.email || "",
          cphone: response?.contactInfo?.chargeback.phone || "",
          cpolicy: response?.contactInfo?.chargeback.policyUrl || "",
          remail: response?.contactInfo?.refund.email || "",
          rphone: response?.contactInfo?.refund.phone || "",
          rpolicy: response?.contactInfo?.refund.policyUrl || "",
          semail: response?.contactInfo?.support.email || "",
          sphone: response?.contactInfo?.support.phone || "",
          spolicy: response?.contactInfo?.support.policyUrl || "",
        };
        setToData(data);
      } catch (err) {
        setToInitError(true);
      }
      try {
        const getBankInfo = await getBankUserInfo(accountId, token);
        const data = {
          bankName: getBankInfo[0]?.bankName || "",
          bankCode: getBankInfo[0]?.bankCode || "",
          bankId: getBankInfo[0]?.bankId || "",
          bvn: getBankInfo[0]?.bvn || "",
        };
        setToBankData(data);
      } catch (error) {
        if (error.errorCode === "bank.info.not.found") {
          setToBankData(null);
        } else {
          setToInitError(true);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [accountId, token]);

  return (
    <Fragment>
      {isLoading && !initError && <LoadingScreen />}
      {!isLoading && initError && <H1>Something went wrong, Please try Again Later !!!</H1>}
      {!isLoading && !initError && (
        <Fragment>
          <Card>
            <Box padding={3}>
              <H2>{t("Business Overview")}</H2>
              <Divider />
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid container spacing={3} mt={-2}>
                <Grid item xs={3}>
                  <H6>{t("Business Type")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.businessType}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Business Category")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.businessCategory}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Sub Category")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.subCategory}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Business Description")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.businessDescription}</Paragraph>
                </Grid>

                <Grid item xs={12}>
                  <H3>{t("Registered Address")}</H3>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Street 1")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.rStreet1}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Street 2")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.rStreet2}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Pincode")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.rPincode}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("City")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.rCity}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Country")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.rCountry}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("State")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.rState}</Paragraph>
                </Grid>
                <Grid item xs={12}>
                  <H3>{t("Operation Address")}</H3>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Street 1")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.oStreet1}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Street 2")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.oStreet2}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Pincode")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.oPincode}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("City")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.oCity}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Country")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.oCountry}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("State")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.oState}</Paragraph>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <H2>{t("Business Details")}</H2>
              <Divider />
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid container spacing={3} mt={-2}>
                <Grid item xs={3}>
                  <H6>{t("Legal Business Name")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.lbName}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Customer Facing Business Name")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.cfbName}</Paragraph>
                </Grid>
                <Grid item xs={12}>
                  <H3>{t("Website")}</H3>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("URL")}</H6>
                </Grid>
                <Grid item xs={6}>
                  <Paragraph>{data.wurl}</Paragraph>
                </Grid>
                <Grid item xs={12}>
                  <H3>{t("Android")}</H3>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Name")}</H6>
                </Grid>
                <Grid item xs={9}>
                  <Paragraph>{data.aname}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("URL")}</H6>
                </Grid>
                <Grid item xs={9}>
                  <Paragraph>{data.aurl}</Paragraph>
                </Grid>
                <Grid item xs={12}>
                  <H3>{t("IOS")}</H3>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Name")}</H6>
                </Grid>
                <Grid item xs={9}>
                  <Paragraph>{data.iname}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("URL")}</H6>
                </Grid>
                <Grid item xs={9}>
                  <Paragraph>{data.iurl}</Paragraph>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <H2>{t("Business Owners")}</H2>
              <Divider />
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              {/* <Grid container spacing={3} mt={-2}> */}
              {/* <Grid item xs={12}>
                <H5>{t("Charge Back")} {t("Email")}</H5>
              </Grid> */}
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        {/* <TableCell>Address</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.businessOwners.map((column) => (
                        <TableRow key={column.id}>
                          <TableCell>{column.name}</TableCell>
                          <TableCell>{column.phone}</TableCell>
                          <TableCell>{column.email}</TableCell>
                          {/* <TableCell key={column.id}>{column.address}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* </Grid> */}
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <H2>{t("Contact Info")}</H2>
              <Divider />
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid container spacing={3} mt={-2}>
                <Grid item xs={12}>
                  <H3>{t("Charge Back")}</H3>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Email")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.cemail}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Phone")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.cphone}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Policy URL")}</H6>
                </Grid>
                <Grid item xs={6}>
                  <Paragraph>{data.cpolicy}</Paragraph>
                </Grid>
                <Grid item xs={12}>
                  <H3>{t("Refund")}</H3>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Email")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.remail}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Phone")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.rphone}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Policy URL")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.rpolicy}</Paragraph>
                </Grid>
                <Grid item xs={12}>
                  <H3>{t("Support")}</H3>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Email")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.semail}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Phone")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.sphone}</Paragraph>
                </Grid>
                <Grid item xs={3}>
                  <H6>{t("Policy URL")}</H6>
                </Grid>
                <Grid item xs={3}>
                  <Paragraph>{data.spolicy}</Paragraph>
                </Grid>
              </Grid>
            </Box>
          </Card>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
        </Fragment>
      )}
      <Grid item xs={12}>
        &nbsp;
      </Grid>
    </Fragment>
  );
};
export default MyProfile;
