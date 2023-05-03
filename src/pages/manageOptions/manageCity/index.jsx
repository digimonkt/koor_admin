import { DeleteCard } from "@components/card";
import DialogBox from "@components/dialogBox";
import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { IconButton, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import {
  addCityApi,
  deleteCitiesApi,
  getCityApi,
  getWorldCityApi,
  getWorldCountryApi,
} from "@api/manageCountryCity";
import { useDispatch } from "react-redux";
import { useDebounce } from "usehooks-ts";
import { transformCityResponse } from "@api/transform/choices";

const ManageCity = () => {
  const dispatch = useDispatch();
  const [cityTable, setCityTable] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryValue, setCountryValue] = useState([]);
  const [cityValue, setCityValue] = useState([]);
  const [cityData, setCityData] = useState({});
  const [deleteCity, setDeleteCity] = useState("");
  const debouncedSearchCategoryValue = useDebounce(searchTerm, 500);
  // const { countries } = useSelector((state) => state.choice);

  async function getCountries() {
    // setCountryValue(countries.data);
    const response = await getWorldCountryApi();
    if (response.remote === "success") {
      setCountryValue(response.data);
    }
  }
  useEffect(() => {
    getCountries();
  }, []);

  const handleDelete = async () => {
    const response = await deleteCitiesApi(deleteCity);
    if (response.remote === "success") {
      const newCountryTable = cityTable.filter((emp) => emp.id !== deleteCity);
      setCountryValue(newCountryTable);
      setDeleteCity("");
      dispatch(setSuccessToast("Delete Skill SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  const columns = [
    {
      id: "1",
      field: "no",
      headerName: "No",
      sortable: true,
    },

    {
      field: "country",
      headerName: "Country",
      sortable: true,
      width: 180,
      id: "2",
    },

    {
      field: "city",
      headerName: "City",
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
              onClick={() => setDeleteCity(item.row.id)}
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

  const cityList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchCategoryValue || "";
    const response = await getCityApi({ limit, page, search });
    if (response.remote === "success") {
      dispatch(setLoading(false));
      const formateData = transformCityResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setCityTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    cityList();
  }, [debouncedSearchCategoryValue, pages, limit]);

  function getPage(_, page) {
    setPages(page);
  }

  const getCityList = async (value) => {
    const countryId = value.id;
    const limit = 500;
    const response = await getWorldCityApi({ limit, countryId });
    if (response.remote === "success") {
      setCityValue(response.data.results);
    }
  };

  async function addCity() {
    const payload = {
      title: cityData.title,
      country_name: cityData.country.title,
    };
    const response = await addCityApi(payload);
    if (response.remote === "success") {
      const temp = [...cityTable];
      temp.push({
        id: response.data.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.data.title,
      });
      setCityTable([...temp]);
      dispatch(setSuccessToast("Add Country SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  }
  return (
    <>
      <Layout
        city
        rows={cityTable}
        columns={columns}
        totalCount={totalCount}
        dropDownValue={countryValue}
        cityValue={cityValue}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search  Education",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        selectPropsCountry={{
          // onChange: (_, value) => {
          //   setCountry(value);
          // },
          onChange: (_, value) => getCityList(value),
        }}
        selectPropsCities={{
          onChange: (_, value) => {
            setCityData(value);
          },
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
          // onClick={addEducationFunction}
          title: (
            <div onClick={addCity}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add City
            </div>
          ),
        }}
      />

      <DialogBox open={!!deleteCity} handleClose={() => setDeleteCity("")}>
        <DeleteCard
          title="Delete Category"
          content="Are you sure you want to delete Category?"
          handleCancel={() => setDeleteCity("")}
          handleDelete={handleDelete}
        />
      </DialogBox>
    </>
  );
};

export default ManageCity;
