import React, { useEffect } from "react";
import Layout from "../manageCountry/layout";
import Accordion from "@components/accordion";
import { LabeledInput } from "@components/input";
import { Paper, TableContainer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getSubCategories } from "@redux/slice/choices";
import Cities from "../manageCountry/SubCategories";
const ManageCategoryComponent = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.choice);

  const handleSelectCategories = (id) => {
    dispatch(getSubCategories({ categoryId: id }));
  };

  useEffect(() => {
    if (!categories.data.length) {
      dispatch(getCategories());
    }
  }, []);

  return (
    <>
      <Layout
        searchTitle={"Search Category"}
        addBtnTitle={"add Category"}
        title={"Add Category"}
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
