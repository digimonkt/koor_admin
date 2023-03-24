import { SelectInput } from "@components/input";
import { FormControl, Stack } from "@mui/material";
import React from "react";
import { StyledDataGrid } from "./style";

function DataTable({ rows, columns, limitProps }) {
  return (
    <>
      <div style={{ width: "100%", height: "500px", marginBottom: "30px" }}>
        <StyledDataGrid
          className="scrolltable"
          rows={rows}
          columns={columns}
          disableHeight={false}
          disableColumnSelector={false}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </div>
      <div className="peritemview">
        <Stack direction="row" spacing={2} alignItems="center">
          <span>Items per page:</span>{" "}
          <FormControl
            sx={{
              "&.MuiSelect-select": {
                fontFamily: "Poppins",
                fontSize: "16px",
              },
            }}
            size="small"
          >
            <SelectInput
              options={[
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 15, value: 15 },
              ]}
              {...(limitProps || {})}
            />
          </FormControl>
        </Stack>
      </div>
    </>
  );
}

export default DataTable;
