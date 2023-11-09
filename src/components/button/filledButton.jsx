import { Button } from "@mui/material";

function FilledButtonComponent({ className, title, onClick, sx, ...rest }) {
  return (
    <Button
      sx={{
        padding: "10px 30px",
        ...(sx || {}),
      }}
      className={`outline-login ${className} bluebtn}`}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default FilledButtonComponent;
