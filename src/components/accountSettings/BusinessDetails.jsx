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
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, H3, H5, Span, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { StyledBadge, StyledChip, StyledInput } from "./StyledComponent";

const BusinessDetails = (props) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { next, data,postData,save } = props;
  const [pData,setToPData] = useState(postData)

  const initialValues = {
    lbName: data.lbName,
    cfbName: data.cfbName,
    wp: data.apps ? "with":"without",
    // wname: data?.apps?.websites[0]?.name || "",
    wurl: data?.apps?.websites[0] || "",
    aname: data?.apps?.android[0]?.name || "",
    aurl: data?.apps?.android[0]?.url || "",
    iname: data?.apps?.ios[0]?.name || "",
    iurl: data?.apps?.ios[0]?.url || "",
  };

  const fieldValidationSchema = Yup.object().shape({
    lbName: Yup.string().required("Legal Business Name is Required!"),
    cfbName: Yup.string().required(
      "Customer Facing Business Name is Required!"
    ),
    // wp: Yup.string().required("Customer Facing Business Name is Required!"),
  });
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    enableReinitialize: true,
    validateOnMount:true,
    validateOnChange:true,
    validateOnBlur:true,
    onSubmit: (values) => {
      
      let data=pData
      data.businessDetail.legalBusinessName = values.lbName
      data.businessDetail.customerFacingBusinessName = values.cfbName
      // data.businessDetail.apps.websites[0].name = values.wname
      data.businessDetail.apps.websites[0] = values.wurl
      data.businessDetail.apps.android[0].name = values.aname
      data.businessDetail.apps.android[0].url = values.aurl
      data.businessDetail.apps.ios[0].name = values.iname
      data.businessDetail.apps.ios[0].url = values.iurl
      setToPData(data)
      save(data)
    },
  });
  // console.log(data.apps);
  // console.log(values.wp);
  // console.log(data?.apps?.android[0]?.name,values.wname)

  const disableSubmit =
    Boolean(errors.lbName) ||
    Boolean(errors.cfbName);
  return (
    <Card
      sx={{
        padding: "1.5rem",
        pb: "4rem",
      }}
    >
      <H1>{t("Business Details")}</H1>
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
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Legal Business Name")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="lbName"
                label={t("Legal Business Name")}
                value={values.lbName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.lbName && errors.lbName}
                error={Boolean(touched.lbName && errors.lbName)}
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
                {t("Customer Facing Business Name")}{" "}
                <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="cfbName"
                label={t("Customer Facing Business Name")}
                value={values.cfbName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.cfbName && errors.cfbName}
                error={Boolean(touched.cfbName && errors.cfbName)}
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
                {t("How do you wish to accept payments")}{" "}
                <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioGroup
                row
                name="wp"
                id="wp"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.wp}
                helperText={touched.wp && errors.wp}
                error={Boolean(touched.wp && errors.wp)}
              >
                <FormControlLabel
                  value="without"
                  control={<Radio />}
                  label={t("Without website/app")}
                />
                <FormControlLabel
                  value="with"
                  control={<Radio />}
                  label={t("On my website/app")}
                />
              </RadioGroup>
            </Grid>
          </Grid>

          {values.wp === "with" && (
            <Fragment>
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
                  <H5>{t("Websites")}</H5>
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
                    {t("URL")} <Span sx={{ color: "red" }}>*</Span>
                  </H5>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LightTextField
                    fullWidth
                    name="wurl"
                    label={t("URL")}
                    value={values.wurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    helperText={touched.wurl && errors.wurl}
                    error={Boolean(touched.wurl && errors.wurl)}
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
                  {/* <H5>
                    {t("Name")} <Span sx={{ color: "red" }}>*</Span>
                  </H5> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <LightTextField
                    fullWidth
                    name="wname"
                    label={t("Name")}
                    value={values.wname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    helperText={touched.wname && errors.wname}
                    error={Boolean(touched.wname && errors.wname)}
                  /> */}
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
                  <H5>{t("Android")}</H5>
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
                    {t("URL")} <Span sx={{ color: "red" }}>*</Span>
                  </H5>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LightTextField
                    fullWidth
                    name="aurl"
                    label={t("URL")}
                    value={values.aurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    helperText={touched.aurl && errors.aurl}
                    error={Boolean(touched.aurl && errors.aurl)}
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
                    {t("Name")} <Span sx={{ color: "red" }}>*</Span>
                  </H5>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LightTextField
                    fullWidth
                    name="aname"
                    label={t("Name")}
                    value={values.aname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    helperText={touched.aname && errors.aname}
                    error={Boolean(touched.aname && errors.aname)}
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
                  <H5>{t("IOS")}</H5>
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
                    {t("URL")} <Span sx={{ color: "red" }}>*</Span>
                  </H5>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LightTextField
                    fullWidth
                    name="iurl"
                    label={t("URL")}
                    value={values.iurl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    helperText={touched.iurl && errors.iurl}
                    error={Boolean(touched.iurl && errors.iurl)}
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
                    {t("Name")} <Span sx={{ color: "red" }}>*</Span>
                  </H5>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LightTextField
                    fullWidth
                    name="iname"
                    label={t("Name")}
                    value={values.iname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    helperText={touched.iname && errors.iname}
                    error={Boolean(touched.iname && errors.iname)}
                  />
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Grid>

        <FlexBox
          my="1.5rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FlexBox justifyContent="space-between" width={270}>
            <Button
              variant="outlined"
              type="submit"
              sx={{
                width: 100,
                color: "text.disabled",
                borderColor: "text.disabled",
              }}
              fullWidth
              disabled={disableSubmit}
            >
              {/* {t("Cancel")} */}
              {t("Save")}
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={()=>{
                next("Business Owners",pData)
                // setTimeout(()=>{
                //   console.log("timeout",pData)
                //   next("Business Owners",pData)
                // },1000)
              }}
              disabled={disableSubmit}
              sx={{
                width: 200,
                ml: 2,
              }}
            >
              {t("Save & Next")}
            </Button>
          </FlexBox>
        </FlexBox>
      </form>
    </Card>
  );
};
export default BusinessDetails;
