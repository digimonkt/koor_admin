import React, { useCallback, useEffect, useMemo, useState } from "react";
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

  const columns = useMemo(
    () => [
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
    ],
    []
  );
  // *Show NewsLetter Data
  const newsLetterList = useCallback(async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchTenderValue || "";
    try {
      const response = await getNewsletterApi({ limit, page, search });
      if (response.remote === "success") {
        console.log(response.data.results);
        const formattedData = transformNewsLetterResponse(
          response.data.results
        );
        if (!formattedData.length) {
          dispatch(setLoading(false));
        }
        setNewsLetterTable(formattedData);
        const totalCounts = Math.ceil(response.data.count / limit);
        setTotalCount(totalCounts);
      } else {
        dispatch(setErrorToast(response.error));
      }
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearchTenderValue, dispatch, limit, pages]);

  // *Show NewsLetter Data

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  // *Delete newsLetter start
  const handleDelete = useCallback(async () => {
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
    }
  }, [deleteNewsLetter, dispatch, newsLetterTable]);
  // *Delete news Letter end

  const downloadNewsCSV = useCallback(async () => {
    const action = "download";
    const response = await getNewsletterApi({ action });
    if (response.remote === "success") {
      window.open(
        process.env.REACT_APP_BACKEND_URL + response.data.url,
        "_blank"
      );
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  }, [dispatch]);

  useEffect(() => {
    newsLetterList();
  }, [newsLetterList]);

  useEffect(() => {
    if (newsLetterTable.length) {
      dispatch(setLoading(false));
    }
  }, [dispatch, newsLetterTable]);
  return (
    <>
      <Layout
        news
        tender
        rows={newsLetterTable}
        columns={columns}
        page={pages}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search News Letter",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        csvProps={{
          title: (
            <div onClick={() => downloadNewsCSV()}>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>
              Export CSV
            </div>
          ),
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
      {deleteNewsLetter && (
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
      )}
    </>
  );
}

export default ManageNewsLetter;
