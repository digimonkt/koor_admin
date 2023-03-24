import PhoneNumberInputComponent from "@components/phoneNumberInput";
import { Stack } from "@mui/material";
import React from "react";

function HorizontalPhoneInputComponent({ label, ...rest }) {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: 2, lg: 2 }}
      alignItems={{ xs: "start", lg: "center" }}
      className="mb-3"
    >
      <label className="w-30">{label}</label>
      <div className="w-70">
        <div className="showpassword">
          <PhoneNumberInputComponent className="add-form-control" {...rest} />
        </div>
      </div>
    </Stack>
  );
}

export default HorizontalPhoneInputComponent;
