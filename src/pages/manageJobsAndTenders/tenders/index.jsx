import { SVG } from "@assets/svg";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Layout from "../layout";

function ManageTendersComponent() {
  const columns = [
    {
      field: "no",
      headerName: "No",
      sortable: true,
    },
    {
      field: "id",
      headerName: "ID",

      sortable: true,
    },
    {
      field: "jobtitle",
      headerName: "Job title",
      width: "220",
      sortable: true,
    },
    {
      field: "company",
      headerName: "Company",
      width: 220,
      sortable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: "130",
      sortable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: true,
      renderCell: () => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
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
              <SVG.HoldIcon />
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
        job
        rows={[]}
        columns={columns}
        searchProps={{
          placeholder: "Search Tenders",
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
        jobProps={{
          title: (
            <>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>{" "}
              Post new Tender
            </>
          ),
        }}
      />
    </>
  );
}

export default ManageTendersComponent;
