import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FormControl, MenuItem, Select } from "@mui/material";

const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
    padding: 13px 15px;
    border: 0;
    color: #121212;
    font-weight: 500;
  }
  & .MuiSelect-select:focus {
    border-radius: 10px;
  }
  & .MuiSelect-icon {
    color: #848484;
  }
  ,
  &.MuiInputBase-root {
    border-radius: 10px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    letter-spacing: 0.02em;

    color: #848484;
  }
  & fieldset {
    display: none;
  }
`;

const SelectDropDown = ({ content, padding, setContentId, faq }) => {
  const [isSelect, setIsSelect] = useState("");
  const handleChangeSelect = (event) => {
    setIsSelect(event.target.value);
    setContentId(event.target.value);
  };

  return (
    <>
      <FormControl
        sx={{
          "&.MuiSelect-select": {
            fontFamily: "Poppins",
            fontSize: "16px",
          },
        }}
        size="small"
      >
        {faq ? (
          <SelectBox
            value={isSelect}
            icon={KeyboardArrowUpIcon}
            onChange={handleChangeSelect}
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={KeyboardArrowUpIcon}
            displayEmpty
            sx={{ "& .MuiSelect-select": { padding } }}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem value="job_seeker">job Seeker</MenuItem>
            <MenuItem value="employer">Employer</MenuItem>
            <MenuItem value="vendor">vendor</MenuItem>
          </SelectBox>
        ) : (
          <SelectBox
            value={isSelect}
            icon={KeyboardArrowUpIcon}
            onChange={handleChangeSelect}
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={KeyboardArrowUpIcon}
            displayEmpty
            sx={{ "& .MuiSelect-select": { padding } }}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>

            {content?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </SelectBox>
        )}
      </FormControl>
    </>
  );
};
export default SelectDropDown;
