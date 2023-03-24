import { Stack } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";

function OtpInputComponent({ title, labelWeight, ...rest }) {
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
      </Stack>
      <div className="showpassword" style={{ marginBottom: "20px" }}>
        <MuiOtpInput className="form-control" {...rest} />
      </div>
    </>
  );
}

export default OtpInputComponent;
