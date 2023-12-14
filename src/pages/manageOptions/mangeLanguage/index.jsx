import React, { useState, useEffect, useCallback } from "react";
import Layout from "../layout";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDebounce } from "usehooks-ts";
import { transformSkillResponse } from "@api/transform/choices";
import {
  addLanguageApi,
  deleteLanguageApi,
  editLanguageApi,
  getLanguageApi,
} from "@api/manageoptions";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
import { EditCard } from "@components/card";
function ManageLanguage() {
  const dispatch = useDispatch();
  const [languageTable, setLanguageTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [addLanguage, setAddLanguage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editLanguage, setEditLanguage] = useState("");
  const [editLanguageValue, setEditLanguageValue] = useState("");
  const [deleteLanguage, setDeleteLanguage] = useState("");
  const debouncedSearchLanguageValue = useDebounce(searchTerm, 500);
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
      width: 680,
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
              onClick={() => setDeleteLanguage(item.row.id)}
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

  const languageList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchLanguageValue || "";
    const response = await getLanguageApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformSkillResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setLanguageTable(formateData);
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

  const addLanguageFunction = async () => {
    const payload = {
      title: addLanguage,
    };

    const response = await addLanguageApi(payload);
    if (response.remote === "success") {
      const temp = [...languageTable];
      temp.push({
        id: response.data.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.data.title,
      });
      setLanguageTable([...temp]);
      setAddLanguage("");
      dispatch(setSuccessToast("Add language SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const handleEdit = async (item) => {
    setEditLanguage(item.id);
    setEditLanguageValue(item.name);
  };

  const handleUpdate = async () => {
    const payload = {
      title: editLanguageValue,
    };

    const response = await editLanguageApi(editLanguage, payload);
    if (response.remote === "success") {
      languageList();
      setEditLanguage("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  const handleDelete = async () => {
    setLoading(false);
    const response = await deleteLanguageApi(deleteLanguage);
    if (response.remote === "success") {
      const newLanguageTable = languageTable.filter(
        (emp) => emp.id !== deleteLanguage
      );
      setLanguageTable(newLanguageTable);
      setDeleteLanguage("");
      dispatch(setSuccessToast("Delete Language SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  useEffect(() => {
    languageList();
  }, [debouncedSearchLanguageValue, pages, limit]);

  useEffect(() => {
    if (languageTable.length) {
      dispatch(setLoading(false));
    }
  }, [languageTable]);

  return (
    <>
      <Layout
        rows={languageTable}
        columns={columns}
        totalCount={totalCount}
        page={pages}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search Language ",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Enter Language ",
          onChange: (e) => setAddLanguage(e.target.value),
          value: addLanguage,
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
            <div onClick={addLanguageFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add language
            </div>
          ),
        }}
      />

      <DialogBox
        open={!!deleteLanguage}
        handleClose={() => setDeleteLanguage("")}
      >
        <DeleteCard
          title="Delete Language"
          content="Are you sure you want to delete Language?"
          handleCancel={() => setDeleteLanguage("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox open={!!editLanguage} handleClose={() => setEditLanguage("")}>
        <EditCard
          title="Edit Language"
          handleCancel={() => setEditLanguage("")}
          setEditValue={setEditLanguageValue}
          editValue={editLanguageValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default ManageLanguage;
