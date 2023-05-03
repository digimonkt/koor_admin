import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { SVG } from "@assets/svg";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { IconButton, Stack } from "@mui/material";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/card/deleteCard";
import { transformSubCategoryResponse } from "@api/transform/choices";
import { useDebounce } from "usehooks-ts";
import { EditCard } from "@components/card";
import {
  addSubCategoryApi,
  deleteSubCategoryApi,
  editSubCategoryApi,
  getJobSubCategoryApi,
} from "@api/managejobSubCategory";
import { manageCategoryApi } from "@api/manageoptions";
function ManageJobSubCategory() {
  const dispatch = useDispatch();
  const [categoryTable, setCategoryTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [addCategory, setAddCategory] = useState([]);
  const [countryId, seCountryId] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteCategory, setDeleteCategory] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const debouncedSearchCategoryValue = useDebounce(searchTerm, 500);
  const [jobCategoryList, setJobCategoryList] = useState([]);
  const columns = [
    {
      id: "1",
      field: "no",
      headerName: "No",
      sortable: true,
    },

    {
      field: "name",
      headerName: "Sub Category",
      sortable: true,
      width: 180,
      id: "2",
    },

    {
      field: "category",
      headerName: "Category",
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
    const response = await getJobSubCategoryApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformSubCategoryResponse(response.data.results);
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
  const addSubCategoryFunction = async () => {
    const payload = {
      title: addCategory,
      category: countryId.id,
    };

    const response = await addSubCategoryApi(payload);
    if (response.remote === "success") {
      const temp = [...categoryTable];
      temp.push({
        id: response.data.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.data.title,
        category: "",
        categoryId: response.data.data.category,
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
    setSubCategoryId(item.categoryId);
  };

  const handleUpdate = async () => {
    const payload = {
      title: categoryValue,
      category: subCategoryId,
    };
    const response = await editSubCategoryApi(editCategory, payload);
    if (response.remote === "success") {
      categoryList();
      setEditCategory("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  const handleDelete = async () => {
    const response = await deleteSubCategoryApi(deleteCategory);
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

  const getCategoryList = async () => {
    const limit = 1000;
    const response = await manageCategoryApi({ limit });
    if (response.remote === "success") {
      setJobCategoryList(response.data.results);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    categoryList();
  }, [debouncedSearchCategoryValue, pages, limit]);

  useEffect(() => {
    if (categoryTable.length) {
      dispatch(setLoading(false));
    }
  }, [categoryTable]);
  return (
    <>
      <Layout
        SubCategory
        rows={categoryTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search Sub Category",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        selectPropsCountry={{
          onChange: (_, value) => {
            seCountryId(value);
          },
        }}
        inputProps={{
          type: "text",
          placeholder: "Add Sub Category",
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
        dropDownValue={jobCategoryList}
        optionsProps={{
          title: (
            <div onClick={addSubCategoryFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Sub Category
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
          editValue={categoryValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default ManageJobSubCategory;
