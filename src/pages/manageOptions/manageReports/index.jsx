import React, { useState } from "react";
import { Box, Card, CardContent, Tab, Tabs, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import styles from "@components/reports/styles.module.css";
import CommonReport from "@components/reports";
import Cbutton from "@components/button/cButton";
import { SVG } from "@assets/svg";
import { manageCandidate } from "@api/candidate";
import { manageEmployer } from "@api/employers";
import { manageTenderApi } from "@api/manageoptions";
import { manageJobData } from "@api/jobs";
import { useDispatch } from "react-redux";
import { setErrorToast } from "@redux/slice/toast";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const AntTabs = styled(Tabs)({
  minHeight: "35px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#274593",
    borderRadius: "15px 15px 0px 0px",
    height: 4,
  },
  "& .MuiTabs-flexContainer": {
    minHeight: 29,
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minHeight: 29,
    padding: "0px 20px",
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: 600,
    color: "#121212",
    opacity: 0.5,
    fontSize: "18px",
    fontFamily: ["Poppins"].join(","),
    "&:hover": {
      color: "#121212",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#121212",
      opacity: 1,
      backgroundColor: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const Report = () => {
  const dispatch = useDispatch();
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ py: 3, pb: 0 }}>{children}</Box>}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generalReport = [
    {
      id: 1,
      title: "Candidates list",
      description: "List of all Candidates  on the platform",
    },
    {
      id: 2,
      title: "Employers list",
      description: "List of all Employers  on the platform",
    },
    {
      id: 3,
      title: "Tenders list",
      description: "List of all Tenders on the platform",
    },
    {
      id: 4,
      title: "New job postings",
      description: "List of all New job postings on the platform",
    },
    {
      id: 5,
      title: "Closed jobs",
      description: "List of all Closed jobs on the platform",
    },
    {
      id: 6,
      title: "Closed tenders",
      description: "List of all Closed tenders on the platform",
    },
  ];

  const [checkedItems, setCheckedItems] = useState(false);
  const [checkedTree, setCheckedTree] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //* Get month value

  const handleGetValue = (data, identifier) => {
    if (identifier === "startDate") {
      setStartDate(data);
    } else if (identifier === "endDate") {
      setEndDate(data);
    }
  };
  // *Get value of checkbox
  const handleReportCheckboxChange = (value, checked, index) => {
    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[index] = checked;
    setCheckedItems(updatedCheckedItems);
    const element = [...checkedTree, value.id];
    setCheckedTree(element);
  };

  // ! download CSV File function Start
  const downloadFile = async (action, apiFunction) => {
    const from = startDate ? startDate.toISOString().split("T")[0] : "";
    const to = endDate ? endDate.toISOString().split("T")[0] : "";
    const response = await apiFunction({ from, to, action });
    if (response.remote === "success") {
      const downloadLink = document.createElement("a");
      downloadLink.href = process.env.REACT_APP_BACKEND_URL + response.data.url;
      downloadLink.click();
    }
  };
  // ! download CSV File function End

  // ! download CSV File With Filter start
  async function downloadFileWithFilter(action, apiFunction, filterType) {
    const from = startDate ? startDate.toISOString().split("T")[0] : "";
    const to = endDate ? endDate.toISOString().split("T")[0] : "";
    const response = await apiFunction({ from, to, action, filterType });
    if (response.remote) {
      const downloadLink = document.createElement("a");
      downloadLink.href = process.env.REACT_APP_BACKEND_URL + response.data.url;
      downloadLink.click();
    }
  }
  // ! download CSV File With Filter End
  const handleSubmit = async () => {
    const value = checkedTree;
    for (const items of value) {
      switch (items) {
        case 1:
          await downloadFile("download", manageCandidate);
          break;
        case 2:
          await downloadFile("download", manageEmployer);
          break;
        case 3:
          await downloadFile("download", manageTenderApi);
          break;
        case 4:
          await downloadFile("download", manageJobData);
          break;
        case 5:
          await downloadFileWithFilter("download", manageJobData, "closed");
          break;
        case 6:
          await downloadFileWithFilter("download", manageTenderApi, "closed");
          break;
        default:
          dispatch(setErrorToast("Something went wrong"));
          break;
      }
    }
  };

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
              padding: "30px",
            },
          }}
        >
          <div className="report">
            <h2>Reports</h2>
            <AntTabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <AntTab label="General reports" {...a11yProps(0)} />
            </AntTabs>
            <TabPanel value={value} index={0}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 4.5 }}
              >
                <span className={`${styles.general}`}>Use data from past:</span>
                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  className="selectedbox"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Start Date"
                        onChange={(data) => handleGetValue(data, "startDate")}
                        value={startDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="End Date"
                        onChange={(data) => handleGetValue(data, "endDate")}
                        value={endDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Stack>
              </Stack>
              <CommonReport
                reportList={generalReport}
                heddingTitle="Generate reports:"
                onChange={handleReportCheckboxChange}
                checkedItems={checkedItems}
              />
              <div className={`${styles.cbutton}`} onClick={handleSubmit}>
                <Cbutton
                  bgcolor="#D5E3F7"
                  color="#274593"
                  hoverBgColor="#d5e3f754"
                  borderColor="#D5E3F7"
                  hoverBorderColor="#d5e3f754"
                >
                  <span className="me-2 d-inline-flex">
                    <SVG.DescriptionIcon />
                  </span>
                  download CSV reports
                </Cbutton>
              </div>
            </TabPanel>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default Report;
