import React, { useState, useEffect, useCallback } from "react";
import Layout from "../layout";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  createTenderCategoryApi,
  editTenderCategoryApi,
  manageTenderCategoryApi,
  tenderCategoryDeleteApi,
} from "@api/manageoptions";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { transformSkillResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DeleteCard from "@components/card/deleteCard";
import EditCard from "@components/card/editCard";
import { useDebounce } from "usehooks-ts";
function ManageTender() {
  const dispatch = useDispatch();
  const [tenderCategoryTable, setTenderCategoryTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [addTenderCategory, setAddTenderCategory] = useState("");
  const [editTenderCategory, setEditTenderCategory] = useState("");
  const [editTenderValue, setEditTenderValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [deleteTenderCategory, setDeleteTenderCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTenderCategoryValue = useDebounce(searchTerm, 500);

  const columns = [
    {
      id: "1",
      field: "no",
      headerName: "No",
      sortable: true,
    },

    {
      id: "3",
      field: "name",
      headerName: "Name",
      width: 700,
      sortable: true,
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: item => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={() => setDeleteTenderCategory(item.row.id)}
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

            <IconButton
              onClick={() => handleEdit(item.row)}
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}>
              <SVG.EditIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const tenderCategoryList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchTenderCategoryValue || "";
    const response = await manageTenderCategoryApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformSkillResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setTenderCategoryTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  const addTenderCategoryFunction = async () => {
    const payload = {
      title: addTenderCategory,
    };
    const response = await createTenderCategoryApi(payload);
    if (response.remote === "success") {
      const temp = [...tenderCategoryTable];
      temp.push({
        id: response.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.title,
      });

      setTenderCategoryTable([...temp]);
      setAddTenderCategory("");

      dispatch(setSuccessToast("Add Tender Category SuccessFully"));
    } else {
      console.log(response.error);
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  // function getPage(_, page) {
  //   setPages(page);
  // }

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  const handleDelete = async () => {
    setLoading(false);
    const response = await tenderCategoryDeleteApi(deleteTenderCategory);
    if (response.remote === "success") {
      const newSkillTable = tenderCategoryTable.filter(
        emp => emp.id !== deleteTenderCategory,
      );
      setTenderCategoryTable(newSkillTable);
      setDeleteTenderCategory("");
      dispatch(setSuccessToast("Delete Tender Category SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  const handleEdit = async item => {
    setEditTenderCategory(item.id);
    setEditTenderValue(item.name);
  };

  const handleUpdate = async () => {
    const payload = {
      title: editTenderValue,
    };

    const response = await editTenderCategoryApi(editTenderCategory, payload);
    if (response.remote === "success") {
      tenderCategoryList();
      setEditTenderCategory("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  useEffect(() => {
    tenderCategoryList();
  }, [debouncedSearchTenderCategoryValue, pages, limit]);

  useEffect(() => {
    if (tenderCategoryTable.length) {
      dispatch(setLoading(false));
    }
  }, [tenderCategoryTable]);

  return (
    <>
      <Layout
        rows={tenderCategoryTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        page={pages}
        searchProps={{
          placeholder: "Search Tender Category",
          onChange: e => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Enter Tender Category",
          onChange: e => setAddTenderCategory(e.target.value),
          value: addTenderCategory,
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
        optionsProps={{
          title: (
            <div onClick={addTenderCategoryFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Tender Category
            </div>
          ),
        }}
      />
      <DialogBox
        open={!!deleteTenderCategory}
        handleClose={() => setDeleteTenderCategory("")}>
        <DeleteCard
          title="Delete Tender Category"
          content="Are you sure you want to delete Tender Category?"
          handleCancel={() => setDeleteTenderCategory("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox
        open={!!editTenderCategory}
        handleClose={() => setEditTenderCategory("")}>
        <EditCard
          title="Edit Skill"
          handleCancel={() => setEditTenderCategory("")}
          setEditValue={setEditTenderValue}
          editValue={editTenderValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default ManageTender;
