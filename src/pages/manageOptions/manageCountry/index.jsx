import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  addCountry,
  getCitiesByCountry,
  getCountries,
} from "@redux/slice/choices";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./layout";
import { LabeledInput } from "@components/input";
import Accordion from "@components/accordion";
import Cities from "./SubCategories";
import { addCountriesApi, getWorldCountryApi } from "@api/manageCountryCity";
import { useDebounce } from "usehooks-ts";

const ManageCountry = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.choice);
  const [selectValue, setSelectValue] = useState({});
  const [countryName, setCountryName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectCountry = (id) => {
    dispatch(getCitiesByCountry({ countryId: id }));
  };
  const debouncedSearchCountryValue = useDebounce(searchTerm, 500);

  async function addItems() {
    const payload = {
      title: selectValue.title,
      currency_code: selectValue.currency,
      country_code: selectValue.phone_code,
      iso_code2: selectValue.iso2,
      iso_code3: selectValue.iso3,
    };
    const response = await addCountriesApi(payload);
    if (response.remote === "success") {
      dispatch(
        addCountry({
          id: response.data.data.id,
          title: payload.title,
          currency: payload.currency_code,
          phone_code: payload.country_code,
          iso2: payload.iso_code2,
          iso3: payload.iso_code3,
        })
      );
    }
  }

  const getWorldCountry = async () => {
    const response = await getWorldCountryApi();
    if (response.remote === "success") {
      setCountryName(response.data);
    }
  };
  const handleSearch = (search) => {
    setSearchTerm(search);
  };
  useEffect(() => {
    dispatch(getCountries(searchTerm));
  }, [debouncedSearchCountryValue]);

  useEffect(() => {
    getWorldCountry();
  }, []);

  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
  }, []);

  return (
    <>
      <Layout
        countryInput
        searchProps={{
          placeholder: "Search Country",
          onChange: (e) => handleSearch(e.target.value),
          value: searchTerm,
        }}
        addBtnTitle={"add country"}
        title={"Add Country"}
        onAddItems={addItems}
        selectList={{
          onChange: (_, value) => setSelectValue(value),
          options: countryName.map((country) => ({
            value: country.id,
            label: country.title,
            ...country,
          })),
        }}
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
