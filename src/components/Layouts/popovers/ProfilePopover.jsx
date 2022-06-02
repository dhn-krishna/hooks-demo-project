import { Badge, Box, ButtonBase, Divider, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import useAuth from "hooks/useAuth";
import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PopoverLayout from "./PopoverLayout"; // styled components
import KeyCloakData from "helpers/KeyCloakData";
import { useTranslation } from "react-i18next";
const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  padding: "5px 1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary.light : theme.palette.divider,
  },
}));

const ProfilePopover = (props) => {
  const { initData } = props;
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleMenuItem = (path) => {
    navigate(path);
    setOpen(false);
  };
  const keycloak = KeyCloakData();
  console.log("keycloakkeycloak", keycloak);
  // const hasRole = (roles) => roles.some((role) => keycloak.hasRealmRole(role));
  return (
    <Fragment>
      <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "7%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          <UkoAvatar
            src={user?.avatar || "/static/avatar/001-man.svg"}
            sx={{
              width: 30,
              height: 30,
              ml: 1,
            }}
          />
        </Badge>
      </ButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center">
            <UkoAvatar
              src={user?.avatar || "/static/avatar/001-man.svg"}
              sx={{
                width: 35,
                height: 35,
              }}
            />

            <Box ml={1}>
              <H6>{keycloak.idTokenParsed.given_name}</H6>
              <Tiny display="block" fontWeight={500} color="text.disabled">
                {keycloak.idTokenParsed.email}
              </Tiny>
              <Tiny display="block" fontWeight={500} color="text.disabled">
                {t("MID")}: {keycloak.idTokenParsed.mid}
              </Tiny>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          <StyledSmall onClick={() => handleMenuItem("/dashboard/user-profile")}>Set Status</StyledSmall>

          <StyledSmall onClick={() => handleMenuItem("/dashboard/user-profile")}>Profile & Account</StyledSmall>

          <StyledSmall onClick={() => handleMenuItem("/dashboard/update-kyc")}>Settings</StyledSmall>

          {/* <StyledSmall onClick={() => handleMenuItem("/dashboard/team-member")}>Manage Team</StyledSmall> */}
          <StyledSmall onClick={() => handleMenuItem("/dashboard/manage-team")}>Manage Team</StyledSmall>
          <StyledSmall onClick={() => handleMenuItem("/dashboard/my-profile")}>My Profile</StyledSmall>

          <Divider
            sx={{
              my: 1,
            }}
          />

          <StyledSmall
            onClick={() => {
              keycloak.logout();

              //toast.error("You Logout Successfully");
            }}
          >
            Sign Out
          </StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
