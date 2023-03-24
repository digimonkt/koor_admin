import { Stack } from "@mui/material";
import React from "react";
import SelectInputComponent from "../selectInput";
/**
 *
 * @param {label} param0 string
 * @params {type} param1 select
 * @returns
 */
function HorizontalLabelInputComponent({ label, type, options, ...rest }) {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: 2, lg: 2 }}
      alignItems={{ xs: "start", lg: "center" }}
      className="mb-3"
    >
      <label className="w-30">{label}</label>
      <div className="w-70">
        {type === "select" ? (
          <SelectInputComponent options={options || []} {...rest} />
        ) : type === "textarea" ? (
          <textarea className="form-control-area" {...rest}></textarea>
        ) : (
          <div className="showpassword">
            <input className="add-form-control" {...rest} />
          </div>
        )}
      </div>
    </Stack>
  );
}

export default HorizontalLabelInputComponent;
