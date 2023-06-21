// import React, { useEffect, useState } from "react";
import { SelectInput } from "@components/input";
import { FormControl, Stack } from "@mui/material";
import { StyledDataGrid } from "./style";
import { useEffect } from "react";
import { incrementPage } from "@utils/common";

function DataTable({ rows, columns, limitProps, loader, page }) {
  useEffect(() => {
    if (rows.length) {
      incrementPage({ page, rows });
    }
  }, [page, rows]);
  return (
    <>
      <div style={{ width: "100%", height: "500px", marginBottom: "30px" }}>
        <StyledDataGrid
          className="scrolltable"
          rows={rows}
          columns={columns}
          loading={loader}
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
              "& .MuiSelect-select": {
                fontFamily: "Poppins",
                fontSize: "16px",
                padding: "7px 40px 5px 15px !important",
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
