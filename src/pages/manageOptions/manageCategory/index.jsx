import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { SVG } from "@assets/svg";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { IconButton, Stack } from "@mui/material";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
import {
  addCategoryApi,
  deleteCategoryApi,
  editCategoryApi,
  manageCategoryApi,
} from "@api/manageoptions";
import { transformOptionsResponse } from "@api/transform/choices";
import { useDebounce } from "usehooks-ts";
import { EditCard } from "@components/card";
function ManageCategoryComponent() {
  const dispatch = useDispatch();
  const [categoryTable, setCategoryTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [addCategory, setAddCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteCategory, setDeleteCategory] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editCategoryValue, setCategoryValue] = useState("");
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
              onClick={() => setDeleteCategory(item.row.id)}
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

  const categoryList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchCategoryValue || "";
    const response = await manageCategoryApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformOptionsResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setCategoryTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  function getPage(_, page) {
    setPages(page);
  }

  const addCategoryFunction = async () => {
    const payload = {
      title: addCategory,
    };

    const response = await addCategoryApi(payload);
    if (response.remote === "success") {
      const temp = [...categoryTable];
      temp.push({
        id: response.data.data.id,
        no: temp.length + 1,
        name: response.data.data.title,
      });
      setCategoryTable([...temp]);
      setAddCategory("");
      dispatch(setSuccessToast("Add Category SuccessFully"));
    } else {
      console.log(response.error);
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const handleEdit = async (item) => {
    setEditCategory(item.id);
    setCategoryValue(item.name);
  };

  const handleUpdate = async () => {
    const payload = {
      title: editCategoryValue,
    };

    const response = await editCategoryApi(editCategory, payload);
    if (response.remote === "success") {
      categoryList();
      setEditCategory("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };
  useEffect(() => {
    categoryList();
  }, [debouncedSearchCategoryValue, pages, limit]);

  useEffect(() => {
    if (categoryTable.length) {
      dispatch(setLoading(false));
    }
  }, [categoryTable]);

  const handleDelete = async () => {
    const response = await deleteCategoryApi(deleteCategory);
    if (response.remote === "success") {
      const newCategoryTable = categoryTable.filter(
        (emp) => emp.id !== deleteCategory
      );
      setCategoryTable(newCategoryTable);
      setDeleteCategory("");
      dispatch(setSuccessToast("Delete Skill SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  return (
    <>
      <Layout
        rows={categoryTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search Category",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Add Category",
          onChange: (e) => setAddCategory(e.target.value),
          value: addCategory,
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
            <div onClick={addCategoryFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Category
            </div>
          ),
        }}
      />
      <DialogBox
        open={!!deleteCategory}
        handleClose={() => setDeleteCategory("")}
      >
        <DeleteCard
          title="Delete Category"
          content="Are you sure you want to delete Category?"
          handleCancel={() => setDeleteCategory("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox open={!!editCategory} handleClose={() => setEditCategory("")}>
        <EditCard
          title="Edit Category"
          handleCancel={() => setEditCategory("")}
          setEditValue={setCategoryValue}
          editValue={editCategoryValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default ManageCategoryComponent;
