import {
  CameraAlt,
  Clear,
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
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, H3, H5, Span, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useFormik } from "formik";
import { getBussinessTypes } from "helpers/apifunctions";
import { getCountries, getStatesById } from "helpers/functions";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { StyledBadge, StyledChip, StyledInput } from "./StyledComponent";

const BussinessOverview = (props) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, next, bt, bc, postData, save } = props;
  const [pData, setToPData] = useState(postData);

  const subCategory = (code) => {
    for (let i = 0; i < bc.length; i++) {
      const s = bc[i].subcategories;
      for (let j = 0; j < s.length; j++) {
        if (s[j].code === code) {
          return s[j];
        }
      }
    }
  };

  const getSubCategory = (bcat) => {
    //console.log("bcat", bcat.subcategories);
    return bcat.subcategories;
  };
  const countries = getCountries();
  const states = (code) => {
    return getStatesById(code);
  };

  const selectedstate = (code) => {
    const cstates = getStatesById(data.rc);

    for (let i = 0; i < cstates.length; i++) {
      //console.log("code", cstates[i], code);
      if (cstates[i].isoCode === code) {
        //console.log(cstates[i]);
        return cstates[i];
      }
    }
  };
  const initialValues = {
    bTypes: bt.filter((v) => v.code == data.bTypes)[0],
    bCategory: bc.filter((v) => v.code == data.bCategory)[0],
    sCategory: subCategory(data.sCategory),
    bDescription: data.bDescription,
    rst1: data.rst1,
    rst2: data.rst2,
    rci: data.rci,
    rc: countries.filter((v) => v.isoCode == data.rc)[0],
    rs: selectedstate(data.rs),
    rp: data.rp,
    reo: false,
    ost1: data.ost1,
    ost2: data.ost2,
    oci: data.oci,
    oc: countries.filter((v) => v.isoCode == data.oc)[0],
    os: selectedstate(data.os),
    op: data.op,
  };
  const fieldValidationSchema = Yup.object().shape({
    bTypes: Yup.object().required("Bussiness Type is Required!"),
    bCategory: Yup.object().required("Bussiness Category is Required!"),
    sCategory: Yup.object().required("Sub Category is Required!"),
    bDescription: Yup.string().required("Bussiness Description is Required!"),
    rst1: Yup.string().required("Registered Street1 is Required"),
    rst2: Yup.string().required("Registered Street2 is Required"),
    rci: Yup.string().required("Registered City is Required"),
    rs: Yup.object().required("Registered State is Required"),
    rp: Yup.string().required("Registered Pincode is Required"),
    rc: Yup.object().required("Registered Country is Required"),
    ost1: Yup.string().required("Operational Street1 is Required"),
    ost2: Yup.string().required("Operational Street2 is Required"),
    oci: Yup.string().required("Operational City is Required"),
    os: Yup.object().required("Operational State is Required"),
    op: Yup.string().required("Operational Pincode is Required"),
    oc: Yup.object().required("Operational Country is Required"),
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
    enableReinitialize: true,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      // console.log("onSubmit", values);
      let data = pData;
      data.businessOverview.category = values.bCategory.code;
      data.businessOverview.subCategory = values.sCategory.code;
      data.businessOverview.addresses.registered.street1 = values.rst1;
      data.businessOverview.addresses.registered.street2 = values.rst2;
      data.businessOverview.addresses.registered.city = values.rci;
      data.businessOverview.addresses.registered.state = values.rs.isoCode;
      data.businessOverview.addresses.registered.postalCode = values.rp;
      data.businessOverview.addresses.registered.country = values.rc.isoCode;
      data.businessOverview.addresses.operation.street1 = values.ost1;
      data.businessOverview.addresses.operation.street2 = values.ost2;
      data.businessOverview.addresses.operation.city = values.oci;
      data.businessOverview.addresses.operation.state = values.os.isoCode;
      data.businessOverview.addresses.operation.postalCode = values.op;
      data.businessOverview.addresses.operation.country = values.oc.isoCode;
      data.businessOverview.description = values.bDescription;
      data.businessDetail.businessType = values.bTypes.code;
      setToPData(data);

      // console.log("pData", pData);
      save(data);
    },
  });

  if (values.reo) {
    values.ost1 = values.rst1;
    values.ost2 = values.rst2;
    values.oci = values.rci;
    values.oc = values.rc;
    values.os = values.rs;
    values.op = values.rp;
  }
  // console.log(values)

  const disableSubmit =
    Boolean(errors.bTypes) ||
    Boolean(errors.bCategory) ||
    Boolean(errors.sCategory) ||
    Boolean(errors.bDescription) ||
    Boolean(errors.rst1) ||
    Boolean(errors.rst2) ||
    Boolean(errors.rci) ||
    Boolean(errors.rs) ||
    Boolean(errors.rp) ||
    Boolean(errors.rc) ||
    Boolean(errors.ost1) ||
    Boolean(errors.ost2) ||
    Boolean(errors.oci) ||
    Boolean(errors.os) ||
    Boolean(errors.op) ||
    Boolean(errors.oc);

  return (
    <Card
      sx={{
        padding: "1.5rem",
        pb: "4rem",
      }}
    >
      <H1>{t("Business Overview")}</H1>
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
                {t("Business Type")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="bTypes"
                name="bTypes"
                value={values.bTypes}
                onChange={(e, value) => {
                  console.log(value ? value : "");
                  setFieldValue("bTypes", value ? value : "");
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                }}
                options={bt}
                autoHighlight
                getOptionLabel={(option) => option.description}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.description}
                  </Box>
                )}
                renderInput={(params) => (
                  <LightTextField
                    {...params}
                    label={t("Choose a Business Type")}
                    name="bTypes"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.bTypes && errors.bTypes)}
                    helperText={touched.bTypes && errors.bTypes}
                  />
                )}
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
                {t("Business Category")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="bCategory"
                name="bCategory"
                value={values.bCategory}
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue("bCategory", value);
                  setFieldValue("sCategory", "");
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                }}
                options={bc}
                autoHighlight
                getOptionLabel={(option) => option.description}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.description}
                  </Box>
                )}
                renderInput={(params) => (
                  <LightTextField
                    {...params}
                    label={t("Choose a Business Category")}
                    name="bCategory"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.bCategory && errors.bCategory)}
                    helperText={touched.bCategory && errors.bCategory}
                  />
                )}
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
                {t("Sub Category")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="sCategory"
                name="sCategory"
                value={values.sCategory}
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue("sCategory", value);
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                }}
                options={getSubCategory(values.bCategory)}
                autoHighlight
                getOptionLabel={(option) => option.description}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.description}
                  </Box>
                )}
                renderInput={(params) => (
                  <LightTextField
                    {...params}
                    label={t("Choose a Sub Category")}
                    name="sCategory"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.sCategory && errors.sCategory)}
                    helperText={touched.sCategory && errors.sCategory}
                  />
                )}
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
                {t("Business Description")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                multiline
                minRows={3}
                name="bDescription"
                label={t("Business Description")}
                value={values.bDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.bDescription && errors.bDescription}
                error={Boolean(touched.bDescription && errors.bDescription)}
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
                {t("Registered Address")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            &nbsp;
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
                {t("Street 1")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="rst1"
                label={t("Street 1")}
                value={values.rst1}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.rst1 && errors.rst1}
                error={Boolean(touched.rst1 && errors.rst1)}
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
                {t("Street 2")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="rst2"
                label={t("Street 2")}
                value={values.rst2}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.rst2 && errors.rst2}
                error={Boolean(touched.rst2 && errors.rst2)}
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
                {t("Pincode")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="rp"
                label={t("Pincode")}
                value={values.rp}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.rp && errors.rp}
                error={Boolean(touched.rp && errors.rp)}
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
                {t("City")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="rci"
                label={t("City")}
                value={values.rci}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.rci && errors.rci}
                error={Boolean(touched.rci && errors.rci)}
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
                {t("Country")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="rc"
                name="rc"
                value={values.rc}
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue("rc", value);
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                  mb: 2,
                }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <LightTextField
                    {...params}
                    label={t("Choose a Country")}
                    name="rc"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.rc && errors.rc)}
                    helperText={touched.rc && errors.rc}
                  />
                )}
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
                {t("State")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="rs"
                name="rs"
                value={values.rs}
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue("rs", value);
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                }}
                options={states(values.rc.isoCode)}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <LightTextField
                    {...params}
                    label={t("Choose a State")}
                    name="rs"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.rs && errors.rs)}
                    helperText={touched.rs && errors.rs}
                  />
                )}
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
                {t("Operational Address")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.reo}
                    onChange={handleChange}
                    name="reo"
                  />
                }
                label={t("Same as Registered Address")}
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
                {t("Street 1")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                disabled={values.reo}
                name="ost1"
                label={t("Street 1")}
                value={values.ost1}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.ost1 && errors.ost1}
                error={Boolean(touched.ost1 && errors.ost1)}
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
                {t("Street 2")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                disabled={values.reo}
                name="ost2"
                label={t("Street 2")}
                value={values.ost2}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.ost2 && errors.ost2}
                error={Boolean(touched.ost2 && errors.ost2)}
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
                {t("Pincode")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                disabled={values.reo}
                name="op"
                label={t("Pincode")}
                value={values.op}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.op && errors.op}
                error={Boolean(touched.op && errors.op)}
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
                {t("City")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                disabled={values.reo}
                name="oci"
                label={t("City")}
                value={values.oci}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.oci && errors.oci}
                error={Boolean(touched.oci && errors.oci)}
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
                {t("Country")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="oc"
                disabled={values.reo}
                name="oc"
                value={values.oc}
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue("oc", value);
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <LightTextField
                    {...params}
                    label={t("Choose a Country")}
                    name="oc"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.oc && errors.oc)}
                    helperText={touched.oc && errors.oc}
                  />
                )}
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
                {t("State")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="os"
                disabled={values.reo}
                value={values.os}
                name="os"
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue("os", value);
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                }}
                options={states(values.oc.isoCode)}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <LightTextField
                    {...params}
                    label={t("Choose a State")}
                    name="rs"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.os && errors.os)}
                    helperText={touched.os && errors.os}
                  />
                )}
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
              onClick={() => next("Business Details", pData)}
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
export default BussinessOverview;
