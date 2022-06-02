import FlexBox from "components/FlexBox";
import { Card } from "@mui/material";
import { H1, H3, Paragraph } from "components/Typography";
import { useTranslation } from "react-i18next";

const ConfirmAuth = () => {
  const { t } = useTranslation();

  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        margin: "9px",
      }}
    >
      <Card
        sx={{
          maxWidth: 850,
          boxShadow: 1,
          padding: 2,
          marginTop: "30px",
        }}
      >
        <H1>Check your mailbox</H1>
        <Paragraph sx={{ mt: 2 }}>{t("We've sent an email to you with a link to confirm your account.")}</Paragraph>
        <H3 sx={{ mt: 2 }}>{t("Didn't get the email?")}</H3>
        <Paragraph sx={{ mt: 2 }}>{t("If you don't see an email from us within 5 minutes, one of these things could have happened:")}</Paragraph>
        <Paragraph sx={{ mt: 2 }}>{t("1. The email might be in your spam folder. (If you use Gmail, please check your Promotions folder as well.)")}</Paragraph>
        <Paragraph sx={{ mt: 2 }}>{t("2. The email address you entered had a typo.")}</Paragraph>
        <Paragraph sx={{ mt: 2 }}>{t("3. You accidentally entered another email address. (Usually happens with auto-complete.)")}</Paragraph>
        <Paragraph sx={{ mt: 2 }}>{t("4. We can't deliver the email to this address. (Usually because of corporate firewalls or filtering.)")}</Paragraph>
      </Card>
    </FlexBox>
  );
};
export default ConfirmAuth;
