import {
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Accordion as MUIAccordion,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { SVG } from "@assets/svg";

function Accordion({ title, onOpen, handleDelete, handleEdit, children }) {
  return (
    <MUIAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={onOpen} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="accordion-class"
      >
        <Typography>{title}</Typography>
        {handleDelete && (
          <IconButton
            sx={{
              "&.MuiIconButton-root": {
                background: "#D5E3F7",
              },
              width: 30,
              height: 30,
              marginRight: "16px",
              color: "#274593",
            }}
            onClick={handleDelete}
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
              width: 30,
              height: 30,
              marginRight: "16px",
              color: "#274593",
            }}
            onClick={handleEdit}
          >
            <SVG.DeleteIcon />
          </IconButton>
        )}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MUIAccordion>
  );
}

export default Accordion;
