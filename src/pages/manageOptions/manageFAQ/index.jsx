import React, { useState, useEffect, useCallback } from "react";
import Layout from "../layout";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { transformFAQCategoryResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DeleteCard from "@components/card/deleteCard";
import EditCard from "@components/card/editCard";
import { useDebounce } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import {
  addFAQCategoryApi,
  deleteFaqCategoryApi,
  editFaqCategoryApi,
  getFAQCategoryApi,
} from "@api/manageFAQ";
import { showRole } from "@utils/common";
function ManageFQL() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [faqCategoryTable, setFAQCategoryTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [addFAQCategory, setAddFAQCategory] = useState("");
  const [addFAQRole, setAddFAQRole] = useState("");
  const [editFAQCategory, setEditFAQCategory] = useState("");
  const [editFAQValue, setEditFAQValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [deleteFAQCategory, setDeleteFAQCategory] = useState("");
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
      width: 300,
      sortable: true,
    },
    {
      id: "4",
      field: "role",
      headerName: "Role",
      width: 300,
      sortable: true,
      renderCell: (item) => showRole(item.row.role),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (item) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={() => showFAQ(item.row)}
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

            <IconButton
              onClick={() => setDeleteFAQCategory(item.row.id)}
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

  const faqCategoryList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchTenderCategoryValue || "";
    const response = await getFAQCategoryApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformFAQCategoryResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setFAQCategoryTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      setLoading(false);
      if (response?.error.errors.detail === "I") {
        setPages(1);
      }
    }
  };

  const addFaqCategoryFunction = async () => {
    const payload = {
      title: addFAQCategory,
      role: addFAQRole,
    };
    const response = await addFAQCategoryApi(payload);
    if (response.remote === "success") {
      const temp = [...faqCategoryTable];
      temp.push({
        id: response.data.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.data.title,
        role: response.data.data.role,
      });
      setFAQCategoryTable([...temp]);
      setAddFAQCategory("");
      setAddFAQRole("");
      dispatch(setSuccessToast("Add FAQ Category SuccessFully"));
    } else {
      if (response.error.errors.title === "This field may not be blank.") {
        dispatch(setErrorToast("Field can not be blank"));
      } else {
        dispatch(setErrorToast("Something went wrong"));
      }
    }
  };

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);
  const handleDelete = async () => {
    setLoading(false);
    const response = await deleteFaqCategoryApi(deleteFAQCategory);
    if (response.remote === "success") {
      const newFAQTable = faqCategoryTable.filter(
        (emp) => emp.id !== deleteFAQCategory,
      );
      setFAQCategoryTable(newFAQTable);
      setDeleteFAQCategory("");
      dispatch(setSuccessToast("Delete FAQ Category SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const handleEdit = async (item) => {
    setEditFAQCategory(item.id);
    setEditFAQValue(item.name);
  };

  const showFAQ = async (details) => {
    const id = details.id;
    const role = details.role;
    navigate(`/manage-faq/${id}/${role}`);
  };

  const handleUpdate = async () => {
    const payload = {
      title: editFAQValue,
    };

    const response = await editFaqCategoryApi(editFAQCategory, payload);
    if (response.remote === "success") {
      faqCategoryList();
      setEditFAQCategory("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  useEffect(() => {
    faqCategoryList();
  }, [debouncedSearchTenderCategoryValue, pages, limit]);

  useEffect(() => {
    if (faqCategoryTable.length) {
      dispatch(setLoading(false));
    }
  }, [faqCategoryTable]);
  return (
    <>
      <Layout
        faq
        rows={faqCategoryTable}
        columns={columns}
        totalCount={totalCount}
        page={pages}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search manage FAQ",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Enter FAQ Category",
          onChange: (e) => setAddFAQCategory(e.target.value),
          value: addFAQCategory,
          style: { marginLeft: "-6px" },
        }}
        inputPropsRole={{
          content: { faqCategoryTable },
          setContentId: { setAddFAQRole },
          value: { addFAQRole },
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
            <div onClick={addFaqCategoryFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add FAQ Category
            </div>
          ),
        }}
      />
      <DialogBox
        open={!!deleteFAQCategory}
        handleClose={() => setDeleteFAQCategory("")}
      >
        <DeleteCard
          title="Delete FAQ Category"
          content="Are you sure you want to delete FAQ Category?"
          handleCancel={() => setDeleteFAQCategory("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox
        open={!!editFAQCategory}
        handleClose={() => setEditFAQCategory("")}
      >
        <EditCard
          title="Edit FAQ Category"
          handleCancel={() => setEditFAQCategory("")}
          setEditValue={setEditFAQValue}
          editValue={editFAQValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default ManageFQL;
