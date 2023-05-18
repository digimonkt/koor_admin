import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  addCountry,
  getCitiesByCountry,
  getCountries,
  removeCity,
  removeCountry,
} from "@redux/slice/choices";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./layout";
import Accordion from "@components/accordion";
import Cities from "./cities";
import {
  addCityApi,
  addCountriesApi,
  deleteCitiesApi,
  deleteCountriesApi,
  getWorldCityApi,
  getWorldCountryApi,
} from "@api/manageCountryCity";
import { useDebounce } from "usehooks-ts";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import { DeleteCard } from "@components/card";
import SelectWithSearch from "@components/input/selectWithsearch";
import { SolidButton } from "@components/button";

const ManageCountry = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.choice);
  const [selectValue, setSelectValue] = useState([]);
  const [selectCityValue, setSelectCityValue] = useState([]);
  const [countryName, setCountryName] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleting, setDeleting] = useState("");
  const [citesDeleting, setCitesDeleting] = useState("");

  const handleSelectCountry = (country) => {
    const id = country.id;
    const countryName = country.title;
    dispatch(getCitiesByCountry({ countryId: id }));
    getWorldCities(countryName);
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
      dispatch(setSuccessToast("Add Country SuccessFully"));
      setSelectValue("");
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  }

  function getPage(_, page) {
    setPages(page);
  }

  const getWorldCountry = async () => {
    const response = await getWorldCountryApi();
    if (response.remote === "success") {
      setCountryName(response.data);
    }
  };

  const getWorldCities = async (countryName) => {
    const response = await getWorldCityApi(countryName);
    if (response.remote === "success") {
      setCityName(response.data.results);
    }
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  async function handleDelete() {
    const response = await deleteCountriesApi(deleting);
    if (response.remote === "success") {
      dispatch(removeCountry({ id: deleting }));
      setDeleting("");
      dispatch(setSuccessToast("Delete Country SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  }
  async function addCities() {
    const payload = {
      title: selectCityValue.title,
      country_name: selectCityValue.country.title,
    };
    const response = await addCityApi(payload);
    if (response.remote === "success") {
      dispatch(
        addCountry({
          id: response.data.data.id,
          title: payload.title,
        })
      );
      dispatch(setSuccessToast("Add Country SuccessFully"));
      setSelectCityValue("");
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  }

  const handleDeleteCity = (city) => {
    setCitesDeleting(city);
  };

  const handleDeleteCities = async () => {
    const response = await deleteCitiesApi(citesDeleting.id);
    if (response.remote === "success") {
      dispatch(
        removeCity({
          id: citesDeleting.id,
          countryId: citesDeleting.countryId,
        })
      );
      setCitesDeleting("");
      dispatch(setSuccessToast("Delete Cities SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  useEffect(() => {
    const payload = {
      search: searchTerm,
      limit,
      page: pages,
    };
    dispatch(getCountries(payload));
    const totalCounts = Math.ceil(countries.count / limit);
    setTotalCount(totalCounts);
  }, [debouncedSearchCountryValue, limit, pages]);

  useEffect(() => {
    getWorldCountry();
  }, []);

  useEffect(() => {
    setLimit(10);
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
        totalCount={totalCount}
        handlePageChange={getPage}
        page={pages}
        selectList={{
          onChange: (_, value) => setSelectValue(value),
          options: countryName.map((country) => ({
            value: country.id,
            label: country.title,
            ...country,
          })),
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
      >
        {countries.data.map((country) => (
          <Accordion
            key={country.id}
            title={country.title}
            onOpen={() => handleSelectCountry(country)}
            handleDelete={() => setDeleting(country.id)}
          >
            <SelectWithSearch
              title={"add city"}
              onChange={(_, value) => setSelectCityValue(value)}
              options={cityName.map((cities) => ({
                value: cities.id,
                label: cities.title,
                ...cities,
              }))}
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
                "&:hover": {
                  background: "#f7f7f7",
                  borderColor: "#f7f7f7",
                },
              }}
              title={"Add Country"}
              onClick={addCities}
            />
            <TableContainer component={Paper}>
              <Cities
                countryId={country.id}
                handleDeleteSub={handleDeleteCity}
              />
            </TableContainer>
          </Accordion>
        ))}
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
        open={!!citesDeleting}
        handleClose={() => setCitesDeleting("")}
      >
        <DeleteCard
          title="Delete Cities"
          content="Are you sure you want to delete cites?"
          handleCancel={() => setCitesDeleting("")}
          handleDelete={handleDeleteCities}
        />
      </DialogBox>
    </>
  );
};

export default ManageCountry;
