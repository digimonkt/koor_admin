import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SVG } from "@assets/svg";
import { IconButton, Stack, Box } from "@mui/material";
import Layout from "../layout";
import { activeInactiveUser, deleteUser, manageEmployer } from "@api/employers";
import DialogBox from "@components/dialogBox";
import { useNavigate } from "react-router-dom";
import DeleteCard from "@components/card/deleteCard";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDebounce } from "usehooks-ts";
import { transformEmployerAPIResponse } from "@api/transform/choices";
import { getCountriesName } from "@api/jobs";
function ManageEmployerComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries } = useSelector(state => state.choice);
  const [employerTable, setEmployerTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleting, setDeleting] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState({});
  const [countriesData, setCountriesData] = useState(countries.data);

  const debouncedSearchEmployerValue = useDebounce(searchTerm, 500);
  const columns = useMemo(
    () => [
      {
        id: "1",
        field: "no",
        headerName: "No",
        sortable: true,
      },

      {
        field: "name",
        headerName: "Name",
        sortable: true,
        width: "220",
        id: "3",
      },
      {
        field: "email",
        headerName: "Email",
        sortable: true,
        width: "220",
      },
      {
        field: "credits",
        headerName: "Credits",
        sortable: true,
        width: "220",
      },
      {
        field: "mobileNumber",
        headerName: "Mobile number",
        sortable: true,
        width: "220",
      },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        width: "220",
        renderCell: item => {
          return (
            <Stack direction="row" spacing={1} alignItems="center">
              <>
                {item.row.verify ? (
                  <IconButton
                    onClick={() => {
                      activeDeActiveUser(item);
                    }}
                    sx={{
                      "&.MuiIconButton-root": {
                        background: item.row.action ? "#D5E3F7" : "#D42929",
                      },
                      width: 30,
                      height: 30,
                      color: "#274593",
                    }}>
                    {item.row.action ? (
                      <SVG.ToggleOffIcon />
                    ) : (
                      <SVG.ToggleOnIcon />
                    )}
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      handleRedirectDetails(item.row.id);
                    }}
                    sx={{
                      padding: "0px",
                    }}>
                    {<SVG.unVerify />}
                  </IconButton>
                )}
              </>
              <IconButton
                onClick={() => handleRedirectDetails(item.row.id)}
                sx={{
                  "&.MuiIconButton-root": {
                    background: "#D5E3F7",
                  },
                  width: 30,
                  height: 30,
                  color: "#274593",
                }}>
                <SVG.EyeIcon />
              </IconButton>
              <IconButton
                onClick={() => setDeleting(item.row.id)}
                sx={{
                  "&.MuiIconButton-root": {
                    background: "#D5E3F7",
                  },
                  width: 30,
                  height: 30,
                  color: "#274593",
                }}>
                <SVG.DeleteIcon />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [],
  );

  const handleRedirectDetails = useCallback(
    id => {
      navigate(`employer-details/${id}`);
    },
    [navigate],
  );

  const employerList = useCallback(async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchEmployerValue || "";
    const response = await manageEmployer({
      limit,
      page,
      search,
      country: country?.title,
    });
    if (response.remote === "success") {
      const formateData = transformEmployerAPIResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setEmployerTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      dispatch(setErrorToast("something went wrong"));
    }
  }, [country, debouncedSearchEmployerValue, pages, limit]);

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  const filterJobsCountry = e => {
    const countryId = e.target.value;
    const country = countriesData?.find(country => country.id === countryId);
    setCountry(country);
  };
  const getCountryList = async () => {
    const limitParam = 500;
    const response = await getCountriesName({ limit: limitParam });
    if (response.remote === "success") {
      setCountriesData(response.data.results);
    }
  };
  const activeDeActiveUser = useCallback(
    async item => {
      const id = item.row.id;
      const update = employerTable.map(i => {
        if (i.action === id) {
          return { ...i };
        }
        return i;
      });
      setEmployerTable(update);
      await activeInactiveUser(id);
      employerList();
    },
    [employerTable],
  );

  const handleDelete = useCallback(async () => {
    const response = await deleteUser(deleting);
    if (response.remote === "success") {
      const newEmployerTable = employerTable.filter(emp => emp.id !== deleting);
      setEmployerTable(newEmployerTable);
      setDeleting("");
      dispatch(setSuccessToast("Job Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  }, [deleting, employerTable, dispatch]);

  const resetFilterEmployer = () => {
    setSearchTerm("");
    setCountry({});
  };

  const downloadEmployerCSV = useCallback(async () => {
    const action = "download";
    const response = await manageEmployer({ action });
    if (response.remote === "success") {
      window.open(
        process.env.REACT_APP_BACKEND_URL + response.data.url,
        "_blank",
      );
    } else {
      dispatch(setErrorToast("something went wrong"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (employerTable.length) {
      dispatch(setLoading(false));
    }
  }, [employerTable]);

  useEffect(() => {
    employerList();
  }, [employerList]);

  useEffect(() => {
    getCountryList();
  }, []);
  return (
    <>
      <Layout
        rows={employerTable}
        columns={columns}
        dropDownList={countriesData}
        totalCount={totalCount}
        NoFoundText={{ noRowsLabel: "No employer found" }}
        handlePageChange={getPage}
        page={pages}
        searchProps={{
          placeholder: "Search Employers",
          onChange: e => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        selectProps={{
          onChange: e => filterJobsCountry(e),
          value: country?.id || "",
        }}
        limitProps={{
          value: limit,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          onChange: e => setLimit(e.target.value),
        }}
        csvProps={{
          title: (
            <Box
              onClick={() => downloadEmployerCSV()}
              sx={{ display: "flex", alignItems: "center" }}>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>
              Export CSV
            </Box>
          ),
        }}
        jobProps={{
          title: (
            <Box
              onClick={() => resetFilterEmployer()}
              sx={{ display: "flex", alignItems: "center" }}>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.WhiteFile />
              </span>{" "}
              Reset Filter
            </Box>
          ),
        }}
        job
      />
      {deleting && (
        <DialogBox open={!!deleting} handleClose={() => setDeleting("")}>
          <DeleteCard
            title="Delete Job"
            content="Are you sure you want to delete job?"
            handleCancel={() => setDeleting("")}
            handleDelete={handleDelete}
          />
        </DialogBox>
      )}
    </>
  );
}

export default ManageEmployerComponent;
