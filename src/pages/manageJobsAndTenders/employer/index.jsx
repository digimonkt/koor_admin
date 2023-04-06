import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import Layout from "../layout";
import { activeInactiveUser, deleteUser, manageEmployer } from "@api/employers";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDebounce } from "usehooks-ts";
import { transformEmployerAPIResponse } from "@api/transform/choices";
function ManageEmployerComponent() {
  const dispatch = useDispatch();
  const [employerTable, setEmployerTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleting, setDeleting] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchSkillValue = useDebounce(searchTerm, 500);

  const columns = [
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
      width: 180,
      id: "3",
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 180,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile number",
      sortable: true,
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (item) => {
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
                }}
              >
                {item.row.action ? <SVG.ToggleOffIcon /> : <SVG.ToggleOnIcon />}
              </IconButton>
            </>

            <IconButton
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

  const employerList = async (keyword, countrySearch) => {
    dispatch(setLoading(true));
    const page = pages;
    const search = keyword || "";
    const country = countrySearch || "";
    const response = await manageEmployer(limit, page, search, country);
    if (response.remote === "success") {
      const formateData = transformEmployerAPIResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setEmployerTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  const searchJobs = () => {
    const keyword = searchTerm;
    employerList(keyword, "");
  };

  function getPage(_, page) {
    setPages(page);
  }

  const filterJobs = (e) => {
    const countrySearch = e.target.value;
    employerList("", countrySearch);
  };

  const activeDeActiveUser = async (item) => {
    const id = item.row.ids;
    const response = await activeInactiveUser(id);
    if (response.remote === "success") {
      const update = [...employerTable].map((i) => {
        if (i.ids === item.row.ids) {
          i.action = !i.action;
        }
        return i;
      });
      setEmployerTable(update);
    } else {
      console.log(response.error);
    }
  };

  const handleDelete = async () => {
    const response = await deleteUser(deleting);
    if (response.remote === "success") {
      const newEmployerTable = employerTable.filter(
        (emp) => emp.ids !== deleting
      );
      setEmployerTable(newEmployerTable);
      setDeleting("");
      dispatch(setSuccessToast("Job Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  useEffect(() => {
    employerList();
  }, [pages, limit]);

  useEffect(() => {
    employerList();
  }, []);

  useEffect(() => {
    if (employerTable.length) {
      dispatch(setLoading(false));
    }
  }, [employerTable]);

  useEffect(() => {
    if (debouncedSearchSkillValue) {
      searchJobs();
    }
  }, [debouncedSearchSkillValue]);
  return (
    <>
      <Layout
        rows={employerTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        page={pages}
        searchProps={{
          placeholder: "Search Employers",
          onChange: (e) => setSearchTerm(e.target.value),
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

export default ManageEmployerComponent;
