import React, { useCallback } from "react";
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
  const handleIconClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (handleDelete) {
        handleDelete();
      }
    },
    [handleDelete]
  );

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
    IconButtonProps: {
      onClick: () => handleDelete(),
    },
  };
  return (
    <>
      <MUIAccordion TransitionProps={{ unmountOnExit: true }} elevation={0}>
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
                onClick={(e) => handleIconClick(e)}
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
                onClick={(e) => handleIconClick(e)}
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
                <SVG.EditIcon />
              </IconButton>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </MUIAccordion>
    </>
  );
}

export default Accordion;
