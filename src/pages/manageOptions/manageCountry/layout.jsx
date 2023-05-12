import React from "react";
import { LabeledInput, SearchInput } from "@components/input";
import { SolidButton } from "@components/button";
import { Stack } from "@mui/material";
import SelectWithSearch from "@components/input/selectWithsearch";

const Layout = ({
  children,
  title,
  searchProps,
  addBtnTitle,
  onAddItems,
  countryInput,
  selectList,
  addItems,
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
    </>
  );
};

export default Layout;
