import React, { useEffect, useState } from "react";
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

  const columns = [
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
              {item.row.action === "active" ? <SVG.HoldIcon /> : "I"}
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
  ];

  const manageJobList = async () => {
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
      const formateData = transformJobAPIResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setJobTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  function getPage(_, page) {
    setPages(page);
  }

  const handleRedirectDetails = (item) => {
    const url = `${env.REACT_APP_REDIRECT_URL}/jobs/details/${item}`;
    window.open(url, "_blank");
  };

  const handleDelete = async () => {
    const response = await deleteJob(deleting);
    if (response.remote === "success") {
      const newJobTable = jobTable.filter((job) => job.id !== deleting);
      setJobTable(newJobTable);
      setDeleting("");
      dispatch(setSuccessToast("Job Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
    setDeleting("");
  };

  const filterJobsCountry = (e) => {
    const countryId = e.target.value;
    const country = countries.data.find((country) => country.id === countryId);
    setCountry(country);
  };

  const handleHoldJob = async (item, action) => {
    const id = item.row.id;
    const response = await activeInactiveJob(id);
    if (response.remote === "success") {
      const update = [...jobTable].map((job) => {
        if (job.id === item.row.id) {
          job.action = action;
        }
        return job;
      });
      setJobTable(update);
    } else {
      console.log(response.error);
    }
  };

  const resetFilterJob = () => {
    setSearchTerm("");
    setCountry({});
  };

  const downloadJobCSV = async () => {
    const action = "download";
    const response = await manageJobData({ action });
    if (response.remote === "success") {
      window.open(
        process.env.REACT_APP_BACKEND_URL + response.data.url,
        "_blank"
      );
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    if (jobTable.length) {
      dispatch(setLoading(false));
    }
  }, [jobTable]);

  useEffect(() => {
    manageJobList();
  }, [country, debouncedSearchJobsValue, pages, limit]);

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
        jobProps={{
          title: (
            <div onClick={() => resetFilterJob()}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Reset Filter
            </div>
          ),
        }}
      />
      <DialogBox open={!!deleting} handleClose={() => setDeleting("")}>
        <DeleteCard
          title="Delete Job"
          content="Are you sure you want to delete job?"
          handleCancel={() => setDeleting("")}
          handleDelete={handleDelete}
        />
      </DialogBox>
    </>
  );
}

export default ManageJobsComponent;
