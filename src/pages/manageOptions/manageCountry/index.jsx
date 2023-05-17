import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  addCountry,
  getCitiesByCountry,
  getCountries,
  removeCountry,
} from "@redux/slice/choices";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./layout";
import { LabeledInput } from "@components/input";
import Accordion from "@components/accordion";
import Cities from "./SubCategories";
import {
  addCountriesApi,
  deleteCountriesApi,
  getWorldCountryApi,
} from "@api/manageCountryCity";
import { useDebounce } from "usehooks-ts";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import { DeleteCard } from "@components/card";

const ManageCountry = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.choice);
  const [selectValue, setSelectValue] = useState({});
  const [countryName, setCountryName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleting, setDeleting] = useState("");

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
  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  async function handleDelete(id) {
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
          <React.Fragment key={country.id}>
            <Accordion
              title={country.title}
              onOpen={() => handleSelectCountry(country.id)}
              handleDelete={() => setDeleting(country.id)}
            >
              <LabeledInput placeholder="Add Cities" type="text" />

              <TableContainer component={Paper}>
                <Cities countryId={country.id} />
              </TableContainer>
            </Accordion>
          </React.Fragment>
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
    </>
  );
};

export default ManageCountry;
