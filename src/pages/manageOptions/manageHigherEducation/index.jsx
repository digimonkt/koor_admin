import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDebounce } from "usehooks-ts";
import { transformOptionsResponse } from "@api/transform/choices";
import {
  addEducationApi,
  deleteEducationApi,
  manageEducationApi,
} from "@api/manageoptions";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
function manageHigherEducation() {
  const dispatch = useDispatch();
  const [educationTable, setEducationTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [addEducation, setAddEducation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteEducation, setDeleteEducation] = useState("");
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
          </Stack>
        );
      },
    },
  ];

  const eductionList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchSkillValue || "";
    const response = await manageEducationApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformOptionsResponse(response.data.results);
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

  function getPage(_, page) {
    setPages(page);
  }

  const addEducationFunction = async () => {
    const payload = {
      title: addEducation,
    };

    const response = await addEducationApi(payload);
    if (response.remote === "success") {
      const temp = [...educationTable];
      temp.push({
        ...response.data.data,
        id: response.data.data.id,
        no: temp.length + 1,
        name: response.data.data.title,
        title: addEducation,
      });
      setEducationTable([...temp]);
      setAddEducation("");
      dispatch(setSuccessToast("Add Category SuccessFully"));
    } else {
      console.log(response.error);
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  useEffect(() => {
    eductionList();
  }, [debouncedSearchSkillValue, pages, limit]);

  useEffect(() => {
    if (educationTable.length) {
      dispatch(setLoading(false));
    }
  }, [educationTable]);

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
      console.log(response.error);
    }
  };

  return (
    <>
      <Layout
        rows={educationTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search Higher Education",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Add Higher Education",
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
              Add Higher Education
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
    </>
  );
}

export default manageHigherEducation;
