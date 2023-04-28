import { DeleteCard } from "@components/card";
import DialogBox from "@components/dialogBox";
import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { IconButton, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { useSelector, useDispatch } from "react-redux";
import { transformOptionsResponse } from "@api/transform/choices";
import { addCountriesApi, getWorldCountryApi } from "@api/manageCountryCity";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";

const ManageCountry = () => {
  const dispatch = useDispatch();

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
              //   onClick={() => setDeleteEducation(item.row.id)}
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

  const { countries } = useSelector((state) => state.choice);
  const [country, setCountry] = useState({});
  const [countryValue, setCountryValue] = useState({});
  const [countryName, setCountryName] = useState([]);

  function getCountries() {
    const formateData = transformOptionsResponse(countries.data);
    setCountryValue(formateData);
  }

  const getWorldCountry = async () => {
    const response = await getWorldCountryApi();
    if (response.remote === "success") {
      setCountryName(response.data);
    }
  };

  async function addCountry() {
    const payload = {
      title: country.title,
      currency_code: country.currency,
      country_code: country.phone_code,
      iso_code2: country.iso2,
      iso_code3: country.iso3,
    };
    const response = await addCountriesApi(payload);
    if (response.remote === "success") {
      dispatch(setSuccessToast("Add Country SuccessFully"));
      getCountries();
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  }

  useEffect(() => {
    getCountries();
    getWorldCountry();
  }, [countries]);

  return (
    <>
      <Layout
        country
        rows={countryValue}
        columns={columns}
        // totalCount={totalCount}
        // handlePageChange={getPage}
        selectPropsCountry={{
          onChange: (_, value) => {
            setCountry(value);
          },
        }}
        countryName={countryName}
        limitProps={{
          value: 15,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          // onChange: (e) => setLimit(e.target.value),
        }}
        optionsProps={{
          title: (
            <div onClick={addCountry}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Country
            </div>
          ),
        }}
      />

      <DialogBox
      //   open={!!deleteEducation}
      //   handleClose={() => setDeleteEducation("")}
      >
        <DeleteCard
          title="Delete Category"
          content="Are you sure you want to delete Category?"
          // handleCancel={() => setDeleteEducation("")}
          // handleDelete={handleDelete}
        />
      </DialogBox>
    </>
  );
};

export default ManageCountry;