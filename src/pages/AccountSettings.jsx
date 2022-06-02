import { Instagram, NotificationsNone } from "@mui/icons-material";
import { Box, Button, Card, Grid, styled, useTheme } from "@mui/material";
import ConnectAccounts from "components/accountSettings/ConnectAccounts";
import Notifications from "components/accountSettings/Notifications";
import RecentDevices from "components/accountSettings/RecentDevices";
import SocialAccounts from "components/accountSettings/SocialAccounts";
import UserInfo from "components/accountSettings/UserInfo";
import FlexBox from "components/FlexBox";
import { H1, H3 } from "components/Typography";
import useTitle from "hooks/useTitle";
import BadgeIcon from "icons/BadgeIcon";
import DevicesIcon from "icons/DevicesIcon";
import DiamondIcon from "icons/DiamondIcon";
import PasswordIcon from "icons/PasswordIcon";
import ProfileIcon from "icons/ProfileIcon";
import SettingIcon from "icons/SettingIcon";
import ShareAccountIcon from "icons/ShareAccount";
import BusinessIcon from "@mui/icons-material/Business";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import convertToSlug from "utils/convertSlug"; // styled component
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import BussinessOverview from "components/accountSettings/BussinessOverview";
import BusinessDetails from "components/accountSettings/BusinessDetails";
import BankAccount from "components/accountSettings/BankAccount";
import DocumentsVerification from "components/accountSettings/DocumentsVerification";
import KeyCloakData from "helpers/KeyCloakData";
import axiosInstance from "utils/axios";
import {
  getBussinessTypes,
  getUserData,
  getBussinessCategory,
  getBankUserInfo,
  putModifyAccount,
  postBankAccount,
  putBankAccount,
} from "helpers/apifunctions";
import BusinessOwners from "components/accountSettings/BusinessOwners";
import LoadingScreen from "components/LoadingScreen";

import { is } from "date-fns/locale";
import toast from "react-hot-toast";
const StyledButton = styled(Button)(() => ({
  fontSize: 12,
  borderRadius: 0,
  marginTop: "0.4rem",
  position: "relative",
  justifyContent: "flex-start",
}));

