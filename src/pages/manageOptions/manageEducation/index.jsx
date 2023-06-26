import React, { useState, useEffect, useCallback } from "react";
import Layout from "../layout";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDebounce } from "usehooks-ts";
import { transformSkillResponse } from "@api/transform/choices";
import {
  addEducationApi,
  deleteEducationApi,
  editEducationApi,
  manageEducationApi,
} from "@api/manageoptions";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
import { EditCard } from "@components/card";
function manageEducation() {
  const dispatch = useDispatch();
  const [educationTable, setEducationTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [addEducation, setAddEducation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editEducation, setEditEducation] = useState("");
  const [editEducationValue, setEditEducationValue] = useState("");
  const [deleteEducation, setDeleteEducation] = useState("");
  const debouncedSearchEducationValue = useDebounce(searchTerm, 500);
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
              onClick={() => setDeleteEducation(item.row.id)}
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

  const eductionList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchEducationValue || "";
    const response = await manageEducationApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformSkillResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setEducationTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  // function getPage(_, page) {
  //   setPages(page);
  // }
  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  const addEducationFunction = async () => {
    const payload = {
      title: addEducation,
    };

    const response = await addEducationApi(payload);
    if (response.remote === "success") {
      const temp = [...educationTable];
      temp.push({
        id: response.data.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.data.title,
      });
      setEducationTable([...temp]);
      setAddEducation("");
      dispatch(setSuccessToast("Add Education SuccessFully"));
    } else {
      console.log(response.error);
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const handleEdit = async (item) => {
    setEditEducation(item.id);
    setEditEducationValue(item.name);
  };

  const handleUpdate = async () => {
    const payload = {
      title: editEducationValue,
    };

    const response = await editEducationApi(editEducation, payload);
    if (response.remote === "success") {
      eductionList();
      setEditEducation("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  const handleDelete = async () => {
    setLoading(false);
    const response = await deleteEducationApi(deleteEducation);
    if (response.remote === "success") {
      const newCategoryTable = educationTable.filter(
        (emp) => emp.id !== deleteEducation
      );
      setEducationTable(newCategoryTable);
      setDeleteEducation("");
      dispatch(setSuccessToast("Delete Skill SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  useEffect(() => {
    eductionList();
  }, [debouncedSearchEducationValue, pages, limit]);

  useEffect(() => {
    if (educationTable.length) {
      dispatch(setLoading(false));
    }
  }, [educationTable]);

  return (
    <>
      <Layout
        rows={educationTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        page={pages}
        searchProps={{
          placeholder: "Search  Education",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Add  Education",
          onChange: (e) => setAddEducation(e.target.value),
          value: addEducation,
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
            <div onClick={addEducationFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Education
            </div>
          ),
        }}
      />

      <DialogBox
        open={!!deleteEducation}
        handleClose={() => setDeleteEducation("")}
      >
        <DeleteCard
          title="Delete Category"
          content="Are you sure you want to delete Category?"
          handleCancel={() => setDeleteEducation("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox
        open={!!editEducation}
        handleClose={() => setEditEducation("")}
      >
        <EditCard
          title="Edit Category"
          handleCancel={() => setEditEducation("")}
          setEditValue={setEditEducationValue}
          editValue={editEducationValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default manageEducation;
