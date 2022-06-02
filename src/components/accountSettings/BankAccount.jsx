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

const BankAccount = (props) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, next, postData, save } = props;
  const [pData, setToPData] = useState(postData);

  console.log("BankAccount", data);
  const initialValues = {
    // bId:data?.data?.bId || "",
    bankId: data?.data[0]?.bankId || "",
    bName: data?.data[0]?.bankName || "",
    bCode: data?.data[0]?.bankCode || "",
    acNo: data?.data[0]?.accountNumber || "",
    bvn: data?.data[0]?.bvn || "",
    // acId:data?.data?.acId || "",
    // mId:data?.data?.mId || "",
    // cAt:data?.data?.cAt || ""
  };

  const fieldValidationSchema = Yup.object().shape({
    // bId: Yup.string().required("Bank Id is Required!"),
    bName: Yup.string().required("Beneficiary Name is Required!"),
    bCode: Yup.string().required("Branch IFSC Code is Required!"),
    acNo: Yup.string().required("Account Number is Required!"),
    bvn: Yup.string().required("Re-Entering the Account Number is Required!"),
    // acId: Yup.string().required("Re-Entering the Account Number is Required!"),
    // mId: Yup.string().required("Re-Entering the Account Number is Required!"),
    // cAt: Yup.string().required("Re-Entering the Account Number is Required!"),
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
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      let data = pData;
      data.bankId = values.bankId;
      data.bankName = values.bName;
      data.accountNumber = values.acNo;
      data.bvn = values.bvn;
      data.bankCode = values.bCode;
      console.log("onSubmit", data);
      setToPData(data);
      save(data);
    },
  });
  const disableSubmit =
    Boolean(errors.bName) ||
    Boolean(errors.bCode) ||
    Boolean(errors.acNo) ||
    Boolean(errors.bvn);

  return (
    <Card
      sx={{
        padding: "1.5rem",
        pb: "4rem",
      }}
    >
      <H1>{t("Personal Bank Account")}</H1>
      <H3>{t("Enter your personal bank account details")}</H3>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
              mt: 2,
            }}
          >
            <Grid item xs={6} sm={3} textAlign="right">
              <H5>
                {t("Bank Name")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="bName"
                label={t("Bank Name")}
                value={values.bName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.bName && errors.bName}
                error={Boolean(touched.bName && errors.bName)}
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
                {t("Bank Code")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="bCode"
                label={t("Bank Code")}
                value={values.bCode}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.bCode && errors.bCode}
                error={Boolean(touched.bCode && errors.bCode)}
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
                {t("Account Number")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="acNo"
                label={t("Account Number")}
                value={values.acNo}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.acNo && errors.acNo}
                error={Boolean(touched.acNo && errors.acNo)}
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
                {t("BVN")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="bvn"
                label={t("BVN")}
                value={values.bvn}
                onChange={handleChange}
                onFocus={handleBlur}
                helperText={touched.bvn && errors.bvn}
                error={Boolean(touched.bvn && errors.bvn)}
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
              onClick={() => next("Documents Verification", pData)}
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
export default BankAccount;
