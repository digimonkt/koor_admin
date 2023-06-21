import { SVG } from "@assets/svg";
import { Minimize } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ShowFAQ = () => {
  return (
    <Card
      sx={{
        "&.MuiCard-root": {
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
          marginBottom: "100px",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          mb: {
            xs: 1,
            sm: 1,
            md: 3.75,
            lg: 3.75,
            xl: 3.75,
          },
        }}
      >
        <IconButton LinkComponent={Link} to="/manage-faq">
          <SVG.ArrowLeftIcon />
        </IconButton>{" "}
        <h2>Manage FAQ</h2>
      </Stack>
      <CardContent
        sx={{
          "&.MuiCardContent-root": {
            p: {
              xs: 2,
              sm: 1,
              md: 3.75,
              lg: 3.75,
              xl: 3.75,
            },
          },
        }}
      />
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          mb: {
            xs: 1,
            sm: 1,
            md: 3.75,
            lg: 3.75,
            xl: 3.75,
          },
        }}
      >
        <Grid container spacing={{ xs: 0, lg: 3, sm: 3, md: 3 }}>
          <Grid item lg={6} sm={6} xs={12}>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<Minimize />}
                  aria-controls={"panel-content"}
                  id={"panel-header"}
                >
                  <Typography>
                    Questions
                    <div style={{ float: "right", marginLeft: "300px" }}>
                      <SVG.DeleteIcon />
                      <SVG.EditIcon />
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Answers</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default ShowFAQ;
