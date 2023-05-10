import Table from "@components/table";
import { IconButton } from "@mui/material";
import { SVG } from "@assets/svg";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SubCategories = ({ countryId }) => {
  const { cities } = useSelector((state) => state.choice);
  const [rows, setRows] = useState([]);
  const columns = [
    { title: "Name", key: "name" },
    { title: "Action", key: "action", align: "right" },
  ];
  useEffect(() => {
    const newCities = cities.data[countryId] || [];
    const rows = [];
    newCities.forEach((newCity) => {
      rows.push({
        name: newCity.title,
        action: (
          <IconButton onClick={() => console.log(newCity.id)}>
            <SVG.DeleteIcon />
          </IconButton>
        ),
      });
    });
    setRows([...rows]);
  }, [cities.data[countryId]]);
  return <Table columns={columns} rows={rows} />;
};
export default SubCategories;
