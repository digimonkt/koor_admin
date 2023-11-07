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
} from "@mui/material";
import SelectDropDown from "./SelectDropDown";
import { getInvoiceListApi, mailSendInvoiceAPI } from "@api/manageoptions";
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
  const [invoiceId, setInvoiceId] = useState("");
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
  const columns = useMemo(
    () => [
      {
        field: "date",
        headerName: "Date",
        sortable: true,
      },
      {
        field: "invoiceId",
        headerName: "Invoice-ID",
        width: "220",
        sortable: true,
        renderCell: (item) => {
          return (
            <Tooltip title="Click here for view details">
              <Stack
                direction="row"
                spacing={1}
                style={{ cursor: "pointer" }}
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
        field: "total",
        headerName: "Total Amount",
        width: 220,
        sortable: true,
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
    []
  );
  const [listInvoice, setListInvoice] = useState([]);
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
  const [employerId, setEmployerId] = useState("");
  const [employerData, setEmployerData] = useState([]);
  const [dateTo, setDateTo] = useState(currMonth);
  const [dateFrom, setDateFrom] = useState(lastMonth);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const page = pages;
  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);
  const [totalCount, setTotalCount] = useState(0);
  const invoiceList = async () => {
    setLoading(true);
    const fromDate = dayjs(dateFrom).format("YYYY-MM-DD");
    const toDate = dayjs(dateTo).format("YYYY-MM-DD");
    const response = await getInvoiceListApi({
      employerId,
      limit,
      fromDate,
      toDate,
      invoiceId,
      page,
    });
    if (response.remote === "success") {
      setListInvoice(response.data.results);
      const startIndex = (page - 1) * 10;
      console.log(startIndex);
      setTotalCount(Math.ceil(response.data.count / limit));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      return false;
    }
    setLoading(false);
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
    setEmployerId("");
    setInvoiceId("");
  };
  useEffect(() => {
    getEmployerList();
  }, []);
  useEffect(() => {
    invoiceList();
  }, [dateTo, dateFrom, employerId, debouncedSearchCountryValue, limit, page]);
  return (
    <>
      <div className={`${styles.Management}`}>
        <h3>Invoices </h3>
        <Grid container spacing={2.5}>
          <Grid item lg={6} xs={12}>
            <FormLabel>Invoice date from</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Select Date"
                  value={dayjs(dateFrom)}
                  onChange={(value) => setDateFrom(value)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item lg={6} xs={12}>
            <FormLabel>To date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Select Date"
                  value={dayjs(dateTo)}
                  onChange={(value) => setDateTo(value)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item lg={4} xs={12}>
            <StyledFormLabel>Invoice-ID</StyledFormLabel>
            <input
              type="text"
              className={`${styles.textType}`}
              value={invoiceId}
              onChange={(e) => {
                setInvoiceId(e.target.value);
              }}
            ></input>
          </Grid>
          <Grid item lg={5} xs={12}>
            <StyledFormLabel>Employer </StyledFormLabel>
            <SelectDropDown
              padding="11px 15px"
              content={employerData}
              setContentId={setEmployerId}
              onChange={(e) => setEmployerId(e.target.value)}
              action="isBlank"
              value={employerId}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
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
              loader={loading}
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
