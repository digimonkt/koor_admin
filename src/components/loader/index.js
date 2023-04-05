import { CircularProgress, Fade } from "@mui/material";
import React from "react";

function Loader({ loading, style }) {
  return (
    <Fade
      in={loading}
      style={{
        transitionDelay: loading ? "200ms" : "0ms",
        width: "25px",
        height: "25px",
        ...(style || {}),
      }}
      unmountOnExit
    >
      <CircularProgress />
    </Fade>
  );
}

export default Loader;
