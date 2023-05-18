import Table from "@components/table";
import { IconButton } from "@mui/material";
import { SVG } from "@assets/svg";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SubCategories = ({ countryId, handleDeleteSub, handleEditSub }) => {
  const { subCategories } = useSelector((state) => state.choice);
  // console.log({ subCategories });
  const [rows, setRows] = useState([]);
  const columns = [
    { title: "Name", key: "name" },
    { title: "Action", key: "action", align: "right" },
  ];
  useEffect(() => {
    const newSubCategory = subCategories.data[countryId] || [];
    const rows = [];
    newSubCategory.forEach((newSubCategory) => {
      rows.push({
        name: newSubCategory.title,
        action: (
          <>
            <IconButton onClick={() => handleEditSub(newSubCategory)}>
              <SVG.EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteSub(newSubCategory)}>
              <SVG.DeleteIcon />
            </IconButton>
          </>
        ),
      });
    });
    setRows([...rows]);
  }, [subCategories.data[countryId]]);
  return <Table columns={columns} rows={rows} />;
};
export default SubCategories;
