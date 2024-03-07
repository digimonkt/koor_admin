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
import React, { useCallback, useEffect, useState } from "react";
import { OutlinedButton } from "@components/button";
import { SVG } from "@assets/svg";
import {
  getAdminListAPI,
  getUsersManageRightsAPI,
  updateUserManageRightsAPI,
} from "@api/manageUserManagement";
import SelectWithSearch from "@components/input/selectWithsearch";
import { setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";

export default function UserManagement() {
  const dispatch = useDispatch();
  const [userManageData, setUserManageData] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [adminId, setAdminId] = useState("");

  const getAdminList = async () => {
    const response = await getAdminListAPI();
    if (response.remote === "success") {
      setAdminList(response.data);
    }
  };

  const handleAdminId = (id) => {
    setAdminId(id);
    handleUpdateData(id);
  };

  const handleUpdateData = useCallback(
    async (id) => {
      const response = await getUsersManageRightsAPI(id);
      if (response.remote === "success") {
        setUserManageData(() => {
          return response.data || [];
        });
      }
    },
    [setUserManageData, adminId],
  );

  const handleSubmit = async () => {
    const selectedIds = userManageData.reduce((acc, item) => {
      item.sub_rights.forEach((subitem) => {
        if (subitem.status) {
          acc.push(subitem.id);
        }
      });
      return acc;
    }, []);

    const formData = new FormData();

    selectedIds.forEach((id) => {
      formData.append("rights", id);
    });

    const res = await updateUserManageRightsAPI(adminId, formData);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Rights updated successfully"));
    }
  };

  const handleSubRights = (e, RightsId, SubRightsId) => {
    setUserManageData((prev) =>
      prev.map((item) => {
        if (item.id === RightsId) {
          return {
            ...item,
            sub_rights: item.sub_rights.map((subitem) => {
              if (subitem.id === SubRightsId) {
                return {
                  ...subitem,
                  status: e,
                };
              }
              return subitem;
            }),
          };
        }
        return item;
      }),
    );
  };

  const options = adminList.map((item) => ({
    value: item.id,
    label: item.name || item.email,
  }));

  console.log(userManageData);
  useEffect(() => {
    getAdminList();
  }, []);
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
                <SelectWithSearch
                  sx={{
                    borderRadius: "10px",
                    background: "#F0F0F0",
                    fontFamily: "Poppins !important",

                    "& fieldset": {
                      border: "1px solid #cacaca",
                      borderRadius: "93px",
                      display: "none",
                      "&:hover": { borderColor: "#cacaca" },
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#121212",
                      fontFamily: "Poppins !important",
                      padding: "4px 9px !important",
                      fontWeight: "500 !important",
                      "@media (max-width: 992px)": {
                        fontSize: "14px !important",
                      },
                      "@media (max-width: 480px)": {
                        fontSize: "12px !important",
                      },
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: "16px",
                      color: "#848484",
                      fontFamily: "Poppins !important",
                      transform: "translate(14px, 12px) scale(1)",
                    },
                    "& .MuiInputLabel-shrink": {
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                  }}
                  options={options}
                  title={"select the options"}
                  onChange={(_, value) => {
                    handleAdminId(value?.value);
                  }}
                  {...options}
                />
              </Box>
              {/* <JobFormControl */}
              {/*   sx={{ "& .MuiFormControlLabel-label": { fontSize: "16px" } }} */}
              {/*   className="update_checkbox" */}
              {/*   control={<CheckboxInput sx={{ padding: "9px 5px" }} />} */}
              {/*   label="Select all user rights" */}
              {/* /> */}
            </Stack>
            {userManageData.map((item) => (
              <>
                <Box key={item.id} sx={{ display: adminId ? "block" : "none" }}>
                  <JobFormControl
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "20px",
                        fontWeight: "600",
                        fontFamily: "Bahnschrift",
                      },
                    }}
                    label={item.title}
                    control={<CheckboxInput sx={{ display: "none" }} />}
                  />
                  <Box>
                    <Grid container spacing={2}>
                      {item.sub_rights.map((subitem) => (
                        <Grid xs={6} lg={4} md={6} sm={6} key={subitem.id} item>
                          <FormGroup>
                            <JobFormControl
                              key={subitem.id}
                              sx={{
                                "& .MuiFormControlLabel-label": {
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  display: "block",
                                },
                              }}
                              label={subitem.title}
                              control={
                                <CheckboxInput
                                  defaultChecked={subitem.status}
                                  onChange={(e) =>
                                    handleSubRights(
                                      e?.target?.checked,
                                      item.id,
                                      subitem.id,
                                    )
                                  }
                                />
                              }
                            />
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
                disabled={!adminId}
                onClick={handleSubmit}
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
