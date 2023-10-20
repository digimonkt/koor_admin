import React from "react";
import { SolidButton } from "@components/button";
import { SearchInput, SelectInput } from "@components/input";

function TableFilter({
  jobPost,
  searchProps,
  selectProps,
  csvProps,
  jobProps,
  job,
  newJob,
}) {
  return (
    <>
      <SearchInput
        placeholder="Search jobs"
        widthInput="100%"
        {...searchProps}
      />
      <SelectInput placeholder="Location" value="" search {...selectProps} className="selectInput_Location"/>
      <div className="locationInput">
        <SolidButton
          className="csvButton"
          sx={{
            fontFamily: "Bahnschrift",
          }}
          {...csvProps}
        />
      </div>

      {job && (
        <>
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
        </>
      )}
      {newJob && (
        <div className="w-100">
          <SolidButton
            title={(jobPost || {}).title}
            className="resetButton"
            sx={{
              fontFamily: "Bahnschrift",
            }}
            {...jobPost}
          />
        </div>
      )}
    </>
  );
}

export default TableFilter;
