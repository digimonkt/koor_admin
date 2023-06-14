import React, { useEffect, useState } from "react";
import Layout from "../../manageOptions/layout";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDispatch } from "react-redux";
import { SVG } from "@assets/svg";
import { useDebounce } from "usehooks-ts";
import { deleteNewsLetterApi, getNewsletterApi } from "@api/manageoptions";
import { transformNewsLetterResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { DeleteCard } from "@components/card";
import { IconButton, Stack } from "@mui/material";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";

function ManageNewsLetter() {
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [newsLetterTable, setNewsLetterTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteNewsLetter, setDeleteNewsLetter] = useState("");
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
      field: "date",
      headerName: "Date",
      width: "220",
      sortable: true,
    },
    {
      id: "3",
      field: "email",
      headerName: "Email",
      width: "220",
      sortable: true,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (item) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={() => setDeleteNewsLetter(item.row.id)}>
              <SVG.DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  // *Show NewsLetter Data
  const newsLetterList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchTenderValue || "";
    const response = await getNewsletterApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformNewsLetterResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setNewsLetterTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };
  // *Show NewsLetter Data

  function getPage(_, page) {
    setPages(page);
  }

  // *Delete newsLetter
  const handleDelete = async () => {
    setLoading(false);
    const response = await deleteNewsLetterApi(deleteNewsLetter);
    if (response.remote === "success") {
      const newsLetter = newsLetterTable.filter(
        (emp) => emp.id !== deleteNewsLetter
      );
      setNewsLetterTable(newsLetter);
      setDeleteNewsLetter("");
      dispatch(setSuccessToast("Delete news Letter  SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };
  // *Delete news Letter
  useEffect(() => {
    newsLetterList();
  }, [debouncedSearchTenderValue, pages, limit]);

  useEffect(() => {
    if (newsLetterTable.length) {
      dispatch(setLoading(false));
    }
  }, [newsLetterTable]);
  return (
    <>
      <Layout
        tender
        rows={newsLetterTable}
        columns={columns}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search News Letter",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        limitProps={{
          value: limit,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          onChange: (e) => setLimit(e.target.value),
        }}
      />
      <DialogBox
        open={!!deleteNewsLetter}
        handleClose={() => setDeleteNewsLetter("")}
      >
        <DeleteCard
          title="Delete News Letter"
          content="Are you sure you want to delete News Letter?"
          handleCancel={() => setDeleteNewsLetter("")}
          handleDelete={handleDelete}
        />
      </DialogBox>
    </>
  );
}

export default ManageNewsLetter;