const AccountSettings = () => {
  // change navbar title
  useTitle("Account Settings");
  const theme = useTheme();
  const { t } = useTranslation();
  const [active, setActive] = useState("business-overview");
  const keycloak = KeyCloakData();
  const token = keycloak.token;
  const accountId = keycloak.tokenParsed.accountId;
  const [isLoading, setIsLoading] = useState(true);
  const [contactInfo, setToContactInfo] = useState();
  const [businessOverview, setToBusinessOverview] = useState();
  const [businessDetails, setToBusinessDetails] = useState();
  const [businessOwners, setToBusinessOwners] = useState();
  const [businessTypes, setBusinessTypes] = useState([]);
  const [BussinessCategories, setBussinessCategories] = useState([]);
  const [documents, setToDocuments] = useState();
  const [bankAccount, setbankAccount] = useState({
    data: null,
    error: null,
  });
  const [postData, setToPostData] = useState();
  const [postBankData, setToPostBankData] = useState();
  const [initError, setToInitError] = useState(false);
  const [modified, setToModified] = useState(false);

  useEffect(() => {
    console.log("useE");
    const fetchData = async () => {
      try {
        const responsebt = await getBussinessTypes();
        setBusinessTypes(responsebt);
        const responseBussinessCat = await getBussinessCategory(token);
        setBussinessCategories(responseBussinessCat);
      } catch (error) {
        setToInitError(true);
      }

      try {
        const response = await getUserData(accountId, token);
        // console.log(response);

        const businessOverview = {
          bTypes: response?.businessDetail?.businessType || "",
          bCategory: response?.businessOverview?.category || "",
          sCategory: response?.businessOverview?.subcategory || "",
          bDescription: response?.businessOverview?.description || "",
          rst1:
            response?.businessOverview?.addresses?.registered?.street1 || "",
          rst2:
            response?.businessOverview?.addresses?.registered?.street2 || "",
          rci: response?.businessOverview?.addresses?.registered?.city || "",
          rs: response?.businessOverview?.addresses?.registered?.state || "",
          rp:
            response?.businessOverview?.addresses?.registered?.postalCode || "",
          rc: response?.businessOverview?.addresses?.registered?.country || "",
          ost1: response?.businessOverview?.addresses?.operation?.street1 || "",
          ost2: response?.businessOverview?.addresses?.operation?.street2 || "",
          oci: response?.businessOverview?.addresses?.operation?.city || "",
          os: response?.businessOverview?.addresses?.operation?.state || "",
          op:
            response?.businessOverview?.addresses?.operation?.postalCode || "",
          oc: response?.businessOverview?.addresses?.operation?.country || "",
        };
        //console.log(businessOverview);
        setToBusinessOverview(businessOverview);
        const businessDetails = {
          lbName: response?.businessDetail?.legalBusinessName || "",
          cfbName: response?.businessDetail?.customerFacingBusinessName || "",
          apps: response?.businessDetail?.apps || "",
        };
        // console.log(businessDetails)
        setToBusinessDetails(businessDetails);
        const businessOwners = response?.businessOwners || "";
        // console.log(businessOwners)
        setToBusinessOwners(businessOwners);

        let kycInfoArray = [];
        for (let i = 0; i < response?.businessOwners?.length; i++) {
          const name = response?.businessOwners[i]?.name || "";
          const ownerid = response?.businessOwners[i]?.id || "";
          const kycInfo = response?.businessOwners[i]?.kycInfo[0] || "";
          kycInfoArray.push({
            id: i,
            name: name,
            ownerid: ownerid,
            kycInfo: kycInfo,
          });
        }

        const documents = {
          kybInfo: response?.businessDetail?.kybInfo || "",
          kycInfo: kycInfoArray,
        };
        // console.log(documents)
        setToDocuments(documents);

        const contactInfo = {
          cemail: response?.contactInfo.chargeback?.email || "",
          cphone: response?.contactInfo?.chargeback?.phone || "",
          cpolicy: response?.contactInfo?.chargeback?.policyUrl || "",
          remail: response?.contactInfo?.refund?.email || "",
          rphone: response?.contactInfo?.refund?.phone || "",
          rpolicy: response?.contactInfo?.refund?.policyUrl || "",
          semail: response?.contactInfo?.support?.email || "",
          sphone: response?.contactInfo?.support?.phone || "",
          spolicy: response?.contactInfo?.support?.policyUrl || "",
        };
        // console.log(contactInfo)
        setToContactInfo(contactInfo);

        const postData = {
          id: accountId,
          businessOverview: {
            category: businessOverview.bCategory,
            subcategory: businessOverview.sCategory,
            addresses: {
              registered: {
                street1: businessOverview.rst1,
                street2: businessOverview.rst2,
                city: businessOverview.rci,
                state: businessOverview.rs,
                postalCode: businessOverview.rp,
                country: businessOverview.rc,
              },
              operation: {
                street1: businessOverview.ost1,
                street2: businessOverview.ost2,
                city: businessOverview.oci,
                state: businessOverview.os,
                country: businessOverview.oc,
                postalCode: businessOverview.op,
              },
            },
            description: businessOverview.bDescription,
          },
          businessDetail: {
            businessType: businessOverview.bTypes.code,
            legalBusinessName: businessDetails.lbName,
            customerFacingBusinessName: businessDetails.cfbName,
            apps: {
              websites: [
                
                businessDetails.apps.websites[0],
              ],
              android: [
                {
                  url: businessDetails.apps.android[0].url,
                  name: businessDetails.apps.android[0].name,
                },
              ],
              ios: [
                {
                  url: businessDetails.apps.ios[0].url,
                  name: businessDetails.apps.ios[0].name,
                },
              ],
            },
          },
          businessOwners: businessOwners,
          contactInfo: {
            chargeback: {
              email: contactInfo.cemail,
              phone: contactInfo.cphone,
              policyUrl: contactInfo.cpolicy,
            },
            refund: {
              email: contactInfo.remail,
              phone: contactInfo.rphone,
              policyUrl: contactInfo.rpolicy,
            },
            support: {
              email: contactInfo.semail,
              phone: contactInfo.sphone,
              policyUrl: contactInfo.spolicy,
            },
          },
        };
        setToPostData(postData);
      } catch (error) {
        setToInitError(true);
      }

      try {
        const getBankInfo = await getBankUserInfo(accountId, token);
        setbankAccount({
          data: getBankInfo,
          error: null,
        });
        const postData = {
          bankName: bankAccount?.data?.bankName,
          accountNumber: bankAccount?.data?.accountNumber,
          bvn: bankAccount?.data?.bvn,
          bankCode: bankAccount?.data?.bankCode,
        };
        setToPostBankData(postData);
      } catch (error) {
        if (error.errorCode === "bank.info.not.found") {
          setbankAccount({
            data: null,
            error: null,
          });
        } else {
          setbankAccount({
            data: null,
            error: error,
          });
        }
      }

      setIsLoading(false);
    };
    fetchData();
  }, [accountId, token, modified]);

  const style = {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary.light
        : theme.palette.divider,
    color: theme.palette.primary.main,
    "&::before": {
      width: 4,
      right: 0,
      content: '""',
      height: "100%",
      position: "absolute",
      backgroundColor: theme.palette.primary.main,
    },
  };

  const onSaveHandler = async (data) => {
    console.log("save");
    console.log(data);
    try {
      const response = await putModifyAccount(accountId, token, data);
      console.log(response);
      setToModified(!modified);
    } catch (error) {
      console.log(error);
    }
  };
  const saveBankData = async (data) => {
    console.log("save bank");
    console.log(data);
    if (data.bankId) {
      try {
        const response = await putBankAccount(
          accountId,
          token,
          data,
          data.bankId
        );
        console.log(response);
        setToModified(!modified);
      } catch (error) {
        console.log(error);
        toast.error(
          t("Unable to update bank details, please try after sometime")
        );
      }
    } else {
      try {
        const response = await postBankAccount(accountId, token, data);
        console.log(response);
        setToModified(!modified);
      } catch (error) {
        console.log(error);
        toast.error(
          t("Unable to update bank details, please try after sometime")
        );
      }
    }
  };
  const onNextHandler = async (name, data) => {
    console.log("onNextHandler data", data);

    if (name === "Documents Verification") {
      await saveBankData(data);
    } else {
      await onSaveHandler(data);
    }
    setActive(convertToSlug(name));
  };
  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Card
            sx={{
              padding: "1.5rem 0",
            }}
          >
            
            <FlexBox
              flexDirection="column"
              sx={{
                [theme.breakpoints.between("sm", 960)]: {
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              }}
            >
              {tabList.map(({ id, name, Icon }) => (
                <StyledButton
                  key={id}
                  startIcon={
                    <Icon
                      sx={{
                        color: "text.disabled",
                      }}
                    />
                  }
                  onClick={() => setActive(convertToSlug(name))}
                  sx={
                    active === convertToSlug(name)
                      ? style
                      : {
                          "&:hover": style,
                        }
                  }
                >
                  {t(name)}
                </StyledButton>
              ))}
            </FlexBox>
          </Card>
        </Grid>

        {isLoading && !initError ? (
          <LoadingScreen />
        ) : isLoading && initError ? (
          <H1>Something went wrong</H1>
        ) : (
          <Grid item md={9} xs={12}>
            {active === convertToSlug(tabList[0].name) && (
              <BussinessOverview
                postData={postData}
                save={onSaveHandler}
                bt={businessTypes}
                bc={BussinessCategories}
                data={businessOverview}
                next={onNextHandler}
              />
            )}
            {active === convertToSlug(tabList[1].name) && (
              <BusinessDetails
                postData={postData}
                save={onSaveHandler}
                data={businessDetails}
                next={onNextHandler}
              />
            )}
            {active === convertToSlug(tabList[2].name) && (
              <BusinessOwners
                postData={postData}
                save={onSaveHandler}
                data={businessOwners}
                next={() => onNextHandler("Bank Account")}
              />
            )}
            {active === convertToSlug(tabList[3].name) && (
              <BankAccount
                postData={postBankData}
                save={saveBankData}
                data={bankAccount}
                next={onNextHandler}
              />
            )}
            {active === convertToSlug(tabList[4].name) && (
              <DocumentsVerification
                accountId={accountId}
                data={documents}
                next={() => onNextHandler("Contact Info")}
              />
            )}
            {active === convertToSlug(tabList[5].name) && (
              <UserInfo
                postData={postData}
                save={onSaveHandler}
                data={contactInfo}
              />
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const tabList = [
  {
    id: 1,
    name: "Business Overview",
    Icon: BusinessIcon,
  },
  {
    id: 2,
    name: "Business Details",
    Icon: AddBusinessIcon,
  },
  {
    id: 3,
    name: "Business Owners",
    Icon: AccountBalanceIcon,
  },
  {
    id: 4,
    name: "Bank Account",
    Icon: AccountBalanceIcon,
  },
  {
    id: 5,
    name: "Documents Verification",
    Icon: DocumentScannerIcon,
  },
  {
    id: 6,
    name: "Contact Info",
    Icon: ProfileIcon,
  },
];
export default AccountSettings;
