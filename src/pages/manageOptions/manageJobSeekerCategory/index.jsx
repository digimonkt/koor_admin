import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDebounce } from "usehooks-ts";
import { transformOptionsResponse } from "@api/transform/choices";
import {
  addJobSeekerCategoryApi,
  deleteJobSeekerCategoryApi,
  editJobSeekerCategoryApi,
  getJobSeekerCategoryApi,
} from "@api/manageoptions";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
import { EditCard } from "@components/card";
function manageJobSeekerCategory() {
  const dispatch = useDispatch();
  const [JobSeekerCategoryTable, setJobSeekerCategoryTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [addJobSeekerCategory, setAddJobSeekerCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editJobSeekerCategory, setEditJobSeekerCategory] = useState("");
  const [editJobSeekerCategoryValue, setEditJobSeekerCategoryValue] =
    useState("");
  const [deleteJobSeekerCategory, setDeleteJobSeekerCategory] = useState("");
  const debouncedSearchCategoryValue = useDebounce(searchTerm, 500);
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
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (item) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={() => setDeleteJobSeekerCategory(item.row.id)}
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

            <IconButton
              onClick={() => handleEdit(item.row)}
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}
            >
              <SVG.EditIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const jobSeekerCategoryList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchCategoryValue || "";
    const response = await getJobSeekerCategoryApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformOptionsResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setJobSeekerCategoryTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  function getPage(_, page) {
    setPages(page);
  }

  const addJobSeekerCategoryFunction = async () => {
    const payload = {
      title: addJobSeekerCategory,
    };

    const response = await addJobSeekerCategoryApi(payload);
    if (response.remote === "success") {
      const temp = [...JobSeekerCategoryTable];
      temp.push({
        id: response.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.title,
        category: response.data.category,
      });
      setJobSeekerCategoryTable([...temp]);
      setAddJobSeekerCategory("");
      dispatch(setSuccessToast("Add Job Seeker Category SuccessFully"));
    } else {
      console.log(response.error);
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const handleUpdate = async () => {
    const payload = {
      title: editJobSeekerCategoryValue,
    };

    const response = await editJobSeekerCategoryApi(
      editJobSeekerCategory,
      payload
    );
    if (response.remote === "success") {
      jobSeekerCategoryList();
      setEditJobSeekerCategory("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  const handleEdit = async (item) => {
    setEditJobSeekerCategory(item.id);
    setEditJobSeekerCategoryValue(item.name);
  };

  const handleDelete = async () => {
    setLoading(false);
    const response = await deleteJobSeekerCategoryApi(deleteJobSeekerCategory);
    if (response.remote === "success") {
      const newJobSeekerTable = JobSeekerCategoryTable.filter(
        (emp) => emp.id !== deleteJobSeekerCategory
      );
      setJobSeekerCategoryTable(newJobSeekerTable);
      setDeleteJobSeekerCategory("");
      dispatch(setSuccessToast("Delete Job Seeker Category SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  useEffect(() => {
    jobSeekerCategoryList();
  }, [debouncedSearchCategoryValue, pages, limit]);

  useEffect(() => {
    if (JobSeekerCategoryTable.length) {
      dispatch(setLoading(false));
    }
  }, [JobSeekerCategoryTable]);

  return (
    <>
      <Layout
        rows={JobSeekerCategoryTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search JobSeeker Category",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Add  job Seeker Category",
          onChange: (e) => setAddJobSeekerCategory(e.target.value),
          value: addJobSeekerCategory,
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
        optionsProps={{
          title: (
            <div onClick={addJobSeekerCategoryFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Job Seeker Category
            </div>
          ),
        }}
      />

      <DialogBox
        open={!!deleteJobSeekerCategory}
        handleClose={() => setDeleteJobSeekerCategory("")}
      >
        <DeleteCard
          title="Delete job Seeker Category"
          content="Are you sure you want to delete Category?"
          handleCancel={() => setDeleteJobSeekerCategory("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox
        open={!!editJobSeekerCategory}
        handleClose={() => setEditJobSeekerCategory("")}
      >
        <EditCard
          title="Edit Job Seeker Category"
          handleCancel={() => setEditJobSeekerCategory("")}
          setEditValue={setEditJobSeekerCategoryValue}
          editValue={editJobSeekerCategoryValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default manageJobSeekerCategory;
