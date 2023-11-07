import React, { useEffect, useState } from "react";
import {
  Box,
  // Button,
  Card,
  CardContent,
  // Pagination,
  // Stack,
  Tab,
  // FormControl,
  Tabs,
} from "@mui/material";
// import { SelectInput } from "@components/input";
import { styled } from "@mui/material/styles";
import PackageManagement from "@components/financialtools/PackageManagement";
// import Cbutton from "@components/button/cButton";
// import { SVG } from "@assets/svg";
import Recharge from "@components/financialtools/Recharge";
// import GenenateInvoices from "@components/financialtools/GenerateInvoices";
import Invoices from "@components/financialtools/Invoices";
import { getPlansAPI } from "@api/manageoptions";
// import PerPageItems from "../../globalcomponent/perpageitems/PerPageItems";
const AntTabs = styled(Tabs)({
  minHeight: "35px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#274593",
    borderRadius: "15px 15px 0px 0px",
    height: 4,
  },
  "& .MuiTabs-flexContainer": {
    minHeight: 29,
    flexWrap: "wrap",
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
    "@media (max-width: 992px)": {
      fontSize: "16px",
      fontWeight: "400",
    },
    "@media (max-width: 480px)": {
      fontSize: "14px",
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

// const TablePagination = styled(Pagination)(() => ({
//   " &.MuiPagination-root .MuiPaginationItem-root": {
//     minWidth: "36px",
//     fontFamily: "Bahnschrift",
//     fontSize: "16px",
//     color: "#000",
//     fontWeight: "400",
//   },
//   " &.MuiPagination-root .MuiPaginationItem-root.Mui-selected": {
//     background: "#fff",
//     borderRadius: "5px",
//     boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
//   },
//   " &.MuiPagination-root .": {
//     display: "none",
//   },
// }));

const FinancialTools = () => {
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [packageList, setPackageList] = useState([
    {
      id: 1,
      title: "Gold",
      price: "0",
      post: "0",
      benefits: "Add Benefit",
      benefitPost: "Add Benefit",
      placeholder: "Add benefit",
    },
    {
      id: 2,
      title: "Silver",
      price: "0",
      post: "0",
      benefits: "Add Benefit",
      benefitPost: "Add Benefit",
      benefits3: "Add Benefit",
      placeholder: "Add Benefit",
    },
    {
      id: 3,
      title: "Copper",
      price: "0",
      post: "0",
      benefits: "Add Benefit",
      benefitPost: "Add Benefit",
      benefits3: "Add Benefit",
      benefitPost4: "Add Benefit",
    },
  ]);

  const getPlans = async () => {
    const resp = await getPlansAPI();
    setPackageList(resp.data.results);
  };
  useEffect(() => {
    getPlans();
  }, []);
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
          <div className="report">
            <h2>Financial tools</h2>
            <AntTabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <AntTab label="Package management " {...a11yProps(0)} />
              <AntTab label="Recharge" {...a11yProps(1)} />
              {/* <AntTab label="Genenate invoices" {...a11yProps(2)} /> */}
              <AntTab label="Invoices" {...a11yProps(2)} />
            </AntTabs>
            <TabPanel value={value} index={0}>
              <PackageManagement
                packageList={packageList}
                refreshList={() => getPlans()}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Recharge />
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
              <GenenateInvoices />
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
                      <SVG.InsertIcon />
                    </span>
                    Generate Invoice
                  </Cbutton>
                </div>
              </Stack>
              <Box sx={{ mt: 2.5 }} className="text-center">
                <Button
                  variant="link"
                  sx={{
                    color: "#848484",
                    fontSize: "16px",
                    fontFamily: "Bahnschrift",
                    borderRadius: "73px",
                  }}
                >
                  Clear all fields
                </Button>
              </Box>
            </TabPanel> */}
            <TabPanel value={value} index={2}>
              <Invoices />
              <Box sx={{ mt: 4.875 }}>
                {/* <PerPageItems content={content} /> */}
              </Box>
            </TabPanel>
          </div>
        </CardContent>
        {/* {
          value ==direction="row" spacing={2} alignItems="center">
            <span>aa:</span>{" "}
            <FormControl
              sx={{
                "& .MuiSelect-select": {
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  padding: "7px 40px 5px 15px !important",
                },
              }}
              size="small"
            >
              <SelectInput
                options={[
                  { label: 5, value: 5 },
                  { label: 10, value: 10 },
                  { label: 15, value: 15 },
                ]}
              // {...(limitProps || {})}
              />
            </FormControl>
          </Stack>
        } */}
      </Card>

      {/* <TabPanel className="pagination-custom" value={value} index={3}>
        <TablePagination count={10} shape="rounded" />
      </TabPanel> */}
    </>
  );
};
export default FinancialTools;
