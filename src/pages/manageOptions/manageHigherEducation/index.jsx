import React from "react";
import Layout from "../layout";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
function manageHigherEducation() {
  const columns = [
    {
      id: "1",
      field: "no",
      headerName: "No",
      sortable: true,
    },

    {
      field: "name",
      headerName: "Name",
      sortable: true,
      width: 180,
      id: "3",
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (item) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <>
              <IconButton
                // onClick={() => {
                //   activeDeActiveUser(item);
                // }}
                sx={{
                  "&.MuiIconButton-root": {
                    background: item.row.action ? "#D5E3F7" : "#D42929",
                  },
                  width: 30,
                  height: 30,
                  color: "#274593",
                }}
              >
                {item.row.action ? <SVG.ToggleOffIcon /> : <SVG.ToggleOnIcon />}
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
              // onClick={() => setDeleting(item.row.id)}
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
  const rows = [
    {
      action: true,
      id: "fd5d0970-52d4-4cd9-a629-097b3dc0f7a9",
      name: "test",
      no: 1,
    },
  ];
  return (
    <>
      <Layout
        rows={rows}
        columns={columns}
        searchProps={{
          placeholder: "Search Higher Education",
          // onChange: (e) => setSearchTerm(e.target.value),
          // value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Add Higher Education",
        }}
        limitProps={{
          value: 5,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          // onChange: (e) => setLimit(e.target.value),
        }}
        optionsProps={{
          title: (
            <div>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Higher Education
            </div>
          ),
        }}
      />
    </>
  );
}

export default manageHigherEducation;
