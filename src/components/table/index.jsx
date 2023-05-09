import React from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function Table({ columns, rows, sx }) {
  return (
    <MUITable sx={{ minWidth: 650, ...(sx || {}) }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map(({ title, key, ...rest }) => (
            <TableCell key={key} {...rest}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => {
          return (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {columns.map(({ key, ...rest }) => {
                return (
                  <TableCell component="th" scope="row" key={key} {...rest}>
                    {row[key]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MUITable>
  );
}

export default Table;
