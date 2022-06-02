import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  styled,
} from "@mui/material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import ImageUploadIcon from "icons/ImageUploadIcon";
import toast from "react-hot-toast";
import axiosInstance from "utils/axios";
import * as Yup from "yup"; // component props interface
import { getCountries, getStatesById } from "helpers/functions";
import LightTextField from "components/LightTextField";
import { useTranslation } from "react-i18next";
import { useState } from "react";

// styled components
const StyledModalCard = styled(Card)(({ theme }) => ({
  top: "30%",
  bottom: "10%",
  left: "50%",
  maxWidth: 400,
  minWidth: 300,
  position: "absolute",
  padding: "1.5rem",
  boxShadow: theme.shadows[2],
  overflow: "scroll",
  transform: "translate(-50%, -50%)",
  width: "100%",
  [theme.breakpoints.down(325)]: {
    maxWidth: "100%",
  },
}));

const AddBusinessOwner = (props) => {
  const { t } = useTranslation();

  const { open, onClose, edit, data, postData, save } = props;
  const [pData, setToPData] = useState(postData);

  const selectedstate = (code) => {
    const cstates = getStatesById(data?.address?.country);

    for (let i = 0; i < cstates.length; i++) {
      //console.log("code", cstates[i], code);
      if (cstates[i].isoCode === code) {
        //console.log(cstates[i]);
        return cstates[i];
      }
    }
  };
  const countries = getCountries();
  const states = (code) => {
    return getStatesById(code);
  };
  // console.log("datauser", data, countries);
  const initialValues = {
    name: data?.name || "",
    phone: data?.phone || "",
    email: data?.email || "",
    street1: data?.address?.street1 || "",
    street2: data?.address?.street2 || "",
    city: data?.address?.city || "",
    country:
      countries.filter((v) => v.isoCode == data?.address?.country)[0] || "",
    state: selectedstate(data?.address?.state) || "",
    postalCode: data?.address?.postalCode || "",
  };
  const fieldValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short").required("Name is Required!"),
    phone: Yup.string().required("Phone is Required!"),
    email: Yup.string().required("Email is Required!"),
    street1: Yup.string().required("Street1 is Required!"),
    street2: Yup.string().required("Street2 is Required!"),
    city: Yup.string().required("City is Required!"),
    postalCode: Yup.string().required("Postal Code is Required!"),
    country: Yup.object().required("Country code is Required"),
    state: Yup.object().required("State is Required"),
  });
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
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

      const newowner = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: {
          street1: values.street1,
          street2: values.street2,
          city: values.city,
          state: values.state.isoCode,
          country: values.country.isoCode,
          postalCode: values.postalCode,
        },
      };

      data.businessOwners.push(newowner);

      setToPData(data);
      save(data);
      console.log("Addownerdata", pData);
      onClose()
    },
  });
  const disableSubmit =
    Boolean(errors.name) ||
    Boolean(errors.email) ||
    Boolean(errors.phone) ||
    Boolean(errors.street1) ||
    Boolean(errors.street2) ||
    Boolean(errors.city) ||
    Boolean(errors.state) ||
    Boolean(errors.country) ||
    Boolean(errors.postalCode);
  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalCard
        sx={{ marginTop: 15, minHeight: "90%", maxHeight: "100%" }}
      >
        <H2 mb={2}>
          {edit ? "Edit Business Owner" : "Add new Business Owner"}
        </H2>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className="main-form">
            <Grid item xs={12}>
              <H6 mb={1}>Name</H6>
              <DarkTextField
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={values.name}
                error={Boolean(errors.name && touched.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Phone</H6>
              <DarkTextField
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={values.phone}
                error={Boolean(errors.phone && touched.phone)}
                helperText={touched.phone && errors.phone}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Email</H6>
              <DarkTextField
                name="email"
                placeholder="uilib@gmail.com"
                onChange={handleChange}
                value={values.email}
                error={Boolean(errors.email && touched.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>Street1</H6>
              <DarkTextField
                name="street1"
                placeholder="Street1"
                onChange={handleChange}
                value={values.street1}
                error={Boolean(errors.street1 && touched.street1)}
                helperText={touched.street1 && errors.street1}
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>Street2</H6>
              <DarkTextField
                name="street2"
                placeholder="Street2"
                onChange={handleChange}
                value={values.street2}
                error={Boolean(errors.street2 && touched.street2)}
                helperText={touched.street2 && errors.street2}
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>City</H6>
              <DarkTextField
                name="city"
                placeholder="city"
                onChange={handleChange}
                value={values.city}
                error={Boolean(errors.city && touched.city)}
                helperText={touched.city && errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>Postal Code</H6>
              <DarkTextField
                name="postalCode"
                placeholder="Postal Code"
                onChange={handleChange}
                value={values.postalCode}
                error={Boolean(errors.postalCode && touched.postalCode)}
                helperText={touched.postalCode && errors.postalCode}
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>Country</H6>
              <Autocomplete
                id="country"
                name="country"
                value={values.country}
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue("country", value);
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                  mb: 2,
                }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.name || ""}
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
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>State</H6>
              <Autocomplete
                id="state"
                name="state"
                value={values.state}
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue("state", value);
                }}
                onBlur={handleBlur}
                onFocus={handleBlur}
                sx={{
                  mt: 2,
                }}
                options={states(values.country.isoCode)}
                autoHighlight
                getOptionLabel={(option) => option.name || ""}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <LightTextField
                    {...params}
                    label={t("Choose a State")}
                    name="state"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                )}
              />
            </Grid>
          </Grid>
          <FlexBox justifyContent="flex-end" marginTop={4}>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={onClose}
              sx={{
                width: 124,
                fontSize: 12,
                marginRight: 2,
                color: "text.disabled",
                borderColor: "text.disabled",
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              size="small"
              type="submit"
              disabled={disableSubmit}
              variant="contained"
              sx={{
                width: 124,
                fontSize: 12,
              }}
            >
              Save
            </Button>
          </FlexBox>
        </form>
      </StyledModalCard>
    </Modal>
  );
};

export default AddBusinessOwner;
