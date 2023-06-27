import React from "react";
import { styled } from "@mui/material/styles";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FormControl, MenuItem, Select } from "@mui/material";
export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #ffffff;
    border-radius: 10px;
    padding: 6px 15px;
    border: 1px solid #cacaca;
    color: #121212;
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
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    letter-spacing: 0.02em;

    color: #848484;
  }
  & fieldset {
    display: none;
  }
`;
const SelectOption = ({ content, onChange, value }) => {
  const handleChangeSelect = (event) => {
    const value = event.target.value;
    onChange(value);
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
        <SelectBox
          value={value}
          icon={KeyboardArrowUpIcon}
          onChange={handleChangeSelect}
          inputProps={{ "aria-label": "Without label" }}
          IconComponent={KeyboardArrowUpIcon}
          displayEmpty
        >
          {content?.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </SelectBox>
      </FormControl>
    </>
  );
};
export default SelectOption;
