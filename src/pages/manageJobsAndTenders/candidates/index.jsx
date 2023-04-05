import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import Layout from "../layout";
import { manageCandidate } from "@api/candidate";
import { activeInactiveUser, deleteUser } from "@api/employers";
import DialogBox from "@components/dialogBox";
import DeleteCard from "@components/deleteCard";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
function ManageCandidatesComponent() {
  const dispatch = useDispatch();
  const [candidateTable, setCandidateTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleting, setDeleting] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const candidateList = async (keyword, countrySearch) => {
    const page = pages;
    const search = keyword || "";
    const country = countrySearch || "";
    const response = await manageCandidate(limit, page, search, country);
    if (response.remote === "success") {
      const formateData = formattedData(response.data.results);
      setCandidateTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

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
                onClick={() => {
                  activeDeactiveUser(item);
                }}
                sx={{
                  "&.MuiIconButton-root": {
                    background: item.row.action ? "#D5E3F7" : "#D42929",
                  },
                  width: 30,
                  height: 30,
                  color: "#274593",
                }}
              >
                {item.row.action ? <SVG.ToggleOffIcon /> : <SVG.ToggleOnIcon />}
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
              onClick={() => setDeleting(item.row.ids)}
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

  function getPage(event, page) {
    setPages(page);
  }

  const searchJobs = (e) => {
    const keyword = e.target.value;
    candidateList(keyword, "");
  };

  const filterJobs = (e) => {
    const countrySearch = e.target.value;
    candidateList("", countrySearch);
  };

  const handleClickEyes = () => {
    window.open("/manage-candidates", "_blank");
  };

  const activeDeactiveUser = async (item) => {
    const id = item.row.ids;
    const response = await activeInactiveUser(id);
    if (response.remote === "success") {
      const update = [...candidateTable].map((i) => {
        if (i.ids === item.row.ids) {
          i.action = !i.action;
        }
        return i;
      });
      setCandidateTable(update);
    } else {
      console.log(response.error);
    }
  };

  const handleDelete = async () => {
    setLoading(false);
    const response = await deleteUser(deleting);
    if (response.remote === "success") {
      const newEmployerTable = candidateTable.filter(
        (emp) => emp.ids !== deleting
      );
      setCandidateTable(newEmployerTable);
      setDeleting("");
      dispatch(setSuccessToast("Job Delete SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  useEffect(() => {
    candidateList();
  }, [pages, limit]);
  return (
    <>
      <Layout
        rows={candidateTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        page={pages}
        searchProps={{
          placeholder: "Search Candidates",
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

      <DialogBox open={!!deleting} handleClose={() => setDeleting("")}>
        <DeleteCard
          title="Delete Job"
          content="Are you sure you want to delete job?"
          handleCancel={() => setDeleting("")}
          handleDelete={handleDelete}
          loading={loading}
        />
      </DialogBox>
    </>
  );
}

export default ManageCandidatesComponent;
