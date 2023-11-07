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
          fontSize: "16px",
          fontFamily: "Poppins",
          padding: "5px 10px",
          background: color,
          textTransform: "capitalize",
          whiteSpace: "nowrap",
          "@media (max-width: 992px)": {
            fontSize: "14px",
          },
          "@media (max-width: 480px)": {
            fontSize: "12px",
          },
        },
      }}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default SolidButtonComponent;
