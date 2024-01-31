import { SelectInput } from "@components/input";
import { Box, FormControl, Stack } from "@mui/material";
import { StyledDataGrid } from "./style";
import { useEffect } from "react";
import { incrementPage } from "@utils/common";

function DataTable({ rows, columns, limitProps, loader, page, NoFoundText }) {
  console.log("rows", columns);
  useEffect(() => {
    if (rows.length) {
      const startIndex = (page - 1) * limitProps.value + 1;
      incrementPage({ page, rows, startIndex });
    }
  }, [page, rows]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "625px",
          overflowY: "hidden",
          overflowX: "auto",
          marginBottom: "30px",
          "@media (max-width:320px)": {
            width: "320px",
          },
        }}
      >
        <StyledDataGrid
          className="scrolltable"
          rows={rows}
          columns={columns}
          loading={loader}
          disableHeight={false}
          disableColumnSelector={false}
          localeText={NoFoundText ?? { noRowsLabel: "No rows found" }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>
      <div className="peritemview">
        <Stack direction="row" spacing={2} alignItems="center">
          <span>Items per page:</span>{" "}
          <FormControl
            sx={{
              "& .MuiSelect-select": {
                fontFamily: "Poppins",
                fontSize: "14px",
                color: "#121212 !important",
                padding: "7px 40px 5px 15px !important",

                "@media (max-width: 992px)": {
                  fontSize: "14px",
                },

                "@media (max-width: 480px)": {
                  fontSize: "12px",
                },
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
