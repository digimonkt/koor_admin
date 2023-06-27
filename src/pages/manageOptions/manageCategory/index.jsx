import React, { useCallback, useEffect, useState } from "react";
import Layout from "../manageCountry/layout";
import Accordion from "@components/accordion";
import { LabeledInput } from "@components/input";
import { Card, Paper, TableContainer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  addSubCategories,
  getCategories,
  getSubCategories,
  removeCategory,
  removeSubCategory,
} from "@redux/slice/choices";
import SubCategory from "./SubCategories";
import { useDebounce } from "usehooks-ts";
import {
  addCategoryApi,
  deleteCategoryApi,
  editCategoryApi,
} from "@api/manageoptions";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import { DeleteCard, EditCard } from "@components/card";
import { SolidButton } from "@components/button";
import {
  addSubCategoryApi,
  deleteSubCategoryApi,
  editSubCategoryApi,
} from "@api/managejobSubCategory";
const ManageCategoryComponent = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.choice);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchCategoryValue = useDebounce(searchTerm, 500);
  const [addCategory, setAddCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [pages, setPages] = useState(1);
  const [deleting, setDeleting] = useState("");
  const [subCategoryDeleting, setSubCategoryDeleting] = useState("");
  const [subCategoryEdit, setSubCategoryEdit] = useState("");
  const [subCategoryEditValue, setSubCategoryEditValue] = useState("");
  const [editing, setEditing] = useState("");
  const [addSubCategory, setAddSubCategory] = useState("");
  const [editCategoryValue, setEditCategoryValue] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  async function addItems() {
    const payload = {
      title: addCategory,
    };
    const response = await addCategoryApi(payload);
    if (response.remote === "success") {
      dispatch(
        addCategories({
          id: response.data.data.id,
          title: payload.title,
        })
      );
      dispatch(setSuccessToast("Add Category SuccessFully"));
      setAddCategory("");
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  }

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const handleSelectCategories = (id) => {
    dispatch(getSubCategories({ categoryId: id }));
  };

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  async function handleDelete(id) {
    handleSelectCategories(id);
    const response = await deleteCategoryApi(deleting);
    if (response.remote === "success") {
      dispatch(removeCategory({ id: deleting }));
      setDeleting("");
      dispatch(setSuccessToast("Delete Category SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  }

  async function handleEdit(category) {
    setEditing(category.id);
    setEditCategoryValue(category.title);
  }
  const handleUpdate = async () => {
    const payload = {
      title: editCategoryValue,
    };
    const response = await editCategoryApi(editing, payload);
    if (response.remote === "success") {
      setEditing("");
      dispatch(getCategories());
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  const onAddSubCategory = async (id) => {
    const payload = {
      title: addSubCategory,
      category: id,
    };
    const response = await addSubCategoryApi(payload);
    if (response.remote === "success") {
      dispatch(
        addSubCategories({
          id: response.data.data.id,
          title: payload.title,
          categoryId: response.data.data.category,
        })
      );
      dispatch(setSuccessToast("Add Sub Category SuccessFully"));
      setAddSubCategory("");
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  const handleDeleteSub = async () => {
    const response = await deleteSubCategoryApi(subCategoryDeleting.id);
    if (response.remote === "success") {
      dispatch(
        removeSubCategory({
          id: subCategoryDeleting.id,
          categoryId: subCategoryDeleting.category.id,
        })
      );
      setSubCategoryDeleting("");
      dispatch(setSuccessToast("Delete Sub Category SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  const handleDeleteId = async (category) => {
    setSubCategoryDeleting(category);
  };

  const handleEditSub = async (subcategory) => {
    setEditCategoryId(subcategory.categoryId);
    setSubCategoryEdit(subcategory.id);
    setSubCategoryEditValue(subcategory.title);
  };

  const handleUpdateSub = async () => {
    const payload = {
      title: subCategoryEditValue,
      category: editCategoryId,
    };

    const response = await editSubCategoryApi(subCategoryEdit, payload);
    if (response.remote === "success") {
      setSubCategoryEdit("");
      dispatch(getCategories());
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  useEffect(() => {
    setLimit(10);
    if (!categories.data.length) {
      dispatch(getCategories());
    }
  }, []);

  useEffect(() => {
    const payload = {
      search: searchTerm,
      limit,
      page: pages,
    };

    dispatch(getCategories(payload));
    const totalCounts = Math.ceil(categories.count / limit);
    setTotalCount(totalCounts);
  }, [debouncedSearchCategoryValue, limit, pages]);

  return (
    <>
      <Layout
        searchProps={{
          placeholder: "Search Category",
          onChange: (e) => handleSearch(e.target.value),
          value: searchTerm,
        }}
        totalCount={totalCount}
        handlePageChange={getPage}
        page={pages}
        addBtnTitle={"add Category"}
        title={"Add Category"}
        addItems={{
          onChange: (e) => setAddCategory(e.target.value),
          placeholder: "Add Category",
          value: addCategory,
        }}
        onAddItems={addItems}
        limitProps={{
          value: limit,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          onChange: (e) => setLimit(e.target.value),
        }}
      >
        <Card elevation={0} sx={{ background: "transparent" }}>
          {categories.data.map((category, index) => (
            <Accordion
              elevation={0}
              key={index}
              title={category.title}
              onOpen={() => handleSelectCategories(category.id)}
              handleDelete={() => setDeleting(category.id)}
              handleEdit={() => handleEdit(category)}
            >
              <LabeledInput
                placeholder="Add Sub Categories"
                onChange={(e) => setAddSubCategory(e.target.value)}
                value={addSubCategory}
                style={{ marginBottom: "10px" }}
              />

              <SolidButton
                align="right"
                sx={{
                  background: "#fff",
                  borderRadius: "73px",
                  border: "solid 1px ",
                  fontFamily: "Bahnschrift",
                  color: "#274593",
                  fontWeight: 600,
                  marginBottom: "10px",
                  "&:hover": {
                    background: "#f7f7f7",
                    borderColor: "#f7f7f7",
                  },
                }}
                title={"add Sub Category"}
                onClick={() => onAddSubCategory(category.id)}
              />

              <TableContainer component={Paper}>
                <SubCategory
                  countryId={category.id}
                  handleDeleteSub={handleDeleteId}
                  handleEditSub={handleEditSub}
                />
              </TableContainer>
            </Accordion>
          ))}
        </Card>
      </Layout>

      <DialogBox open={!!deleting} handleClose={() => setDeleting("")}>
        <DeleteCard
          title="Delete Category"
          content="Are you sure you want to delete category?"
          handleCancel={() => setDeleting("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox
        open={!!subCategoryDeleting}
        handleClose={() => setSubCategoryDeleting("")}
      >
        <DeleteCard
          title="Delete Sub Category"
          content="Are you sure you want to delete Sub category?"
          handleCancel={() => setSubCategoryDeleting("")}
          handleDelete={handleDeleteSub}
        />
      </DialogBox>

      <DialogBox open={!!editing} handleClose={() => setEditing("")}>
        <EditCard
          title="Edit Category"
          handleCancel={() => setEditing("")}
          setEditValue={setEditCategoryValue}
          editValue={editCategoryValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>

      <DialogBox
        open={!!subCategoryEdit}
        handleClose={() => setSubCategoryEdit("")}
      >
        <EditCard
          title="Edit Sub Category"
          handleCancel={() => setSubCategoryEdit("")}
          setEditValue={setSubCategoryEditValue}
          editValue={subCategoryEditValue}
          handleUpdate={handleUpdateSub}
        />
      </DialogBox>
    </>
  );
};

export default ManageCategoryComponent;
