import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import React from "react";
import Layout from "../layout";

function ManageCandidatesComponent() {
  const columns = [
    {
      id: "1",
      field: "no",
      headerName: "No",
      sortable: true,
    },
    {
      field: "company",
      headerName: "Company",
      sortable: true,
      width: 180,
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      width: 180,
      id: "3",
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 180,
    },
    {
      field: "mobilenumber",
      headerName: "Mobile number",
      sortable: true,
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: () => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <>
              <IconButton
                sx={{
                  "&.MuiIconButton-root": {
                    // background: isChecked ? "#D42929" : "#D5E3F7",
                    background: "#D5E3F7",
                  },

                  width: 30,
                  height: 30,
                  color: "#274593",
                }}
              >
                {/* {isChecked ? <SVG.ToggleOnIcon /> : <SVG.ToggleOffIcon />} */}
                <SVG.ToggleOffIcon />
              </IconButton>
            </>

            <IconButton
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}
            >
              <SVG.EyeIcon />
            </IconButton>
            <IconButton
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}
            >
              <SVG.DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  return (
    <>
      <Layout
        rows={[]}
        columns={columns}
        searchProps={{
          placeholder: "Search Candidates",
        }}
        csvProps={{
          title: (
            <>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>
              Export CSV
            </>
          ),
        }}
      />
    </>
  );
}

export default ManageCandidatesComponent;
