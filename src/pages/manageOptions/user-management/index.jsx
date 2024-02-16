import { CheckboxInput } from "@components/input";
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormGroup,
  Grid,
  Stack,
} from "@mui/material";
import { JobFormControl } from "@pages/manageJobsAndTenders/tenders/postTender/style";
import React from "react";
import { userManageData } from "./helper";
import { OutlinedButton } from "@components/button";
import { SVG } from "@assets/svg";

export default function UserManagement() {
  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "30px",
            },
          }}
        >
          <div className="report">
            <h2>Manage users rights</h2>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
              className="form-content"
              sx={{ mb: 2.5 }}
            >
              <Box sx={{ width: "300px" }}>
                <label className="mb-1 d-inline-block">User ID</label>
                <input className="add-form-control" placeholder="RSadmin05" />
              </Box>
              <JobFormControl
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "16px" } }}
                className="update_checkbox"
                control={<CheckboxInput sx={{ padding: "9px 5px" }} />}
                label="Select all user rights"
              />
            </Stack>
            {userManageData.map((item) => (
              <>
                {" "}
                <Box key={item.id}>
                  <JobFormControl
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "20px",
                        fontWeight: "600",
                        fontFamily: "Bahnschrift",
                      },
                    }}
                    label={item.title}
                    control={<CheckboxInput />}
                  />
                  <Box>
                    <Grid container spacing={2}>
                      {item.childern.map((subitem) => (
                        <Grid xs={6} lg={4} md={6} sm={6} key={subitem.id} item>
                          <FormGroup>
                            {subitem.childern.map((items) => (
                              <JobFormControl
                                key={items.id}
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    display: "block",
                                  },
                                }}
                                label={items.label}
                                control={<CheckboxInput />}
                              />
                            ))}
                          </FormGroup>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
              </>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <OutlinedButton
                title={
                  <>
                    <div style={{ marginTop: "6px", marginRight: "8px" }}>
                      <SVG.PriorityIcon />
                    </div>
                    <div>Save changes</div>
                  </>
                }
                sx={{
                  borderRadius: "73px",
                  border: "1px solid #D5E3F7 !important",
                  color: "#274593",
                  fontWeight: "500",
                  fontSize: "16px",
                  fontFamily: "Bahnschrift",
                  background: "#D5E3F7",
                  px: 3,
                }}
              />
            </Box>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
