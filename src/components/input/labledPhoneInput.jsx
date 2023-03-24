import PhoneNumberInputComponent from "@components/phoneNumberInput";
import { Stack } from "@mui/material";
import React from "react";

function LabeledPhoneInputComponent({ title, subtitle, labelWeight, ...rest }) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="mb-2"
      >
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
        {subtitle ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <span className="text-gray">{subtitle}</span>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
      <div className="showpassword">
        <PhoneNumberInputComponent className="add-form-control" {...rest} />
      </div>
    </>
  );
}

export default LabeledPhoneInputComponent;
