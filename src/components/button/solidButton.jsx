import { Button } from "@mui/material";

function SolidButtonComponent({ title, color, ...rest }) {
  return (
    <Button
      variant="outlined"
      sx={{
        "&.MuiButton-outlined": {
          borderRadius: "5px",
          border: "0px",
          color: "black",
          fontWeight: "400",
          fontSize: "12px",
          fontFamily: "Poppins",
          padding: "5px 10px",
          background: color,
          textTransform: "capitalize",
          whiteSpace: "nowrap",
        },
      }}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default SolidButtonComponent;
