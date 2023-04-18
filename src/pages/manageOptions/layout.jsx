import DataTable from "@components/dataTable";
import OptionsFilter from "@components/optionsFilter";
import { Card, CardContent, Pagination } from "@mui/material";
import { Stack, styled } from "@mui/system";
import { useSelector } from "react-redux";
const TablePagination = styled(Pagination)(() => ({
  " &.MuiPagination-root .MuiPaginationItem-root": {
    minWidth: "36px",
    fontFamily: "Bahnschrift",
    fontSize: "16px",
    color: "#000",
    fontWeight: "400",
  },
  " &.MuiPagination-root .MuiPaginationItem-root.Mui-selected": {
    background: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
  },
  " &.MuiPagination-root .MuiPaginationItem-root .MuiPaginationItem-icon": {
    display: "none",
  },
}));
function Layout({
  rows,
  columns,
  searchProps,
  totalCount,
  handlePageChange,
  page,
  limitProps,
  inputProps,
  optionsProps,
}) {
  const { loading } = useSelector((state) => state.jobsAndTenders);

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.25, sm: 2.5 }}
        alignItems={{ xs: "start", sm: "center" }}
        sx={{ marginBottom: 2.5 }}
      >
        <OptionsFilter
          optionsProps={{ ...(optionsProps || {}) }}
          inputProps={{ ...(inputProps || {}) }}
          searchProps={{ ...(searchProps || {}) }}
        />
      </Stack>
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
          <DataTable
            rows={rows || []}
            columns={columns || []}
            limitProps={limitProps}
            getRowId={(rows) => rows.id || Math.random()}
            loader={loading}
          />
        </CardContent>
      </Card>
      <div className="pagination-custom">
        <TablePagination
          count={totalCount || 0}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </>
  );
}

export default Layout;
