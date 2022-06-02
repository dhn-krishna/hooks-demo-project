import {
  CameraAlt,
  Clear,
  ConstructionOutlined,
  Facebook,
  Instagram,
  SportsBasketball,
  Twitter,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, H3, H5, Span, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { StyledBadge, StyledChip, StyledInput } from "./StyledComponent";

const UserInfo = (props) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, postData, save } = props;
  const [pData, setToPData] = useState(postData);

  const initialValues = {
    cemail: data.cemail,
    cphone: data.cphone,
    cpolicy: data.cpolicy,
    remail: data.remail,
    rphone: data.rphone,
    rpolicy: data.rpolicy,
    semail: data.semail,
    sphone: data.sphone,
    spolicy: data.spolicy,
  };
  const fieldValidationSchema = Yup.object().shape({
    cemail: Yup.string().required("Name is Required!"),
    cphone: Yup.string().required("Phone is Required!"),
    cpolicy: Yup.string().required("Policy Url is Required!"),
    remail: Yup.string().required("Name is Required!"),
    rphone: Yup.string().required("Phone is Required!"),
    rpolicy: Yup.string().required("Policy Url is Required!"),
    semail: Yup.string().required("Name is Required!"),
    sphone: Yup.string().required("Phone is Required!"),
    spolicy: Yup.string().required("Policy Url is Required!"),
  });
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: fieldValidationSchema,
      enableReinitialize: true,
      validateOnMount: true,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: (values) => {
        // console.log(values);
        let data = pData;
        data.contactInfo.chargeback.email = values.cemail;
        data.contactInfo.chargeback.phone = values.cphone;
        data.contactInfo.chargeback.policyUrl = values.cpolicy;
        data.contactInfo.refund.email= values.remail;
        data.contactInfo.refund.phone = values.rphone;
        data.contactInfo.refund.policyUrl = values.rpolicy;
        data.contactInfo.support.email = values.semail;
        data.contactInfo.support.phone = values.sphone;
        data.contactInfo.support.policyUrl = values.spolicy;
        setToPData(data);
        save(data);
      },
    });

  const disableSubmit =
    Boolean(errors.cemail) ||
    Boolean(errors.cphone) ||
    Boolean(errors.cpolicy) ||
    Boolean(errors.remail) ||
    Boolean(errors.rphone) ||
    Boolean(errors.rpolicy) ||
    Boolean(errors.semail) ||
    Boolean(errors.sphone) ||
    Boolean(errors.spolicy);

  return (
    <Card
      sx={{
        padding: "1.5rem",
        pb: "4rem",
      }}
    >
      <H1>{t("Contact Info")}</H1>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={24} sm={12} textAlign="center">
              <H5>{t("Charge Back")}</H5>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={24} sm={12} textAlign="right">
              <Divider />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Email")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="cemail"
                label={t("Email")}
                value={values.cemail}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.cemail && errors.cemail}
                error={Boolean(touched.cemail && errors.cemail)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Phone")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="cphone"
                label={t("Phone")}
                value={values.cphone}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.cphone && errors.cphone}
                error={Boolean(touched.cphone && errors.cphone)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Policy URL")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="cpolicy"
                label={t("Policy URL")}
                value={values.cpolicy}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.cpolicy && errors.cpolicy}
                error={Boolean(touched.cpolicy && errors.cpolicy)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
              mt: 1,
            }}
          >
            <Grid item xs={24} sm={12} textAlign="center">
              <H5>{t("Refund")}</H5>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={24} sm={12} textAlign="right">
              <Divider />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Email")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="remail"
                label={t("Email")}
                value={values.remail}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.remail && errors.remail}
                error={Boolean(touched.remail && errors.remail)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Phone")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="rphone"
                label={t("Phone")}
                value={values.rphone}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.rphone && errors.rphone}
                error={Boolean(touched.rphone && errors.rphone)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Policy URL")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="rpolicy"
                label={t("Policy URL")}
                value={values.rpolicy}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.rpolicy && errors.rpolicy}
                error={Boolean(touched.rpolicy && errors.rpolicy)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={24} sm={12} textAlign="center">
              <H5>{t("Support")}</H5>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={24} sm={12} textAlign="right">
              <Divider />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Email")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="semail"
                label={t("Email")}
                value={values.semail}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.semail && errors.semail}
                error={Boolean(touched.semail && errors.semail)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Phone")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="sphone"
                label={t("Phone")}
                value={values.sphone}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.sphone && errors.sphone}
                error={Boolean(touched.sphone && errors.sphone)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Policy URL")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="spolicy"
                label={t("Policy URL")}
                value={values.spolicy}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.spolicy && errors.spolicy}
                error={Boolean(touched.spolicy && errors.spolicy)}
              />
            </Grid>
          </Grid>
        </Grid>

        <FlexBox
          my="1.5rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FlexBox justifyContent="space-between" width={270}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={disableSubmit}
              sx={{
                width: 200,
                ml: 2,
              }}
            >
              {t("Submit")}
            </Button>
          </FlexBox>
        </FlexBox>
      </form>
    </Card>
  );
};

export default UserInfo;
