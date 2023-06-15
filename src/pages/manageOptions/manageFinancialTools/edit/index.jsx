import {
  Button,
  Card,
  CardContent,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { SVG } from "@assets/svg";
import Cbutton from "@components/button/cButton";
import styles from "@components/financialtools/styles.module.css";
import { styled } from "@mui/material/styles";
// import dayjs from "dayjs";
// import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectDropDown from "@components/financialtools/SelectDropDown";
import { Box } from "@mui/system";
import CustomTable from "@components/financialtools/table";
import {
  INVOICES_ITEMS_COLUMNS,
  INVOICES_ITEMS_ROW,
} from "../../../components/financialtools/table/data";
import EditUploadFile from "./EditUploadFile";
const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily: "Poppins",
  color: "#121212",
  fontSize: "16px",
  fontWeight: "300",
  marginBottom: 10,
  display: "block",
}));
const StyledButton = styled(Button)(() => ({
  fontFamily: "Bahnschrift",
  color: "#274593",
  fontSize: "16px",
  fontWeight: "600",
  borderRadius: "73px",
  marginTop: "10px",
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

const EditInvoice = () => {
  // const [datePickerValue, setDatePickerValue] = React.useState(
  //   dayjs("2022-04-07")
  // );
  const employerClient = [
    {
      id: 1,
      title: "Ocean Telecom",
      value: "",
    },
    {
      id: 2,
      title: "Ocean Telecom",
      value: "1",
    },
  ];

  const numberId = [
    { id: 1, title: "117082", value: "" },
    { id: 2, title: "117083", value: "1" },
    { id: 3, title: "117084", value: "2" },
    { id: 4, title: "117085", value: "3" },
    { id: 5, title: "117086", value: "4" },
  ];

  const paymentTerm = [
    { id: 1, title: "5 days", value: "" },
    { id: 2, title: "10 days", value: "1" },
    { id: 3, title: "15 days", value: "2" },
  ];
  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              p: {
                xs: 2,
                sm: 1,
                md: 3.75,
                lg: 3.75,
                xl: 3.75,
              },
            },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={{ xs: "start", sm: "center" }}
            justifyContent={{ xs: "flex-start", sm: "space-between" }}
            className={`${styles.title}`}
            sx={{
              mb: {
                xs: 1,
                sm: 1,
                md: 5.75,
                lg: 5.75,
                xl: 5.75,
              },
            }}
          >
            <Stack direction="row" spacing={2}>
              <IconButton LinkComponent={Link} to="/financial-tools">
                <SVG.ArrowLeftIcon />
              </IconButton>{" "}
              <h2>Edit invoice – ID 117082</h2>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Cbutton
                color="#274593"
                bordercolor="#274593"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                padding="7px 30px 7px 20px"
              >
                <span className="d-inline-flex me-2">
                  <SVG.ForwardIcon />
                </span>
                Send
              </Cbutton>
            </Stack>
          </Stack>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Employer / client</StyledFormLabel>
              <SelectDropDown padding="11px 15px" content={employerClient} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Invoice date</StyledFormLabel>
              {/* <LocalizationProvider dateAdapter={""}>
                <StyledDatePiker
                  components={{
                    OpenPickerIcon: SVG.CalendarIcon,
                  }}
                  value={datePickerValue}
                  onChange={(newValue) => setDatePickerValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider> */}
            </Grid>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Number / ID</StyledFormLabel>
              <SelectDropDown padding="11px 15px" content={numberId} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Payment term</StyledFormLabel>
              <SelectDropDown padding="11px 15px" content={paymentTerm} />
            </Grid>
            <Grid item lg={12} xs={12}>
              <StyledFormLabel>Comment</StyledFormLabel>
              <textarea
                className={`${styles.textarea}`}
                placeholder="Write your comment

"
              ></textarea>
            </Grid>
          </Grid>
          <Divider sx={{ my: 5, borderColor: "#CACACA" }} />
          <Box
            className={`${styles.invoiceTerms}`}
            sx={{ mb: { xs: 2, lg: 6.25 } }}
          >
            <h5>Invoice items</h5>
            <CustomTable
              rows={INVOICES_ITEMS_ROW}
              columns={INVOICES_ITEMS_COLUMNS}
              radius="7px 7px 0px 0px"
            />
            <StyledButton variant="link">
              <span className="me-2 d-inline-flex">
                <SVG.AddCircleIcon />
              </span>
              Add Item
            </StyledButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Stamp</StyledFormLabel>
              <EditUploadFile title="upload a stamp" />
            </Grid>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Signature</StyledFormLabel>
              <EditUploadFile title="upload a signature" />
            </Grid>
          </Grid>
          <Divider sx={{ my: 5, borderColor: "#CACACA" }} />
          <Stack direction="row" justifyContent="center" sx={{ mt: 3.75 }}>
            <div>
              <Cbutton
                bgcolor="#D5E3F7"
                color="#274593"
                bordercolor="#D5E3F7"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                padding="7px 30px"
              >
                <span className="d-inline-flex me-2">
                  <SVG.PriorityIcon />
                </span>
                Save invoice
              </Cbutton>
            </div>
          </Stack>
          <Box sx={{ mt: 1.5 }} className="text-center">
            <Button
              variant="link"
              sx={{
                color: "#848484",
                fontSize: "16px",
                fontFamily: "Bahnschrift",
                borderRadius: "73px",
              }}
            >
              Cancel edits
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default EditInvoice;
