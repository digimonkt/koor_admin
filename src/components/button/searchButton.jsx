import { SVG } from "@assets/svg";
import { Button } from "@mui/material";
import React from "react";

export default function SearchButtonComponent({
  leftIcon,
  text,
  className,
  handleCross,
  ...rest
}) {
  return (
    <div>
      <Button className={className} {...rest}>
        <span>{leftIcon}</span>
        {text}
        {handleCross ? (
          <span className="close_icon_circle" onClick={handleCross}>
            <SVG.CrossCircle />
          </span>
        ) : (
          ""
        )}
      </Button>
    </div>
  );
}
