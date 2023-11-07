import React from "react";
import { Box } from "@mui/material";
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
      <Box className="job_search_box">
        <SearchInput
          className="job_search"
          placeholder="Search jobs"
          widthInput="100%"
          {...searchProps}
        />
      </Box>
      <Box className="job_location_box">
        <SelectInput
          placeholder="Location"
          value=""
          search
          {...selectProps}
          className="loca_job"
        />
      </Box>
      <Box>
        <SolidButton
          className="csvButton"
          sx={{
            fontFamily: "Bahnschrift",
          }}
          {...csvProps}
        />
      </Box>

      {job && (
        <>
          <Box>
            <SolidButton
              title={(jobProps || {}).title}
              className="resetButton"
              sx={{
                fontFamily: "Bahnschrift",
              }}
              {...jobProps}
            />
          </Box>
        </>
      )}
      {newJob && (
        <Box>
          <SolidButton
            title={(jobPost || {}).title}
            className="resetButton"
            sx={{
              fontFamily: "Bahnschrift",
            }}
            {...jobPost}
          />
        </Box>
      )}
    </>
  );
}

export default TableFilter;
