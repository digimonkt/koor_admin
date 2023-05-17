import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "../../manageOptions/layout";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDispatch } from "react-redux";
import { useDebounce } from "usehooks-ts";
import {
  createTenderApi,
  editTenderApi,
  manageTenderApi,
  tenderDeleteApi,
} from "@api/manageoptions";
import { transformOptionsResponse } from "@api/transform/choices";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import { DeleteCard, EditCard } from "@components/card";

function ManageTendersComponent() {
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [tenderTable, setTenderTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [addTender, setAddTender] = useState("");
  const [deleteTender, setDeleteTender] = useState("");
  const [editTender, setEditTender] = useState("");
  const [editTenderValue, setEditTenderValue] = useState("");

  const debouncedSearchTenderValue = useDebounce(searchTerm, 500);

  const columns = [
    {
      id: "1",
      field: "no",
      headerName: "No",
      sortable: true,
    },
    {
      id: "2",
      field: "tender_id",
      headerName: "Tender id",
      width: "220",
      sortable: true,
    },
    {
      id: "3",
      field: "title",
      headerName: "Title",
      width: "220",
      sortable: true,
    },

    {
      id: "4",
      field: "tender_type",
      headerName: "Tender Type",
      width: "220",
      sortable: true,
    },
    {
      id: "5",
      field: "sector",
      headerName: "Sector",
      width: "220",
      sortable: true,
    },
    {
      id: "6",
      field: "city",
      headerName: "City",
      width: "220",
      sortable: true,
    },

    {
      id: "7",
      field: "country",
      headerName: "Country",
      width: "220",
      sortable: true,
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: true,
      renderCell: (item) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={() => handleEdit(item.row)}
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}
            >
              <SVG.ToggleOffIcon />
            </IconButton>

            <IconButton
              onClick={() => setDeleteTender(item.row.id)}
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

  const tenderList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchTenderValue || "";
    const response = await manageTenderApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformOptionsResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setTenderTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  function getPage(_, page) {
    setPages(page);
  }

  const addTenderFunction = async () => {
    const payload = {
      title: addTender,
    };
    const response = await createTenderApi(payload);
    if (response.remote === "success") {
      const temp = [...tenderTable];
      temp.push({
        id: response.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.title,
      });
      setTenderTable([...temp]);
      setAddTender("");
      dispatch(setSuccessToast("Add Tender SuccessFully"));
    } else {
      console.log(response.error);
      dispatch(setErrorToast("Something went wrong"));
    }
  };
  const handleDelete = async () => {
    setLoading(false);
    const response = await tenderDeleteApi(deleteTender);
    if (response.remote === "success") {
      const newTenderTable = tenderTable.filter(
        (emp) => emp.id !== deleteTender
      );
      setTenderTable(newTenderTable);
      setDeleteTender("");
      dispatch(setSuccessToast("Delete Tender SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  const handleEdit = async (item) => {
    setEditTender(item.id);
    setEditTenderValue(item.name);
  };

  const handleUpdate = async () => {
    const payload = {
      title: editTenderValue,
    };
    const response = await editTenderApi(editTender, payload);
    if (response.remote === "success") {
      tenderList();
      setEditTender("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  useEffect(() => {
    tenderList();
  }, [debouncedSearchTenderValue, pages, limit]);

  useEffect(() => {
    if (tenderTable.length) {
      dispatch(setLoading(false));
    }
  }, [tenderTable]);
  return (
    <>
      <Layout
        tender
        rows={tenderTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search Tenders",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        // inputProps={{
        //   type: "text",
        //   placeholder: "Add Tender",
        //   onChange: (e) => setAddTender(e.target.value),
        //   value: addTender,
        // }}
        limitProps={{
          value: limit,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          onChange: (e) => setLimit(e.target.value),
        }}
        optionsProps={{
          title: (
            <div onClick={addTenderFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Tender
            </div>
          ),
        }}
      />
      <DialogBox open={!!deleteTender} handleClose={() => setDeleteTender("")}>
        <DeleteCard
          title="Delete Tender"
          content="Are you sure you want to delete Tender?"
          handleCancel={() => setDeleteTender("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox open={!!editTender} handleClose={() => setEditTender("")}>
        <EditCard
          title="Edit Tender"
          handleCancel={() => setEditTender("")}
          setEditValue={setEditTenderValue}
          editValue={editTenderValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default ManageTendersComponent;
