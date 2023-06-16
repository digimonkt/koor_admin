import React from "react";
import { SolidButton } from "@components/button";
import { SearchInput, SelectInput } from "@components/input";

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
          className="csvButton"
          sx={{
            fontFamily: "Bahnschrift",
          }}
          {...csvProps}
        />
      </div>
      {job && (
        <div className="w-100">
          <SolidButton
            title={(jobProps || {}).title}
            className="resetButton"
            sx={{
              fontFamily: "Bahnschrift",
            }}
            {...jobProps}
          />
        </div>
      )}
    </>
  );
}

export default TableFilter;
