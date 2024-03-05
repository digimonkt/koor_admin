import { Checkbox } from "@mui/material";
import React from "react";
import { SVG } from "@assets/svg";

function CheckboxInputComponent({ onChange, defaultChecked = false, ...rest }) {
  return (
    <Checkbox
      checked={defaultChecked}
      onChange={onChange}
      disableRipple
      icon={<SVG.UncheckIcon />}
      checkedIcon={<SVG.CheckBoxIcon />}
      sx={{
        color: "#CACACA",
        transition: "all 0.5s ease-out",
        padding: "9px 10px",
        "&.Mui-checked": {
          color: "#274593",
          transition: "all 0.5s ease-out",
        },
      }}
      {...rest}
    />
  );
}

export default CheckboxInputComponent;
