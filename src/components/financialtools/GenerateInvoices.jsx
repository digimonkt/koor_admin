import { Grid, FormLabel } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
// !! import { styled } from "@mui/material/styles";
// !! import dayjs from "dayjs";
// !! import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// !! import { SVG } from "@assets/svg";
import SelectDropDown from "./SelectDropDown";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// !! const StyledFormLabel = styled(FormLabel)(() => ({
//  !! fontFamily: "Poppins",
//  !! color: "#121212",
//  !! fontSize: "16px",
//  !! fontWeight: "300",
//  !! marginBottom: 10,
//  !! display: "block",
// !! }));

// const StyledDatePiker = styled()(() => ({
//   "&.MuiFormControl-root": {
//     width: "100%",
//   },
//   ".MuiInputBase-root": {
//     fontFamily: "Poppins",
//     color: "#121212",
//     fontSize: "16px",
//     fontWeight: "300",
//     background: "#F0F0F0",
//     borderRadius: "10px",
//     height: "46px",
//   },
//   "& fieldset": {
//     display: "none",
//   },
// }));

const GenenateInvoices = () => {
  // const [datePickerValue, setDatePickerValue] = React.useState(
  //   dayjs("2022-04-07")
  // );
  // const [todatePickerValue, setToDatePickerValue] = React.useState(
  //   dayjs("2022-04-07")
  // );
  const paymentTerm = [
    {
      id: 1,
      title: "Due to receipt",
      value: "0",
    },
    {
      id: 2,
      title: "Complate to receipt",
      value: "1",
    },
  ];
  const EmployerClient = [
    {
      id: 1,
      title: "All",
      value: "",
    },
    {
      id: 2,
      title: "Employer/client",
      value: "1",
    },
  ];
  const invoiceList = [
    {
      title: "Ad services",
      id: 1,
      value: "",
    },
    {
      title: "Ad services",
      id: 2,
      value: "1",
    },
  ];
  return (
    <>
      <div className={`${styles.packageManagement}`}>
        <h3>Generate PDF invoices </h3>
        <Grid container spacing={2.5}>
          <Grid item lg={6} xs={12}>
            {/* <StyledFormLabel>From date</StyledFormLabel> */}

            <FormLabel>From date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Select Date" />
              </DemoContainer>
              {/* <DateCalendar /> */}
              {/* <StyledDatePiker
                components={{
                  OpenPickerIcon: SVG.CalendarIcon,
                }}
                value={datePickerValue}
                onChange={(newValue) => setDatePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </LocalizationProvider>
          </Grid>
          <Grid item lg={6} xs={12}>
            {/* <StyledFormLabel>To date</StyledFormLabel> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DateCalendar /> */}
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Select Date" />
              </DemoContainer>
              {/* <StyledDatePiker
                components={{
                  OpenPickerIcon: SVG.CalendarIcon,
                }}
                value={todatePickerValue}
                onChange={(newValue) => setToDatePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </LocalizationProvider>
          </Grid>
          <Grid item lg={6} xs={12}>
            {/* <StyledFormLabel>Payment term</StyledFormLabel> */}
            <FormLabel>Payment term</FormLabel>
            <SelectDropDown padding="11px 15px" content={paymentTerm} />
          </Grid>
          <Grid item lg={6} xs={12}>
            {/* <StyledFormLabel>Employer Client</StyledFormLabel> */}
            <h5>Employer Client</h5>
            <SelectDropDown padding="11px 15px" content={EmployerClient} />
          </Grid>
          <Grid item lg={12} xs={12}>
            {/* <StyledFormLabel>Category of invoice</StyledFormLabel> */}
            <FormLabel>Category of invoice</FormLabel>
            <SelectDropDown padding="11px 15px" content={invoiceList} />
          </Grid>
          <Grid item lg={12} xs={12}>
            {/* <StyledFormLabel>Comment</StyledFormLabel> */}
            <FormLabel>Comment</FormLabel>
            <textarea
              className={`${styles.textarea}`}
              placeholder="Write your comment"
            ></textarea>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default GenenateInvoices;
