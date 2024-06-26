import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Grid,
  FormLabel,
  Pagination,
  Stack,
  IconButton,
  Tooltip,
  Checkbox,
  Box,
} from "@mui/material";
import {
  DownloadSelectedInvoiceAPI,
  getInvoiceListApi,
  mailSendInvoiceAPI,
  sendSelectedInvoiceAPI,
} from "@api/manageoptions";
import { transformEmployerData } from "@api/transform/choices";
import { manageEmployer } from "@api/employers";
import DataTable from "@components/dataTable";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";
import env from "@utils/validateEnv";
import { SVG } from "@assets/svg";
import dayjs from "dayjs";
import { useDebounce } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import Cbutton from "@components/button/cButton";
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import SelectWithSearch from "@components/input/selectWithsearch";

const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily: "Poppins",
  color: "#121212",
  fontSize: "16px",
  fontWeight: "300",
  marginBottom: 10,
  display: "block",
}));

const Invoices = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: false,
    invoiceSendLoading: false,
    downloadInvoiceLoading: false,
    checkSendAllFields: [],
  });
  const [invoiceId, setInvoiceId] = useState("");
  const [listInvoice, setListInvoice] = useState([]);
  const [sendInvoiceId, setSendInvoiceId] = useState([]);
  const handleSendMail = async (id) => {
    dispatch(setSuccessToast("Email Sent Successfully"));
    await mailSendInvoiceAPI(id);
  };
  const debouncedSearchCountryValue = useDebounce(invoiceId, 500);
  const navigate = useNavigate();
  const handleRedirectDetails = useCallback(
    (id) => {
      navigate(`view-invoice/${id}`);
    },
    [navigate]
  );

  const handleDownload = useCallback((id) => {
    const url = `${env.REACT_APP_BACKEND_URL}/api/v1/admin/invoice/download?invoice-id=${id}`;
    window.open(url, "_blank");
  }, []);

  const handleCheckedInvoice = (id, checked) => {
    setListInvoice((prev) =>
      prev.map((item) => {
        if (item.invoiceId === id) {
          return {
            ...item,
            defaultChecked: checked,
          };
        }
        return item;
      })
    );

    if (checked) {
      setSendInvoiceId((prev) => [...prev, { invoiceId: id }]);
    } else {
      setSendInvoiceId((prev) => prev.filter((item) => item.invoiceId !== id));
    }
  };

  // const checkAllInvoiceIds = (id) => {
  //   const idExists = state.checkSendAllFields.some((field) => field.id === id);
  //   if (idExists) {
  //     setState((prev) => ({
  //       ...prev,
  //       checkSendAllFields: prev.checkSendAllFields.map((field) =>
  //         field.id === id ? { ...field, checked: true } : field
  //       ),
  //     }));
  //   }
  // };

  const handleSendAllCheck = (checked) => {
    setListInvoice((prev) =>
      prev.map((item) => ({
        ...item,
        defaultChecked: checked,
      }))
    );
    const filteredArray = listInvoice.map((obj) => {
      return { invoiceId: obj.invoiceId };
    });
    if (checked) {
      setSendInvoiceId(filteredArray);
    } else {
      setSendInvoiceId([]);
      setState((prev) => ({
        ...prev,
        checkSendAllFields: [],
      }));
    }
  };
  const columns = useMemo(
    () => [
      {
        field: "date",
        headerName: "Date",
        sortable: true,
        width: "120",
      },
      {
        field: "invoiceId",
        headerName: "Number / ID",
        width: "170",
        sortable: true,
        renderCell: (item) => {
          return (
            <Tooltip title="Click here for view details">
              <Stack
                direction="row"
                spacing={1}
                style={{ cursor: "pointer", color: "#274593" }}
                alignItems="center"
                onClick={() => {
                  handleRedirectDetails(item.row.invoiceId);
                }}
              >
                {item.row.invoiceId}
              </Stack>
            </Tooltip>
          );
        },
      },
      {
        field: "employer",
        headerName: "Employer",
        width: "220",
        sortable: true,
      },
      {
        field: "type",
        headerName: "Type Of Post",
        width: "200",
        sortable: true,
      },
      {
        field: "total",
        headerName: "Total Amount",
        width: 200,
        sortable: true,
      },
      {
        field: "send",
        headerName: (
          <Stack direction="row" spacing={1} alignItems="center" id="Invoices">
            Send?
            <Tooltip title="Send All">
              <Checkbox
                icon={<CheckCircleOutline />}
                checkedIcon={<CheckCircle />}
                onClick={(e) => handleSendAllCheck(e.target.checked)}
              />
            </Tooltip>
          </Stack>
        ),
        width: 210,
        sortable: true,
        renderCell: (item) => {
          console.log(item, "item");
          return (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              id="Invoices"
              key={item.row.invoiceId}
            >
              <Tooltip title="Send Invoice">
                <IconButton
                  onClick={() => {}}
                  sx={{
                    "&.MuiIconButton-root": {
                      background: "#D5E3F7",
                    },

                    width: 30,
                    height: 30,
                    color: "#274593",
                  }}
                >
                  <Checkbox
                    checked={item.row.defaultChecked}
                    icon={<CheckCircleOutline />}
                    checkedIcon={<CheckCircle />}
                    onClick={(event) => {
                      handleCheckedInvoice(
                        item.row.invoiceId,
                        event.target.checked
                      );
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
      {
        field: "action",
        headerName: "Action",
        width: 180,
        sortable: true,
        renderCell: (item) => {
          return (
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Click here to download">
                <IconButton
                  onClick={() => {
                    handleDownload(item.row.invoiceId);
                  }}
                  sx={{
                    "&.MuiIconButton-root": {
                      background: "#D5E3F7",
                    },

                    width: 30,
                    height: 30,
                    color: "#274593",
                  }}
                >
                  <SVG.DownlodingIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Click here to send mail">
                <IconButton
                  onClick={() => handleSendMail(item.row.invoiceId)}
                  sx={{
                    "&.MuiIconButton-root": {
                      background: "#D5E3F7",
                    },
                    width: 30,
                    height: 30,
                    color: "#274593",
                  }}
                >
                  <SVG.ForwardIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
    [listInvoice]
  );
  console.log(sendInvoiceId, "list1");
  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const currMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const [employerVal, setEmployerVal] = useState({ label: "", value: "" });
  const [employerData, setEmployerData] = useState([]);
  const [dateTo, setDateTo] = useState(currMonth);
  const [dateFrom, setDateFrom] = useState(lastMonth);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(1);

  const page = pages;
  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);
  const [totalCount, setTotalCount] = useState(0);
  const invoiceList = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    const fromDate = dayjs(dateFrom).format("YYYY-MM-DD");
    const toDate = dayjs(dateTo).format("YYYY-MM-DD");
    const response = await getInvoiceListApi({
      employerId: employerVal.value,
      limit,
      fromDate,
      toDate,
      invoiceId,
      page,
    });
    if (response.remote === "success") {
      setListInvoice(response.data.results);
      setTotalCount(Math.ceil(response.data.count / limit));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      return false;
    }
    setState((prev) => ({ ...prev, loading: false }));
  };
  const getEmployerList = async () => {
    const limit = 1000000;
    const response = await manageEmployer({ limit });
    if (response.remote === "success") {
      const formateData = transformEmployerData(response.data.results);
      setEmployerData(formateData);
    }
  };
  const TablePagination = styled(Pagination)(() => ({
    " &.MuiPagination-root .MuiPonItem-root": {
      minWidth: "36px",
      fontFamily: "Bahnschrift",
      fontSize: "16px",
      color: "#000",
      fontWeight: "400",
    },
    " &.MuiPagination-root .MuiPaginationItem-root.Mui-selected": {
      background: "#fff",
      borderRadius: "5px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    },
    " &.MuiPagination-root .MuiPaginationItem-root .MuiPaginationItem-icon": {
      display: "none",
    },
  }));
  const handleFormReset = () => {
    setEmployerVal("");
    setInvoiceId("");
  };

  const handleSelectedInvoice = async () => {
    if (!sendInvoiceId.length) {
      dispatch(setErrorToast("Please select invoice"));
    } else {
      setState((prev) => ({ ...prev, invoiceSendLoading: true }));
      const formData = new FormData();
      sendInvoiceId.forEach((invoice) => {
        formData.append("invoiceId", invoice.invoiceId);
      });
      const res = await sendSelectedInvoiceAPI(formData);
      if (res.remote === "success") {
        setState((prev) => ({ ...prev, invoiceSendLoading: false }));
        dispatch(setSuccessToast("Email Sent Successfully"));
      } else {
        setState((prev) => ({ ...prev, invoiceSendLoading: false }));
        dispatch(setErrorToast("Something went wrong"));
      }
    }
  };

  const downloadSelectedInvoice = async () => {
    if (!sendInvoiceId.length) {
      dispatch(setErrorToast("Please select invoice"));
    } else {
      setState((prev) => ({ ...prev, downloadInvoiceLoading: true }));
      const formData = new FormData();
      sendInvoiceId.forEach((invoice) => {
        formData.append("invoiceId", invoice.invoiceId);
      });
      const res = await DownloadSelectedInvoiceAPI(formData);
      if (res.remote === "success") {
        setState((prev) => ({ ...prev, downloadInvoiceLoading: false }));
        Object.values(res.data).forEach((link) => {
          window.open(link, "_blank");
        });
      } else {
        setState((prev) => ({ ...prev, downloadInvoiceLoading: false }));
        dispatch(setErrorToast("Something went wrong"));
      }
    }
  };

  useEffect(() => {
    getEmployerList();
  }, []);

  useEffect(() => {
    invoiceList();
  }, [
    dateTo,
    dateFrom,
    employerVal.value,
    debouncedSearchCountryValue,
    limit,
    page,
  ]);
  return (
    <>
      <div className={`${styles.packageManagement}`}>
        <h3>Invoices </h3>
        <Grid container spacing={2.5}>
          <Grid item lg={6} xs={12}>
            <FormLabel>Invoice date from</FormLabel>
            <Box className="invoice_date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Select Date"
                    value={dayjs(dateFrom)}
                    onChange={(value) => setDateFrom(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <FormLabel>To date</FormLabel>
            <Box className="invoice_date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Select Date"
                    value={dayjs(dateTo)}
                    onChange={(value) => setDateTo(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
            <StyledFormLabel>Number / ID</StyledFormLabel>
            <input
              type="text"
              className={`${styles.textType}`}
              value={invoiceId}
              onChange={(e) => {
                setInvoiceId(e.target.value);
              }}
            ></input>
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
            <Box className="employer_client_input">
              <StyledFormLabel>Employer / Client </StyledFormLabel>
              <SelectWithSearch
                sx={{
                  borderRadius: "10px",
                  background: "#F0F0F0",
                  fontFamily: "Poppins",
                  marginTop: "10px",
                  "& fieldset": {
                    border: "1px solid #cacaca",
                    borderRadius: "93px",
                    display: "none",
                    "&:hover": { borderColor: "#cacaca" },
                  },
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "Poppins",
                    padding: "4px 9px",
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "16px",
                    color: "#848484",
                    fontFamily: "Poppins !important",
                    transform: "translate(14px, 12px) scale(1)",
                  },
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                }}
                options={(employerData || []).map((employer) => ({
                  value: employer.id,
                  label: employer.title,
                }))}
                title={"select the options"}
                onChange={(_, value) => {
                  if (value) {
                    setEmployerVal(value);
                  } else {
                    setEmployerVal({
                      value: "",
                      label: "",
                    });
                  }
                }}
                value={employerVal}
              />
            </Box>
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
            <Box className="employer_client_input">
              <StyledFormLabel>Send Selected Invoice?</StyledFormLabel>
              <Cbutton
                type="button"
                bgcolor="#D5E3F7"
                color="#274593"
                bordercolor="#D5E3F7"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                disabled={state.invoiceSendLoading}
                padding="7px 30px"
                marginTop="10px"
                onClick={handleSelectedInvoice}
              >
                {state.invoiceSendLoading ? "Sending..." : "Send"}
              </Cbutton>
            </Box>
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
            <Box className="employer_client_input">
              <StyledFormLabel>Download Selected Invoice?</StyledFormLabel>
              <Cbutton
                type="button"
                bgcolor="#D5E3F7"
                color="#274593"
                bordercolor="#D5E3F7"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                disabled={state.downloadInvoiceLoading}
                padding="7px 30px"
                marginTop="10px"
                onClick={downloadSelectedInvoice}
              >
                {state.downloadInvoiceLoading ? "Downloading..." : "Download"}
              </Cbutton>
            </Box>
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
            <div style={{ marginTop: "30px" }}>
              <Cbutton
                type="button"
                bgcolor="#D5E3F7"
                color="#274593"
                bordercolor="#D5E3F7"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                padding="7px 30px"
                marginTop="10px"
                onClick={() => handleFormReset()}
              >
                Reset
              </Cbutton>
            </div>
          </Grid>
          <Grid item lg={12} xs={12}>
            {/* <CustomTable
              rows={listInvoice}
              columns={USER_COLUMN_DATA}
              radius="7px"
            /> */}
            <DataTable
              rows={listInvoice || []}
              columns={columns || []}
              limitProps={{
                value: limit,
                options: [
                  { label: 5, value: 5 },
                  { label: 10, value: 10 },
                  { label: 15, value: 15 },
                ],
                onChange: (e) => setLimit(e.target.value),
              }}
              page={page}
              loader={state.loading}
            />
            <div className="pagination-custom">
              <TablePagination
                count={totalCount || 0}
                page={page}
                onChange={getPage}
                shape="rounded"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Invoices;
