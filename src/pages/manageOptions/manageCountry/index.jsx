import React, { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { getCitiesByCountry, getCountries } from "@redux/slice/choices";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./layout";
import { LabeledInput } from "@components/input";
import Accordion from "@components/accordion";
import Cities from "./SubCategories";

const ManageCountry = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.choice);

  const handleSelectCountry = (id) => {
    dispatch(getCitiesByCountry({ countryId: id }));
  };

  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
  }, []);

  function addItems() {
    console.log("");
  }

  return (
    <>
      <Layout
        countryInput
        searchTitle={"Search Country "}
        addBtnTitle={"add country"}
        title={"Add Country"}
        onAddItems={addItems}
      >
        {countries.data.map((country) => (
          <React.Fragment key={country.id}>
            <Accordion
              title={country.title}
              onOpen={() => handleSelectCountry(country.id)}
            >
              <LabeledInput placeholder="Add Cities" type="text" />
              <TableContainer component={Paper}>
                <Cities countryId={country.id} />
              </TableContainer>
            </Accordion>
          </React.Fragment>
        ))}
      </Layout>
    </>
  );
};

export default ManageCountry;
