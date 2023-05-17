import React from "react";
import { LabeledInput, SearchInput, SelectInput } from "@components/input";
import { SolidButton } from "@components/button";
import { FormControl, Pagination, Stack } from "@mui/material";
import SelectWithSearch from "@components/input/selectWithsearch";
import styled from "@emotion/styled";

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
  " &.MuiPagination-root .MuiPaginationItem-root .MuiPaginationItem-icon": {
    display: "none",
  },
}));

const Layout = ({
  children,
  title,
  searchProps,
  addBtnTitle,
  onAddItems,
  countryInput,
  selectList,
  addItems,
  limitProps,
  totalCount,
  page,
  handlePageChange,
}) => {
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.25, sm: 2.5 }}
        alignItems={{ xs: "start", sm: "center" }}
        sx={{ marginBottom: 2.5 }}
      >
        <SearchInput widthInput="100%" {...searchProps} />
        {countryInput ? (
          <SelectWithSearch title={title} {...selectList} />
        ) : (
          <LabeledInput {...addItems} />
        )}
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
          title={addBtnTitle}
          onClick={onAddItems}
        />
      </Stack>
      {children}
      <div className="peritemview">
        <Stack direction="row" spacing={2} alignItems="center">
          <span>Items per page:</span>{" "}
          <FormControl
            sx={{
              "&.MuiSelect-select": {
                fontFamily: "Poppins",
                fontSize: "16px",
              },
            }}
            size="small"
          >
            <SelectInput
              options={[
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 15, value: 15 },
              ]}
              {...(limitProps || {})}
            />
          </FormControl>
          <TablePagination
            count={totalCount || 0}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
          />
        </Stack>
      </div>
    </>
  );
};

export default Layout;
