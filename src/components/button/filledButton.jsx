import { Button } from "@mui/material";

function FilledButtonComponent({ className, title, onClick, ...rest }) {
  return (
    <Button
      className={`outline-login ${className} bluebtn}`}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default FilledButtonComponent;
