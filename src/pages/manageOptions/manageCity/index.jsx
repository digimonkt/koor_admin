// import { DeleteCard, EditCard } from "@components/card";
// import DialogBox from "@components/dialogBox";
// import React, { useEffect, useState } from "react";
// import Layout from "../layout";
// import { IconButton, Stack } from "@mui/material";
// import { SVG } from "@assets/svg";
// import { useSelector } from "react-redux";
// import { transformOptionsResponse } from "@api/transform/choices";

const ManageCity = () => {
  // const columns = [
  //   {
  //     id: "1",
  //     field: "no",
  //     headerName: "No",
  //     sortable: true,
  //   },

  //   {
  //     field: "name",
  //     headerName: "Name",
  //     sortable: true,
  //     width: 180,
  //     id: "3",
  //   },

  //   {
  //     field: "action",
  //     headerName: "Action",
  //     sortable: false,
  //     renderCell: (item) => {
  //       return (
  //         <Stack direction="row" spacing={1} alignItems="center">
  //           <IconButton
  //             //   onClick={() => setDeleteEducation(item.row.id)}
  //             sx={{
  //               "&.MuiIconButton-root": {
  //                 background: "#D5E3F7",
  //               },
  //               width: 30,
  //               height: 30,
  //               color: "#274593",
  //             }}
  //           >
  //             <SVG.DeleteIcon />
  //           </IconButton>

  //           <IconButton
  //             //   onClick={() => handleEdit(item.row)}
  //             sx={{
  //               "&.MuiIconButton-root": {
  //                 background: "#D5E3F7",
  //               },
  //               width: 30,
  //               height: 30,
  //               color: "#274593",
  //             }}
  //           >
  //             <SVG.EditIcon />
  //           </IconButton>
  //         </Stack>
  //       );
  //     },
  //   },
  // ];

  // const { countries } = useSelector((state) => state.choice);
  // const [country, setCountry] = useState({});
  // const [countryValue, setCountryValue] = useState({});

  // const filterJobsCountry = (e) => {
  //   const countryId = e.target.value;
  //   const country = countries.data.find((country) => country.id === countryId);
  //   setCountry(country);
  // };

  // function getCountries() {
  //   const formateData = transformOptionsResponse(countries.data);
  //   setCountryValue(formateData);
  // }

  // useEffect(() => {
  //   getCountries();
  // }, [countries]);

  return (
    <>
      <h1>Manage City</h1>
      {/* <Layout
        city
        rows={countryValue}
        columns={columns}
        // totalCount={totalCount}
        // handlePageChange={getPage}
        searchProps={{
          placeholder: "Search  Education",
          // onChange: (e) => setSearchTerm(e.target.value),
          // value: searchTerm,
        }}
        // inputProps={{
        //   type: "text",
        //   placeholder: "Add  Education",
        //   // onChange: (e) => setAddEducation(e.target.value),
        //   // value: addEducation,
        // }}
        selectProps={{
          onChange: (e) => filterJobsCountry(e),
          value: country.id || "",
        }}
        selectPropsCities={{
          onChange: (e) => filterJobsCountry(e),
          value: country.id || "",
        }}
        limitProps={{
          // value: limit,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          // onChange: (e) => setLimit(e.target.value),
        }}
        optionsProps={{
          // onClick={addEducationFunction}
          title: (
            <div>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Education
            </div>
          ),
        }}
      />

      <DialogBox
      //   open={!!deleteEducation}
      //   handleClose={() => setDeleteEducation("")}
      >
        <DeleteCard
          title="Delete Category"
          content="Are you sure you want to delete Category?"
          // handleCancel={() => setDeleteEducation("")}
          // handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox
      //   open={!!editEducation}
      //   handleClose={() => setEditEducation("")}
      >
        <EditCard
          title="Edit Category"
          // handleCancel={() => setEditEducation("")}
          // setEditValue={setEditEducationValue}
          // editValue={editEducationValue}
          // handleUpdate={handleUpdate}
        />
      </DialogBox> */}
    </>
  );
};

export default ManageCity;
