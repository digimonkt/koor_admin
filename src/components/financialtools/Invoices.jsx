import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
// import { SVG } from "@assets/svg";
import { styled } from "@mui/material/styles";
// import dayjs from "dayjs";
// import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, FormLabel } from "@mui/material";
import SelectDropDown from "./SelectDropDown";
import CustomTable from "./table";
import { USER_COLUMN_DATA } from "./table/data";
import { getInvoiceListApi } from "@api/manageoptions";
import {
  transformEmployerData,
  transformInvoiceList,
} from "@api/transform/choices";
import { manageEmployer } from "@api/employers";
const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily: "Poppins",
  color: "#121212",
  fontSize: "16px",
  fontWeight: "300",
  marginBottom: 10,
  display: "block",
}));

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

const Invoices = () => {
  const [listInvoice, setListInvoice] = useState([]);
  const [employerId, setEmployerId] = useState([]);
  const [contentId, setContentId] = useState("");
  console.log({ contentId });
  // const [datePickerValue, setDatePickerValue] = React.useState(
  //   dayjs("2022-12-06")
  // );
  // const [todatePickerValue, setToDatePickerValue] = React.useState(
  //   dayjs("2022-12-06")
  // );

  // const [invoisedatePickerValue, setInvoiseDatePickerValue] = React.useState(
  //   dayjs("2022-04-07")
  // );
  // const [todatePickerValue2, setToDatePickerValue2] = React.useState(
  //   dayjs("2022-04-07")
  // );

  const numberID = [
    { title: "Number / ID", id: 1, value: "" },
    { title: "1", id: 2, value: "2" },
    { title: "2", id: 3, value: "3" },
    { title: "3", id: 4, value: "4" },
    { title: "4", id: 5, value: "5" },
    { title: "5", id: 6, value: "6" },
  ];

  const sentID = [
    { title: "All", id: 1, value: "" },
    { title: "1", id: 2, value: "2" },
    { title: "2", id: 3, value: "3" },
    { title: "3", id: 4, value: "4" },
    { title: "4", id: 5, value: "5" },
    { title: "5", id: 6, value: "6" },
  ];

  // const EmployerClient = [
  //   {
  //     id: 1,
  //     title: "All",
  //     value: "",
  //   },
  //   {
  //     id: 2,
  //     title: "Employer/client",
  //     value: "1",
  //   },
  // ];

  const invoiceList = async () => {
    const limit = 10;
    const page = 1;
    const invoiceId = contentId;
    const employer = contentId;
    const sent = true;
    const response = await getInvoiceListApi({
      limit,
      page,
      invoiceId,
      employer,
      sent,
    });
    if (response.remote === "success") {
      const formateData = transformInvoiceList(response.data.results);
      setListInvoice(formateData);
    } else {
      console.log(response.error);
    }
  };

  const getEmployerList = async () => {
    const limit = 1000000;
    const response = await manageEmployer({ limit });
    if (response.remote === "success") {
      const formateData = transformEmployerData(response.data.results);
      setEmployerId(formateData);
    }
  };
  useEffect(() => {
    getEmployerList();
  }, []);
  useEffect(() => {
    invoiceList();
  }, [contentId]);
  return (
    <>
      <div className={`${styles.packageManagement}`}>
        <h3>Invoices </h3>
        <Grid container spacing={2.5}>
          <Grid item lg={6} xs={12}>
            <FormLabel>Invoice date from</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DatePiker
                components={{
                  OpenPickerIcon: SVG.CalendarIcon,
                }}
                value={invoisedatePickerValue}
                onChange={(newValue) => setInvoiseDatePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              /> */}
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Select Date" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item lg={6} xs={12}>
            <FormLabel>To date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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

          <Grid item lg={4} xs={12}>
            <StyledFormLabel>Number / ID</StyledFormLabel>
            <SelectDropDown padding="11px 15px" content={numberID} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <StyledFormLabel>Employer / client</StyledFormLabel>
            <SelectDropDown
              padding="11px 15px"
              content={employerId}
              setContentId={setContentId}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <StyledFormLabel>Sent?</StyledFormLabel>
            <SelectDropDown padding="11px 15px" content={sentID} />
          </Grid>
          <Grid item lg={12} xs={12}>
            <CustomTable
              rows={listInvoice}
              columns={USER_COLUMN_DATA}
              radius="7px"
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Invoices;
