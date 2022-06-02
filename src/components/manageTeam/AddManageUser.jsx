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
  top: "40%",
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

const AddManageUser = (props) => {
  const { t } = useTranslation();

  const { open, onClose, edit,update, data, save } = props;

  // console.log("datauser", data, countries);
  const initialValues = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    password: data?.password || "",
    role: data?.role || "",
    
  };
  const fieldValidationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "Too Short").required("firstName is Required!"),
    lastName: Yup.string().required("lastName is Required!"),
    email: Yup.string().required("Email is Required!"),
    password: Yup.string().required("password is Required!"),
    role: Yup.string().required("role is Required!"),
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
      if(edit){
        update(data.userId,values)
      }else{
        save(values)
      }
      onClose()
    },
  });
  const disableSubmit =
    Boolean(errors.firstName) ||
    Boolean(errors.lastName) ||
    Boolean(errors.email) ||
    Boolean(errors.password) ||
    Boolean(errors.role);
  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalCard
        sx={{ marginTop: 15, minHeight: "60%", maxHeight: "100%" }}
      >
        <H2 mb={2}>
          {edit ? "Edit User" : "Add new User"}
        </H2>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className="main-form">
            <Grid item xs={12}>
              <H6 mb={1}>First Name</H6>
              <DarkTextField
                name="firstName"
                placeholder="firstName"
                onChange={handleChange}
                value={values.firstName}
                error={Boolean(errors.firstName && touched.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Last Name</H6>
              <DarkTextField
                name="lastName"
                placeholder="lastName"
                onChange={handleChange}
                value={values.lastName}
                error={Boolean(errors.lastName && touched.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Email</H6>
              <DarkTextField
                name="email"
                placeholder="Enter Your Email..."
                onChange={handleChange}
                value={values.email}
                error={Boolean(errors.email && touched.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>Password</H6>
              <DarkTextField
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={values.password}
                error={Boolean(errors.password && touched.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>Role</H6>
              <DarkTextField
                name="role"
                placeholder="role"
                onChange={handleChange}
                value={values.role}
                error={Boolean(errors.role && touched.role)}
                helperText={touched.role && errors.role}
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

export default AddManageUser;
