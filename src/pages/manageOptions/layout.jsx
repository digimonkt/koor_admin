import React, { useState, useEffect, useMemo } from "react";
import DataTable from "@components/dataTable";
import OptionsFilter from "@components/optionsFilter";
import { Card, CardContent, Pagination } from "@mui/material";
import { Stack, styled } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "@redux/slice/choices";

const TablePagination = styled(Pagination)(() => ({
  " &.MuiPagination-root .MuiPaginationItem-root": {
    minWidth: "36px",
    fontFamily: "Bahnschrift",
    fontSize: "16px",
    color: "#000",
    fontWeight: "400",

    "@media (max-width: 480px)": {
      fontSize: "14px",
    },
  },
  " &.MuiPagination-root .MuiPaginationItem-root.Mui-selected": {
    background: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
  },
  " &.MuiPagination-root .MuiPaginationItem-root .MuiPaginationItem-icon": {
    display: "none",
  },
}));

function Layout({
  rows,
  columns,
  searchProps,
  totalCount,
  handlePageChange,
  page,
  csvProps,
  limitProps,
  inputProps,
  optionsProps,
  country,
  city,
  dropDownValue,
  selectPropsCountry,
  selectPropsCities,
  SubCategory,
  cityValue,
  inputPropsRole,
  tender,
  tenderPost,
  faq,
  news,
}) {
  const { loading } = useSelector(({ jobsAndTenders }) => jobsAndTenders);
  const { countries } = useSelector(({ choice }) => choice);
  const [dropDownList, setDropDownList] = useState([]);
  const [cityValueList, setCityValueList] = useState([]);
  const dispatch = useDispatch();
  const memoizedCountryOptions = useMemo(
    () =>
      dropDownList.map((country) => ({
        value: country.id,
        label: country.title,
        ...country,
      })),
    [dropDownList]
  );
  console.log(memoizedCountryOptions);
  const memoizedCityOptions = useMemo(
    () =>
      cityValueList.map((city) => ({
        value: city.id,
        label: city.title,
        ...city,
      })),
    [cityValueList]
  );
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
  }, []);

  useEffect(() => {
    if (dropDownValue) {
      setDropDownList(dropDownValue);
    }
  }, [dropDownValue]);

  useEffect(() => {
    if (cityValue) {
      setCityValueList(cityValue);
    }
  }, [cityValue]);
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.25, sm: 2.5 }}
        alignItems={{ xs: "start", sm: "center" }}
        sx={{ marginBottom: 2.5 }}
      >
        <OptionsFilter
          news={news}
          faq={faq}
          csvProps={{ ...(csvProps || {}) }}
          optionsProps={{ ...(optionsProps || {}) }}
          inputProps={{ ...(inputProps || {}) }}
          inputPropsRole={{ ...(inputPropsRole || {}) }}
          searchProps={{ ...(searchProps || {}) }}
          selectPropsCountry={{
            ...(selectPropsCountry || {}),
            options: memoizedCountryOptions,
          }}
          selectPropsCities={{
            ...(selectPropsCities || {}),
            options: memoizedCityOptions,
          }}
          country={country}
          tenderPost={tenderPost}
          city={city}
          SubCategory={SubCategory}
          tender={tender}
        />
      </Stack>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "30px",
            },
          }}
        >
          <DataTable
            rows={rows || []}
            columns={columns || []}
            limitProps={limitProps}
            getRowId={(rows) => rows.id || Math.random()}
            loader={loading}
            page={page}
            NoFoundText={{ noRowsLabel: "No Tender found" }}
          />
          {/* <div className="pagination-custom">
            <TablePagination
              count={totalCount || 0}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
            />
          </div> */}
        </CardContent>
      </Card>
      <div className="pagination-custom">
        <TablePagination
          count={totalCount || 0}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </>
  );
}

export default Layout;
