import { SVG } from "@assets/svg";
import { Stack } from "@mui/material";
import React from "react";
import styles from "./style.module.css";
function SearchInputComponent({ placeholder, widthInput, ...rest }) {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      className={`${styles.search_box} ${widthInput}`}
      alignItems="center"
    >
      <SVG.SearchIcon />
      <input
        className={`${styles.FormControl}`}
        type="text"
        placeholder={placeholder}
        {...rest}
      />
      <button className={`${styles.btn} searchIcon_Jobs`}>
        <SVG.SearchRightIcon/>
      </button>
    </Stack>
  );
}

export default SearchInputComponent;
