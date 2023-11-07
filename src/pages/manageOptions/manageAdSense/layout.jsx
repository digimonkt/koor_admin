import React from "react";
// import { SearchInput } from "@components/input";
import { SolidButton } from "@components/button";
import { Card, CardContent, Pagination, Stack } from "@mui/material";
import styled from "@emotion/styled";
import DataTable from "@components/dataTable";
const loading = false;
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

const Layout = ({
    children,
    title,
    searchProps,
    addBtnTitle,
    onAddItems,
    countryInput,
    selectList,
    addItems,
    limitProps,
    totalCount,
    page,
    handlePageChange,
    optionsProps,
    rows,
    columns
}) => {
    return (
        <>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.25, sm: 2.5 }}
                alignItems={{ xs: "start", sm: "center" }}
                sx={{ marginBottom: 2.5 }}
            >
                {/* <SearchInput widthInput="100%" {...searchProps} /> */}
                <SolidButton
                    align="right"
                    sx={{
                        background: "#fff",
                        borderRadius: "73px",
                        border: "solid 1px ",
                        fontFamily: "Bahnschrift",
                        color: "#274593",
                        padding: "10px 30px",
                        fontWeight: 600,
                        "&:hover": {
                            background: "#f7f7f7",
                            borderColor: "#f7f7f7",
                        },
                        "@media(min-width:992px)": {
                            width: "40%",
                            height: "50px",
                        },
                    }}
                    title={addBtnTitle}
                    onClick={onAddItems}
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
                        page={page}
                    />
                    <div className="pagination-custom">
                        <TablePagination
                            count={totalCount || 0}
                            page={page}
                            onChange={handlePageChange}
                            shape="rounded"
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default Layout;
