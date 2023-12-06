import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SVG } from "@assets/svg";
import { IconButton, Stack, Box, Tooltip } from "@mui/material";
import Layout from "../layout";
import { manageCandidate } from "@api/candidate";
import { activeInactiveUser, deleteUser } from "@api/employers";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDebounce } from "usehooks-ts";
import { transformCandidatesAPIResponse } from "@api/transform/choices";
import env from "@utils/validateEnv";
import { USER_ROLES } from "@utils/enum";
import { getCountriesName } from "@api/jobs";
import { showRole } from "@utils/common";
function ManageCandidatesComponent() {
  const dispatch = useDispatch();
  const { countries } = useSelector(state => state.choice);
  const [candidateTable, setCandidateTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleting, setDeleting] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState({});
  const [countriesData, setCountriesData] = useState(countries.data);
  const debouncedSearchCandidatesValue = useDebounce(searchTerm, 500);

  const columns = useMemo(
    () => [
      {
        id: "1",
        field: "no",
        headerName: "No",
        sortable: true,
      },
      {
        id: "A1",
        field: "role",
        headerName: "Role",
        sortable: true,
        width: 200,
        renderCell: item => showRole(item.row.role),
      },

      {
        field: "name",
        headerName: "Name",
        sortable: true,
        width: 200,
        id: "3",
      },

      {
        field: "email",
        headerName: "Email",
        sortable: true,
        width: 250,
      },
      {
        field: "mobileNumber",
        headerName: "Mobile number",
        sortable: true,
        width: 200,
      },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        width: 120,
        renderCell: item => {
          return (
            <Stack direction="row" spacing={1} alignItems="center">
              <>
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
                  <Tooltip
                    title={
                      item.row.action ? "Deactivate User" : "Activate User"
                    }
                    arrow>
                    {item.row.action ? (
                      <SVG.ToggleOffIcon />
                    ) : (
                      <SVG.ToggleOnIcon />
                    )}
                  </Tooltip>
                </IconButton>
              </>

              <IconButton
                onClick={() =>
                  handleRedirectDetails(item.row.id, item.row.role)
                }
                sx={{
                  "&.MuiIconButton-root": {
                    background: "#D5E3F7",
                  },
                  width: 30,
                  height: 30,
                  color: "#274593",
                }}>
                <Tooltip title={"View Profile"} arrow>
                  <SVG.EyeIcon />
                </Tooltip>
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
                <Tooltip title={"Delete"} arrow>
                  <SVG.DeleteIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [],
  );

  const handleRedirectDetails = useCallback((item, role) => {
    if (role === USER_ROLES.vendor) {
      const url = `${env.REACT_APP_REDIRECT_URL}/vendor/${item}/profile`;
      window.open(url, "_blank");
    } else if (role === USER_ROLES.jobSeeker) {
      const url = `${env.REACT_APP_REDIRECT_URL}/job-seeker/${item}/profile`;
      window.open(url, "_blank");
    }
  }, []);

  const candidateList = useCallback(async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchCandidatesValue || "";
    const response = await manageCandidate({
      limit,
      page,
      search,
      country: country.title,
    });
    if (response.remote === "success") {
      const formateData = transformCandidatesAPIResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setCandidateTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      dispatch(setLoading(false));
      console.log(response.error);
    }
  }, [country, debouncedSearchCandidatesValue, pages, limit]);

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  const filterJobsCountry = e => {
    const countryId = e.target.value;
    const country = countriesData.find(country => country.id === countryId);
    setCountry(country);
  };

  const activeDeActiveUser = useCallback(
    async item => {
      const id = item.row.id;
      const response = await activeInactiveUser(id);
      if (response.remote === "success") {
        const update = [...candidateTable].map(i => {
          if (i.id === item.row.id) {
            i.action = !i.action;
          }
          return i;
        });
        setCandidateTable(update);
        candidateList();
      } else {
        dispatch(setErrorToast("something went wrong"));
      }
    },
    [candidateTable],
  );

  const handleDelete = useCallback(async () => {
    setLoading(false);
    const response = await deleteUser(deleting);
    if (response.remote === "success") {
      const newCandidateTable = candidateTable.filter(
        emp => emp.id !== deleting,
      );
      setCandidateTable(newCandidateTable);
      setDeleting("");
      dispatch(setSuccessToast("Job Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  }, [deleting, candidateTable, dispatch]);

  const resetFilterCandidate = () => {
    setSearchTerm("");
    setCountry({});
  };
  const getCountryList = async () => {
    const limitParam = 500;
    const response = await getCountriesName({ limit: limitParam });
    if (response.remote === "success") {
      setCountriesData(response.data.results);
    }
  };
  const downloadCandidatesCSV = useCallback(async () => {
    const action = "download";
    const response = await manageCandidate({ action });
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
    if (candidateTable.length) {
      dispatch(setLoading(false));
    }
  }, [candidateTable]);

  useEffect(() => {
    candidateList();
  }, [candidateList]);
  useEffect(() => {
    getCountryList();
  }, []);
  return (
    <>
      <Layout
        rows={candidateTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        NoFoundText={{ noRowsLabel: "No candidate found" }}
        page={pages}
        dropDownList={countriesData}
        searchProps={{
          placeholder: "Search Candidates",
          onChange: e => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        selectProps={{
          onChange: e => filterJobsCountry(e),
          value: country.id || "",
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
              onClick={() => downloadCandidatesCSV()}
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
              onClick={() => resetFilterCandidate()}
              sx={{ display: "flex", alignItems: "center" }}>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.WhiteFile width={24} height={24} />
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

export default ManageCandidatesComponent;
