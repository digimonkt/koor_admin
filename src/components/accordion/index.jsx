import React from "react";
import {
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Accordion as MUIAccordion,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SVG } from "@assets/svg";

function Accordion({ title, onOpen, handleDelete, handleEdit, children }) {
  const accordionProps = {
    sx: {
      pointerEvents: "none",
    },
    expandIcon: (
      <ExpandMoreIcon
        onClick={onOpen}
        sx={{
          pointerEvents: "auto",
        }}
      />
    ),
  };
  return (
    <MUIAccordion elevation={0}>
      <AccordionSummary
        {...accordionProps}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="accordion-class"
      >
        <Typography
          sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "18px" }}
        >
          {title}
        </Typography>
        <div>
          {handleDelete && (
            <IconButton
              onClick={() => {
                handleDelete();
              }}
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                pointerEvents: "auto",
                width: 30,
                height: 30,
                marginRight: "16px",
                color: "#274593",
              }}
            >
              <SVG.DeleteIcon />
            </IconButton>
          )}
          {handleEdit && (
            <IconButton
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                pointerEvents: "auto",

                width: 30,
                height: 30,
                marginRight: "16px",
                color: "#274593",
              }}
              onClick={handleEdit}
            >
              <SVG.EditIcon />
            </IconButton>
          )}
        </div>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </MUIAccordion>
  );
}

export default Accordion;
