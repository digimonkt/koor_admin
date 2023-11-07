import React, { useEffect, useState } from "react";
import DataTable from "@components/dataTable";
import TableFilter from "@components/tableFilter";
import { Card, CardContent, Pagination } from "@mui/material";
import { Stack, styled } from "@mui/system";
import { getCountries } from "@redux/slice/choices";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesName } from "@api/jobs";
const TablePagination = styled(Pagination)(() => ({
  " &.MuiPagination-root .MuiPaginationItem-root": {
    minWidth: "36px",
    fontFamily: "Bahnschrift",
    fontSize: "16px",
    color: "#000",
    fontWeight: "400",
  },
  " &.MuiPagination-root .MuiPaginationItem-root.Mui-selected": {
    background: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
  },
  " &.MuiPagination-root .": {
    display: "none",
  },
}));

function Layout({
  rows,
  columns,
  csvProps,
  jobProps,
  selectProps,
  searchProps,
  job,
  totalCount,
  handlePageChange,
  page,
  limitProps,
  jobPost,
  newJob,
}) {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ jobsAndTenders }) => jobsAndTenders);
  const { countries } = useSelector(({ choice }) => choice);
  const [countriesData, setCountriesData] = useState(countries.data);
  const getCountryList = async () => {
    const limitParam = 500;
    const response = await getCountriesName({ limit: limitParam });
    if (response.remote === "success") {
      setCountriesData(response.data.results);
    }
  };
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
  }, [dispatch, countries.data.length]);
  useEffect(() => {
    getCountryList();
  }, []);
  return (
    <>
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1.25, sm: 1 }}
        alignItems={{ xs: "start", sm: "center" }}
        sx={{ marginBottom: 2.5 }}
        flexWrap="wrap"
        useFlexGap
      >
        <TableFilter
          jobPost={{ ...(jobPost || {}) }}
          csvProps={{ ...(csvProps || {}) }}
          jobProps={{ ...(jobProps || {}) }}
          searchProps={{ ...(searchProps || {}) }}
          selectProps={{
            ...(selectProps || {}),
            options: (countriesData || []).map((country) => ({
              value: country.id,
              label: country.title,
            })),
          }}
          job={job}
          newJob={newJob}
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
            page={page}
            loader={loading}
          />
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
