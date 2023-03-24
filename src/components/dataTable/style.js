import styled from "@emotion/styled";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: "#121212",
  fontFamily: "Poppins",
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  fontSize: "14px",
  fontWeight: "500",

  "& .MuiDataGrid-iconSeparator": {
    color: "#274593",
  },
  "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
    display: "none",
  },

  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: "0px",
  },
  "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell": {
    whiteSpace: "normal",
    overflow: "visible",
    maxHeight: "none !important",
    minHeight: "auto !important",
    padding: "10px",
    // justifyContent: "center",
  },

  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    justifyContent: "center",
  },
  "& .MuiDataGrid-columnHeader:first-of-type .MuiDataGrid-columnHeaderTitleContainer":
    {
      justifyContent: "start",
    },
  "& .MuiDataGrid-columnHeaderDraggableContainer .MuiDataGrid-menuIcon": {
    display: "none",
  },
  ".MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer": {
    visibility: "visible",
    width: "auto",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: 0,
    background: "#D5E3F7",
    color: "#274593",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "500",
    padding: "0px 15px",
  },
  "& .MuiDataGrid-row": {
    background: "#F9F9F9",
    padding: "0px 15px",
    maxHeight: "none !important",
  },
  "& .MuiIconButton-root": {
    background: "transparent",
    color: "#274593",
  },
  "& .MuiDataGrid-footerContainer": {
    display: "none",
  },

  "& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted):hover .MuiDataGrid-sortIcon":
    {
      opacity: 1,
    },
  "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-menuIcon": {
    visibility: "hidden",
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: "#F0F0F0",
  },
}));
