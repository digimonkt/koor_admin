import { Stack } from "@mui/material";
import React from "react";
import DateInputComponent from "../dateInput";

function HorizontalDateInputComponent({ label, ...rest }) {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: 2, lg: 2 }}
      alignItems={{ xs: "start", lg: "center" }}
      className="mb-3"
    >
      <label className="w-30">{label}</label>
      <div className="w-70">
        <DateInputComponent label={label} {...rest} />
      </div>
    </Stack>
  );
}

export default HorizontalDateInputComponent;
