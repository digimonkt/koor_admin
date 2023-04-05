import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import Layout from "../layout";
import { activeInactiveUser, deleteUser, manageEmployer } from "@api/employers";

function ManageEmployerComponent() {
  const [employerTable, setEmployerTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [isChecked, setIsChecked] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const employerList = async (keyword, countrySearch) => {
    const page = pages;
    const search = keyword || "";
    const country = countrySearch || "";
    const response = await manageEmployer(limit, page, search, country);
    if (response.remote === "success") {
      const formateData = formattedData(response.data.results);
      setEmployerTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    employerList();
  }, []);

  function formattedData(apiData) {
    const newData = apiData.map((item, index) => {
      const payload = {
        ids: item.id,
        no: index + 1,
        id: index + 1,
        name: item.name,
        email: item.email,
        mobilenumber: item.mobile_number,
        action: item.is_active,
      };
      return payload;
    });
    return newData;
  }

  const handleDeleteEmployer = async (item) => {
    const id = item.row.ids;
    const response = await deleteUser(id);
    if (response.remote === "success") {
      const newEmployerTable = employerTable.filter(
        (emp) => emp.ids !== item.id
      );
      const formateData = formattedData(newEmployerTable);
      setEmployerTable(formateData);
    } else {
      console.log(response.error);
    }
  };

  const columns = [
    {
      id: "1",
      field: "no",
      headerName: "No",
      sortable: true,
    },

    {
      field: "name",
      headerName: "Name",
      sortable: true,
      width: 180,
      id: "3",
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 180,
    },
    {
      field: "mobilenumber",
      headerName: "Mobile number",
      sortable: true,
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (item) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <>
              <IconButton
                onClick={(e) => {
                  activeDeactiveUser(e, item);
                }}
                sx={{
                  "&.MuiIconButton-root": {
                    // background: isChecked ? "#D42929" : "#D5E3F7",
                    background: "#D5E3F7",
                  },
                  width: 30,
                  height: 30,
                  color: "#274593",
                }}
              >
                {/* {isChecked ? <SVG.ToggleOnIcon /> : <SVG.ToggleOffIcon />} */}
                <SVG.ToggleOffIcon />
              </IconButton>
            </>

            <IconButton
              onClick={handleClickEyes}
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}
            >
              <SVG.EyeIcon />
            </IconButton>
            <IconButton
              onClick={(e) => handleDeleteEmployer(item)}
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}
            >
              <SVG.DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const handleClickEyes = () => {
    window.open("/manage-employers", "_blank");
  };

  const searchJobs = (e) => {
    const keyword = e.target.value;
    employerList(keyword, "");
  };

  function getPage(event, page) {
    setPages(page);
  }

  const filterJobs = (e) => {
    const countrySearch = e.target.value;
    employerList("", countrySearch);
  };

  const activeDeactiveUser = async (item, action) => {
    const id = item.row.ids;
    const response = await activeInactiveUser(id);
    if (response.remote === "success") {
      const update = [...employerTable].map((i) => {
        if (i.ids === item.row.ids) {
          i.action = action;
        }
        return i;
      });
      setEmployerTable(update);
      console.log(response.data);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    employerList();
  }, [pages, limit]);
  return (
    <>
      <Layout
        rows={employerTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        page={pages}
        searchProps={{
          placeholder: "Search Employers",
          onChange: (e) => searchJobs(e),
        }}
        selectProps={{ onChange: (e) => filterJobs(e) }}
        limitProps={{
          value: limit,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          onChange: (e) => setLimit(e.target.value),
        }}
        csvProps={{
          title: (
            <>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>
              Export CSV
            </>
          ),
        }}
      />
    </>
  );
}

export default ManageEmployerComponent;
