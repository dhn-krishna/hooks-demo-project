import { CameraAlt, Clear, ConstructionOutlined, Facebook, Instagram, SportsBasketball, Twitter } from "@mui/icons-material";
import { Autocomplete, Box, Button, Card, Divider, Grid, IconButton } from "@mui/material";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, H3, H4, H5, H6, Small, Span, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useFormik } from "formik";
import { uploadKybDocument, uploadKycDocument } from "helpers/apifunctions";
import KeyCloakData from "helpers/KeyCloakData";
import useAuth from "hooks/useAuth";
import ImageUploadIcon from "icons/ImageUploadIcon";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { StyledBadge, StyledChip, StyledInput } from "./StyledComponent";
import toast from "react-hot-toast";

const DocumentsVerification = (props) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, next, accountId } = props;
  const keycloak = KeyCloakData();
  const token = keycloak.token;
  console.log("DocumentsVerification", data);

  const options = [
    { code: "tin", description: "TIN" },
    { code: "gst", description: "GST" },
  ];

  const kycoptions = [
    { code: "passport", description: "Passport" },
    { code: "pan", description: "PAN" },
    { code: "nationalid", description: "National Id" },
  ];

  function kycdata() {
    let kucayy = [];
    let kycobj = {};
    for (let i = 0; i < data.kycInfo.length; i++) {
      console.log("kkk", data.kycInfo[i]);
      kycobj["name" + i] = data?.kycInfo[i]?.name || "";
      kycobj["ownerid" + i] = data?.kycInfo[i]?.ownerid || "";

      kycobj["id" + i] = data?.kycInfo[i]?.Id || "";
      kycobj["IdValue" + i] = data?.kycInfo[i]?.kycInfo?.idValue || "";
      kycobj["idType" + i] = kycoptions.filter((v) => v.code == data.kycInfo[i].kycInfo.idType) || "";
      kycobj["uploadUrl" + i] = data?.kycInfo[i]?.kycInfo?.uploadUrl || "";
      //kucayy.push(kycobj);
    }
    return kycobj;
  }

  const kybvalues = {
    bIdType: options.filter((v) => v.code == data?.kybInfo[0]?.idType)[0] || "",
    bIdValue: data?.kybInfo[0]?.idValue || "",
    bUrl: data?.kybInfo[0].uploadUrl || "",
    //bUrl: "",
  };
  const initialValues = {
    ...kybvalues,
    ...kycdata(),
  };

  console.log("initialValues", initialValues);
  const fieldValidationSchema = Yup.object().shape({
    bName: Yup.string().required("Beneficiary Name is Required!"),
    bCode: Yup.string().required("Branch IFSC Code is Required!"),
    acNo: Yup.string().required("Account Number is Required!"),
    bvn: Yup.string().required("Re-Entering the Account Number is Required!"),
  });
  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log("values", values.bUrl);
  const disableSubmit =
    Boolean(touched.bName && !errors.bName) &&
    Boolean(touched.bCode && !errors.bCode) &&
    Boolean(touched.acNo && !errors.acNo) &&
    Boolean(touched.bvn && !errors.bvn);

  return (
    <Card
      sx={{
        padding: "1.5rem",
        pb: "4rem",
      }}
    >
      <H1>{t("KYB & KYC Documents Upload")}</H1>
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
            <Grid item xs={24} sm={12} textAlign="right">
              <Divider />
            </Grid>
            <Grid item xs={24} sm={12} textAlign="center">
              <H5>{t("KYB Info")}</H5>
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
                {t("Business Type")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="bIdType"
                name="bIdType"
                value={values.bIdType}
                onChange={(e, value) => {
                  console.log(value ? value : "");
                  setFieldValue("bIdType", value ? value : "");
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                }}
                options={options}
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
                    label={t("Choose ID Type")}
                    name="bTypes"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.bIdType && errors.bIdType)}
                    helperText={touched.bIdType && errors.bIdType}
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
                {t("ID Value")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="bIdValue"
                label={t("ID Value")}
                value={values.bIdValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                helperText={touched.bIdValue && errors.bIdValue}
                error={Boolean(touched.bIdValue && errors.bIdValue)}
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
                {t("Upload KYB")} <Span sx={{ color: "red" }}>*</Span>
              </H5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor="uploadFile">
                <input
                  // value={values.bUrl}
                  defaultValue={values.bUrl}
                  type={values.bUrl ? "text" : "file"}
                  // type={"file"}
                  onChange={(event) => {
                    const files = event.target.files;
                    let myFiles = Array.from(files)[0];
                    let formData = new FormData();
                    if (myFiles) {
                      console.log("myFiles", myFiles);
                      formData.append("documentType", values.bIdType.code);
                      formData.append("documentValue", values.bIdValue);
                      formData.append("file", myFiles);
                      const upload = async (data) => {
                        try {
                          const response = await uploadKybDocument(accountId, token, data);
                          console.log("res", response);
                        } catch (err) {
                          console.log(err);
                          toast.error(t("Unable to upload the document, please try after sometime"));
                        }
                      };
                      upload(formData);
                    }
                    //setFieldValue("profile", myFiles);
                  }}
                  accept="image/*"
                  id="uploadFile"
                  name="file"
                  style={{
                    display: "none",
                  }}
                />
                <IconButton
                  disableRipple
                  component="span"
                  sx={{
                    padding: 0,
                    display: "block",
                  }}
                >
                  <Box
                    sx={{
                      minHeight: 40,
                      display: "flex",
                      borderRadius: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "divider",
                    }}
                  >
                    <ImageUploadIcon
                      sx={{
                        fontSize: 18,
                        marginRight: 0.5,
                        color: "text.disabled",
                      }}
                    />
                    <Small color="text.disabled">{values.bUrl ? values.bUrl : t("Choose a File")}</Small>
                  </Box>
                </IconButton>
              </label>
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
            <Grid item xs={24} sm={12} textAlign="center">
              <H5>{t("KYC Info")}</H5>
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
          {data.kycInfo.map((d) => {
            let IdValuekey = "IdValue" + d.id;
            let IdTypekey = "IdType" + d.id;
            let uploadUrlkey = "uploadUrl" + d.id;
            let namekey = "name" + d.id;
            let owneridkey = "ownerid" + d.id;
            //let formdata = "formdata" + d.id;
            return (
              <React.Fragment>
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
                    {values[namekey]}
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
                      {t("Document Type")} <Span sx={{ color: "red" }}>*</Span>
                    </H5>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      id={IdTypekey}
                      name={IdTypekey}
                      value={values[IdTypekey]}
                      onChange={(e, value) => {
                        console.log(value ? value : "");
                        setFieldValue(IdTypekey, value ? value : "");
                      }}
                      onBlur={handleBlur}
                      onFocus={handleBlur}
                      sx={{
                        mt: 2,
                      }}
                      options={kycoptions}
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
                          label={t("Choose ID Type")}
                          name="bTypes"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                          error={Boolean(touched.IdTypekey && errors.IdTypekey)}
                          helperText={touched.IdTypekey && errors.IdTypekey}
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
                      {t("ID Value")} <Span sx={{ color: "red" }}>*</Span>
                    </H5>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LightTextField
                      fullWidth
                      id={IdValuekey}
                      name={IdValuekey}
                      label={t("ID Value")}
                      value={values[IdValuekey]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleBlur}
                      helperText={touched.IdValuekey && errors.IdValuekey}
                      error={Boolean(touched.IdValuekey && errors.IdValuekey)}
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
                      {t("Upload KYC")} <Span sx={{ color: "red" }}>*</Span>
                    </H5>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label htmlFor={uploadUrlkey}>
                      <input
                        //  value={values[uploadUrlkey]}
                        defaultValue={values[uploadUrlkey]}
                        type={values[uploadUrlkey] ? "text" : "file"}
                        // type={"file"}
                        onChange={(event) => {
                          const files = event.target.files;
                          let myFiles = Array.from(files)[0];
                          let formData = new FormData();
                          if (myFiles) {
                            console.log("myFiles", myFiles);
                            formData.append("documentType", values[IdTypekey].code);
                            formData.append("documentValue", values[IdValuekey]);
                            formData.append("file", myFiles);
                            const uploadkyc = async (data) => {
                              try {
                                console.log("in uploadKycDocumentres");
                                const response = await uploadKycDocument(accountId, values[owneridkey], token, data);
                                console.log("res", response);
                              } catch (err) {
                                console.log(err);
                                toast.error(t("Unable to upload the document, please try after sometime"));
                              }
                            };
                            uploadkyc(formData);
                          }
                          setFieldValue("profile", myFiles);
                        }}
                        accept="image/*"
                        id={uploadUrlkey}
                        name={uploadUrlkey}
                        style={{
                          display: "none",
                        }}
                      />
                      <IconButton
                        disableRipple
                        component="span"
                        sx={{
                          padding: 0,
                          display: "block",
                        }}
                      >
                        <Box
                          sx={{
                            minHeight: 40,
                            display: "flex",
                            borderRadius: "8px",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "divider",
                          }}
                        >
                          <ImageUploadIcon
                            sx={{
                              fontSize: 18,
                              marginRight: 0.5,
                              color: "text.disabled",
                            }}
                          />
                          <Small color="text.disabled">{values[uploadUrlkey] ? values[uploadUrlkey] : t("Choose a File")}</Small>
                        </Box>
                      </IconButton>
                    </label>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>

        <FlexBox my="1.5rem" flexWrap="wrap" alignItems="center" justifyContent="flex-end">
          <FlexBox justifyContent="space-between" width={270}>
            <Button
              variant="outlined"
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
              disabled={disableSubmit}
              onClick={next}
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
export default DocumentsVerification;
