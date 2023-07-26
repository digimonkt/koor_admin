import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SVG } from "@assets/svg";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "../layout";
import { activeInactiveJob, deleteJob, manageJobData } from "@api/jobs";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { setLoading } from "@redux/slice/jobsAndTenders";
import env from "@utils/validateEnv";
import { useDebounce } from "usehooks-ts";
import { transformJobAPIResponse } from "@api/transform/choices";
function ManageJobsComponent() {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.choice);
  const [jobTable, setJobTable] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleting, setDeleting] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchJobsValue = useDebounce(searchTerm, 500);
  const [country, setCountry] = useState({});
  const columns = useMemo(
    () => [
      {
        field: "no",
        headerName: "No",
        sortable: true,
      },
      {
        field: "jobId",
        headerName: "ID",
        sortable: true,
      },
      {
        field: "jobTitle",
        headerName: "Job title",
        width: "220",
        sortable: true,
      },
      {
        field: "company",
        headerName: "Company",
        width: 220,
        sortable: true,
      },
      {
        field: "location",
        headerName: "Location",
        width: "130",
        sortable: true,
      },
      {
        field: "action",
        headerName: "Action",
        width: 120,
        sortable: true,
        renderCell: (item) => {
          return (
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onClick={() => handleRedirectDetails(item.row.id)}
                sx={{
                  "&.MuiIconButton-root": {
                    background: "#D5E3F7",
                  },

                  width: 30,
                  height: 30,
                  color: "#274593",
                }}
              >
                <SVG.EyeIcon />
              </IconButton>

              <IconButton
                onClick={() => {
                  handleHoldJob(
                    item,
                    item.row.action === "active" ? "inActive" : "active"
                  );
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
                {item.row.action === "active" ? (
                  <SVG.HoldIcon />
                ) : (
                  <SVG.polygon />
                )}
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
                }}
              >
                <SVG.DeleteIcon />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    []
  );

  const manageJobList = useCallback(async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchJobsValue || "";
    const response = await manageJobData({
      limit,
      page,
      search,
      country: country.title,
    });
    if (response.remote === "success") {
      const startIndex = (page - 1) * 10;
      const formateData = transformJobAPIResponse(
        response.data.results,
        startIndex
      );
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setJobTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  }, [country, debouncedSearchJobsValue, pages, limit]);

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  const handleRedirectDetails = useCallback((item) => {
    const url = `${env.REACT_APP_REDIRECT_URL}/jobs/details/${item}`;
    window.open(url, "_blank");
  }, []);

  const handleDelete = useCallback(async () => {
    const response = await deleteJob(deleting);
    if (response.remote === "success") {
      const newJobTable = jobTable.filter((job) => job.id !== deleting);
      setJobTable(newJobTable);
      setDeleting("");
      dispatch(setSuccessToast("Job Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
    setDeleting("");
  }, [jobTable, dispatch, deleting]);

  const filterJobsCountry = (e) => {
    const countryId = e.target.value;
    const country = countries.data.find((country) => country.id === countryId);
    setCountry(country);
  };

  const handleHoldJob = useCallback(
    async (item, action) => {
      const id = item.row.id;
      const updatedJobTable = jobTable.map((job) => {
        if (job.id === id) {
          return { ...job, action };
        }
        return job;
      });
      setJobTable(updatedJobTable);
      await activeInactiveJob(id);
      manageJobList();
    },
    [jobTable, dispatch]
  );

  const resetFilterJob = useCallback(() => {
    setSearchTerm("");
    setCountry({});
  }, []);

  const downloadJobCSV = useCallback(async () => {
    const action = "download";
    const response = await manageJobData({ action });
    if (response.remote === "success") {
      window.open(
        process.env.REACT_APP_BACKEND_URL + response.data.url,
        "_blank"
      );
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobTable.length) {
      dispatch(setLoading(false));
    }
  }, [jobTable]);

  useEffect(() => {
    manageJobList();
  }, [manageJobList]);

  return (
    <>
      <Layout
        job
        rows={jobTable}
        totalCount={totalCount}
        columns={columns}
        handlePageChange={getPage}
        page={pages}
        searchProps={{
          placeholder: "Search Jobs",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        selectProps={{
          onChange: (e) => filterJobsCountry(e),
          value: country.id || "",
        }}
        limitProps={{
          value: limit,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          onChange: (e) => setLimit(e.target.value),
        }}
        csvProps={{
          title: (
            <div onClick={() => downloadJobCSV()}>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>
              Export CSV
            </div>
          ),
        }}
        jobPost={{
          title: (
            <div onClick={() => downloadJobCSV()}>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>
              New Job Post
            </div>
          ),
        }}
        jobProps={{
          title: (
            <div onClick={() => resetFilterJob()}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Reset Filter
            </div>
          ),
        }}
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

export default ManageJobsComponent;
