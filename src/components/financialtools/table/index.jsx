import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D5E3F7",
    color: "#274593",
    fontSize: 18,
    fontWeight: 500,
    fontFamily: "Poppins",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#121212",
    fontWeight: 400,
    fontFamily: "Poppins",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F9F9F9",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F0F0F0",
  },
  // hide last border
  "& td, & th": {
    border: 0,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomTable = ({ rows, columns, radius }) => {
  return (
    <>
      <TableContainer sx={{ borderRadius: radius }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {(columns || []).map((data) => (
                <StyledTableCell
                  align="center"
                  sx={{ width: data.width }}
                  key={data.id}
                  className="text-nowrap dividers_line"
                >
                  {data.name}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows || []).map((row) => (
              <StyledTableRow
                hover={true}
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {(columns || []).map((data, index) => {
                  return (
                    <StyledTableCell
                      className={data.tableCellClass}
                      key={index}
                    >
                      {row[data.key]}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default CustomTable;
