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
  url,
  bordercolor,
  onClick
}) => {
  return (
    <>
      <Button
        onClick={() => onClick()}
        LinkComponent={Link}
        to={url}
        fullWidth
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
        }}
      >
        {children}
      </Button>
    </>
  );
};
export default Cbutton;
