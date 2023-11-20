import { styled } from "@mui/material/styles";
import { FormControl, MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import styles from "./input.module.css";
import { SVG } from "@assets/svg";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
    color: #121212;
    font-size: 16px;
    font-family: "Poppins";
    font-weight: 500;
    padding-left: 30px;
  }
  & .Mui-disabled {
    color: #848484 !important;
    -webkit-text-fill-color: #848484;
    font-weight: 300;
    padding-left: 16px;
  }

  & .MuiInputBase-root {
    border-radius: 0px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;

    letter-spacing: 0.02em;

    color: #121212;
  }
  & fieldset {
    display: none;
  }
  & .MuiSelect-icon {
    top: calc(36% - 0.2em);
    right: 11px;
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
        sx={{
          width,
          "&.MuiSelect-select": {
            fontFamily: "Poppins",
            fontSize: "16px",
            padding: `14px 34px 14px ${search ? "60px" : "20px"} !important`,
            display: "flex",
            alignItems: "center",
          },
        }}
        size="small"
        fullWidth
      >
        {search && (
          <span className="search-icon ">
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
            value && value.length !== 0
              ? undefined
              : () => {
                  return (
                    <div className={styles.placeholder}>{placeholder}</div>
                  );
                }
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
