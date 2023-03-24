import { Button } from "@mui/material";
import React from "react";

function OutlinedButtonComponent({
  className,
  title,
  jobSeeker,
  onClick,
  ...rest
}) {
  return (
    <Button
      variant="outlined"
      className={`outline-button ${className}`}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default OutlinedButtonComponent;
