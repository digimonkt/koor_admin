import { styled } from "@mui/material/styles";
import { FormControl, MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import styles from "./input.module.css";
import { SVG } from "@assets/svg";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #ffffff;
    border-radius: 100px;
    padding: 14px 34px 14px 60px;
    border: 1px solid #cacaca;
    color: #848484;
  }
  & .MuiSelect-select:focus {
    border-radius: 100px;
  }
  & .MuiSelect-icon {
    right: 15px;
    color: #848484;
  }
  ,
  &.MuiInputBase-root {
    border-radius: 100px;
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

function SelectInputComponent({
  title,
  labelWeight,
  options,
  value,
  placeholder,
  style,
  width,
  search,
  ...rest
}) {
  return (
    <>
      {title ? (
        <label
          className="mb-1 d-inline-block"
          style={{
            fontWeight: labelWeight,
          }}
        >
          {title}
        </label>
      ) : (
        ""
      )}
      <FormControl
        // className={`iconsize-select ${className} `}
        sx={{
          width,
          "&.MuiSelect-select": {
            fontFamily: "Poppins",
            fontSize: "16px",
            padding: `14px 34px 14px ${search ? "60px" : "20px"} !important`,
          },
        }}
        size="small"
        fullWidth
      >
        {search && (
          <span className="search-icon">
            <SVG.LocationIcon />
          </span>
        )}
        <SelectBox
          inputProps={{ "aria-label": "Without label" }}
          IconComponent={KeyboardArrowDownIcon}
          displayEmpty
          value={value}
          sx={{
            "&.MuiSelect-select": {
              padding: `14px 34px 14px ${search ? "60px" : "20px"} !important`,
            },
          }}
          renderValue={
            value !== ""
              ? undefined
              : () => <div className={styles.placeholder}>{placeholder}</div>
          }
          {...rest}
        >
          {options.map((option) => {
            return (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </SelectBox>
      </FormControl>
    </>
  );
}

export default SelectInputComponent;
