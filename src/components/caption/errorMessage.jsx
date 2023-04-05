import React from "react";
import { Typography } from "@mui/material";

function ErrorMessageComponent({ children }) {
  return (
    <Typography
      variant="caption"
      style={{ color: "red" }}
      sx={{
        "&.MuiTypography-root": {
          fontFamily: "Poppins",
          fontSize: "14px",
          fontWeight: "300",
        },
      }}
    >
      {children}
    </Typography>
  );
}

export default ErrorMessageComponent;
