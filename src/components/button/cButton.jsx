import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Cbutton = ({
  bgcolor,
  props,
  hoverColor,
  color,
  hoverBgColor,
  children,
  hoverborderColor,
  padding,
  disabled = false,
  url,
  bordercolor,
  onClick,
  sx,
}) => {
  return (
    <>
      <Button
        onClick={() => onClick()}
        LinkComponent={Link}
        to={url}
        fullWidth
        disabled={disabled}
        variant="outlined"
        {...props}
        sx={{
          background: bgcolor,
          borderRadius: "73px",
          border: `1px solid ${bordercolor}`,
          fontFamily: "Bahnschrift",
          fontSize: "16px",
          color,
          padding,
          fontWeight: 600,
          "&:hover": {
            background: hoverBgColor,
            borderColor: hoverborderColor,
            color: hoverColor,
          },
          ...(sx || {}),
        }}
      >
        {children}
      </Button>
    </>
  );
};
export default Cbutton;
