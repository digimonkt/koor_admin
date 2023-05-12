import React, { useEffect, useState } from "react";
import Layout from "../manageCountry/layout";
import Accordion from "@components/accordion";
import { LabeledInput } from "@components/input";
import { Paper, TableContainer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  getCategories,
  getSubCategories,
} from "@redux/slice/choices";
import Cities from "../manageCountry/SubCategories";
import { useDebounce } from "usehooks-ts";
import { addCategoryApi } from "@api/manageoptions";
const ManageCategoryComponent = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.choice);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchCategoryValue = useDebounce(searchTerm, 500);
  const [addCategory, setAddCategory] = useState("");

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
    }
  }

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const handleSelectCategories = (id) => {
    dispatch(getSubCategories({ categoryId: id }));
  };

  useEffect(() => {
    if (!categories.data.length) {
      dispatch(getCategories());
    }
  }, []);
  useEffect(() => {
    dispatch(getCategories(searchTerm));
  }, [debouncedSearchCategoryValue]);

  return (
    <>
      <Layout
        searchProps={{
          placeholder: "Search Category",
          onChange: (e) => handleSearch(e.target.value),
          value: searchTerm,
        }}
        addBtnTitle={"add Category"}
        title={"Add Category"}
        addItems={{
          onChange: (e) => setAddCategory(e.target.value),
          placeholder: "Add Category",
        }}
        onAddItems={addItems}
      >
        {categories.data.map((category) => (
          <React.Fragment key={category.id}>
            <Accordion
              title={category.title}
              onOpen={() => handleSelectCategories(category.id)}
              key={category.id}
            >
              <LabeledInput placeholder="Add Sub Categories" />
              <TableContainer component={Paper}>
                <Cities countryId={category.id} />
              </TableContainer>
            </Accordion>
          </React.Fragment>
        ))}
      </Layout>
    </>
  );
};

export default ManageCategoryComponent;
