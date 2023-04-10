import { SolidButton } from "@components/button";
import { SearchInput, SelectInput } from "@components/input";
import React from "react";

function TableFilter({ searchProps, selectProps, csvProps, jobProps, job }) {
  return (
    <>
      <SearchInput
        placeholder="Search jobs"
        widthInput="100%"
        {...searchProps}
      />
      <SelectInput placeholder="Location" value="" search {...selectProps} />
      <div className="w-100">
        <SolidButton
          sx={{
            width: "100%",
            background: "#fff",
            borderRadius: "73px",
            border: "solid 1px ",
            fontFamily: "Bahnschrift",
            fontSize: "16px",
            color: "#274593",
            padding: "10px 30px",
            fontWeight: 600,
            "&:hover": {
              background: "#f7f7f7",
              borderColor: "#f7f7f7",
            },
          }}
          {...csvProps}
        />
      </div>
      {job ? (
        <div className="w-100">
          <SolidButton
            title={(jobProps || {}).title}
            sx={{
              width: "100%",
              background: "#274593",
              borderRadius: "73px",
              border: "solid 1px ",
              fontFamily: "Bahnschrift",
              fontSize: "16px",
              color: "#fff",
              padding: "10px 24px",
              fontWeight: 600,
              "&:hover": {
                background: "#274593",
                borderColor: "#274593",
                //   color: hoverColor,
              },
            }}
            {...jobProps}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default TableFilter;
