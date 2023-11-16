import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SVG } from "@assets/svg";
import { Box, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "../../manageOptions/layout";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDispatch } from "react-redux";
import { useDebounce } from "usehooks-ts";
import { manageTenderApi } from "@api/manageoptions";
import { transformOptionsResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { DeleteCard } from "@components/card";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useNavigate } from "react-router-dom";
import { deleteTenderAPI } from "@api/tender";

function ManageTendersComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalCount, setTotalCount] = useState(0);
  const [tenderTable, setTenderTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteTender, setDeleteTender] = useState("");
  const debouncedSearchTenderValue = useDebounce(searchTerm, 500);

  const PostNewJob = () => {
    navigate("./post-tender");
  };

  const PostNewTender = () => {
    navigate("./post-tender");
  };

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
    ],
    []
  );
  const handleDelete = useCallback(async () => {
    const response = await deleteTenderAPI(deleteTender);
    if (response.remote === "success") {
      const newTenderTable = tenderTable.filter((tender) => tender.id !== deleteTender);
      setTenderTable(newTenderTable);
      setDeleteTender("");
      dispatch(setSuccessToast("Tender Delete SuccessFully"));
    } else {
      setDeleteTender("");
      dispatch(setErrorToast("Something went wrong"));
    }
  }, [tenderTable, dispatch, deleteTender]);
  const tenderList = useCallback(async () => {
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
      dispatch(setErrorToast("Something went wrong"));
    }
  }, [debouncedSearchTenderValue, pages, limit]);

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  useEffect(() => {
    tenderList();
  }, [tenderList]);

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
        page={pages}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search Tenders",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        faq={{
          title: (
            <Box
              onClick={() => PostNewJob()}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span className="d-inline-flex align-items-center me-2">
                <SVG.WhiteFile />
              </span>
              New Job Tender
            </Box>
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
        tenderPost={{
          title: (
            <Box
              onClick={() => PostNewTender()}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span className="d-inline-flex align-items-center me-2">
                <SVG.WhiteFile />
              </span>
              Post New Tender
            </Box>
          ),
        }}
      />
      {deleteTender && (
        <DialogBox
          open={!!deleteTender}
          handleClose={() => setDeleteTender("")}
        >
          <DeleteCard
            title="Delete Tender"
            content="Are you sure you want to delete Tender?"
            handleCancel={() => setDeleteTender("")}
            handleDelete={handleDelete}
          />
        </DialogBox>
      )}
    </>
  );
}

export default ManageTendersComponent;
