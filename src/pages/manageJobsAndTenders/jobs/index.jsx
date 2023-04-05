import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "../layout";
import { activeInactiveJob, deleteJob, manageJobData } from "@api/jobs";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/deleteCard";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { setLoading } from "@redux/slice/jobsAndTenders";
function ManageJobsComponent() {
  const dispatch = useDispatch();
  const [jobTable, setJobTable] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleting, setDeleting] = useState("");
  const manageJobList = async (keyword, countrySearch) => {
    dispatch(setLoading(true));
    const page = pages;
    const search = keyword || "";
    const country = countrySearch || "";
    const response = await manageJobData({ limit, page, search, country });
    if (response.remote === "success") {
      const formateData = formattedData(response.data.results);
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
  useEffect(() => {
    if (jobTable.length) {
      dispatch(setLoading(false));
    }
  }, [jobTable]);

  useEffect(() => {
    manageJobList();
  }, [pages, limit]);

  function getPage(_, page) {
    setPages(page);
  }

  function formattedData(apiData) {
    const newData = apiData.map((item, index) => {
      const payload = {
        ids: item.id,
        no: index + 1,
        id: item.job_id,
        jobTitle: item.title,
        company: item.user,
        location: `${item.city.title},${item.country.title}`,
        action: item.status,
      };
      return payload;
    });
    return newData;
  }

  const columns = [
    {
      field: "no",
      headerName: "No",
      sortable: true,
    },
    {
      field: "id",
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
              onClick={handleClickEyes}
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
              onClick={() => setDeleting(item.row.ids)}
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

  const handleClickEyes = () => {
    window.open("/manage-jobs", "_blank");
  };

  const handleDelete = async () => {
    const response = await deleteJob(deleting);
    if (response.remote === "success") {
      const newJobTable = jobTable.filter((job) => job.ids !== deleting);
      setJobTable(newJobTable);
      setDeleting("");
      dispatch(setSuccessToast("Job Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
    setDeleting("");
  };

  const searchJobs = (e) => {
    const keyword = e.target.value;
    manageJobList(keyword, "");
  };

  const filterJobs = (e) => {
    const countrySearch = e.target.value;
    manageJobList("", countrySearch);
  };

  const handleHoldJob = async (item, action) => {
    const id = item.row.ids;
    const response = await activeInactiveJob(id);
    if (response.remote === "success") {
      const update = [...jobTable].map((i) => {
        if (i.ids === item.row.ids) {
          i.action = action;
        }
        return i;
      });
      setJobTable(update);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {}, [jobTable]);

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
          onChange: (e) => searchJobs(e),
        }}
        selectProps={{ onChange: (e) => filterJobs(e) }}
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
            <>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>
              Export CSV
            </>
          ),
        }}
        jobProps={{
          title: (
            <>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>{" "}
              Post new job
            </>
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
