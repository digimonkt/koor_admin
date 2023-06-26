import React, { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "@pages/manageOptions/layout";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDispatch } from "react-redux";
import { SVG } from "@assets/svg";
import { useDebounce } from "usehooks-ts";
import { stripHTMLTags, transformFAQResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { DeleteCard, FAQCard } from "@components/card";
import { IconButton, Stack } from "@mui/material";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { addFAQApi, deleteFaqApi, editFaqApi, getFAQApi } from "@api/manageFAQ";
import { useParams } from "react-router-dom";

function ShowFAQ() {
  const dispatch = useDispatch();
  const { faqCategoryId, role } = useParams();
  const [totalCount, setTotalCount] = useState(0);
  const [FAQListTable, setFAQListTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteFaq, setDeleteFaq] = useState("");
  const [updateFAQ, setUpdateFAQ] = useState("");
  const [updateFAQQuestion, setUpdateFAQQuestion] = useState("");
  const [updateFAQAnswer, setUpdateFAQAnswer] = useState("");
  const [addFAQQuestion, setAddFAQQuestion] = useState("");
  const [addFAQAnswer, setAddFAQAnswer] = useState("");
  const [addFAQ, setAddFAQ] = useState("");
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
        field: "Question",
        headerName: "Question",
        width: "220",
        sortable: true,
      },
      {
        id: "3",
        field: "Answer",
        headerName: "Answer",
        width: "220",
        sortable: true,
      },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (item) => {
          return (
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={() => setDeleteFaq(item.row.id)}>
                  <SVG.DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleEdit(item.row)}>
                  <SVG.EditIcon />
                </IconButton>
              </Stack>
            </>
          );
        },
      },
    ],
    []
  );
  // *Show FAQ Data
  const faqList = useCallback(async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchTenderValue || "";
    try {
      const response = await getFAQApi({
        limit,
        page,
        search,
        faqCategoryId,
        role,
      });
      if (response.remote === "success") {
        const formattedData = transformFAQResponse(response.data.results);
        if (!formattedData.length) {
          dispatch(setLoading(false));
        }
        setFAQListTable(formattedData);
        const totalCounts = Math.ceil(response.data.count / limit);
        setTotalCount(totalCounts);
      } else {
        dispatch(setErrorToast(response.error));
      }
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearchTenderValue, dispatch, limit, pages]);

  // *Show faq Data

  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  // *Delete faq start
  const handleDelete = useCallback(async () => {
    setLoading(false);
    const response = await deleteFaqApi(deleteFaq);
    if (response.remote === "success") {
      const faq = FAQListTable.filter((emp) => emp.id !== deleteFaq);
      setFAQListTable(faq);
      setDeleteFaq("");
      dispatch(setSuccessToast("Delete Faq  SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  }, [deleteFaq, dispatch, FAQListTable]);
  // *Delete faq end

  //* Update FAQ start
  const handleEdit = (data) => {
    setUpdateFAQ(data.id);
    setUpdateFAQQuestion(data.Question);
    setUpdateFAQAnswer(data.Answer);
  };
  const handleUpdate = async () => {
    const payload = {
      question: updateFAQQuestion,
      answer: updateFAQAnswer,
    };
    const response = await editFaqApi(updateFAQ, payload);
    if (response.remote === "success") {
      faqList();
      setUpdateFAQ("");
      dispatch(setSuccessToast("Update SuccessFully"));
    } else {
      dispatch(setErrorToast(response.error.errors.message));
    }
  };
  //* Update FAQ end
  //* Add FAQ Start
  const addNewFAQ = useCallback(async () => {
    setAddFAQ(faqCategoryId);
  }, [dispatch]);
  const addFAQFunction = async () => {
    const payload = {
      question: addFAQQuestion,
      answer: addFAQAnswer,
      category: addFAQ,
      role,
    };
    const response = await addFAQApi(payload);
    if (response.remote === "success") {
      const temp = [...FAQListTable];
      temp.push({
        id: response.data.data.id || Math.random(),
        no: temp.length + 1,
        Question: response.data.data.question,
        Answer: stripHTMLTags(response.data.data.answer).slice(0, 15) + "...",
      });
      setFAQListTable([...temp]);
      setAddFAQ("");
      setAddFAQAnswer("");
      setAddFAQQuestion("");
    }
  };
  //* Add FAQ End
  useEffect(() => {
    faqList();
  }, [faqList]);

  useEffect(() => {
    if (FAQListTable.length) {
      dispatch(setLoading(false));
    }
  }, [dispatch, FAQListTable]);
  return (
    <>
      <Layout
        news
        tender
        rows={FAQListTable}
        columns={columns}
        page={pages}
        totalCount={totalCount}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search FAQ",
          onChange: (e) => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        csvProps={{
          title: (
            <div onClick={() => addNewFAQ()}>
              <span className="d-inline-flex align-items-center me-2">
                <SVG.ExportIcon />
              </span>
              Add FAQ
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
      {deleteFaq && (
        <DialogBox open={!!deleteFaq} handleClose={() => setDeleteFaq("")}>
          <DeleteCard
            title="Delete FAQ"
            content="Are you sure you want to delete FAQ ?"
            handleCancel={() => setDeleteFaq("")}
            handleDelete={handleDelete}
          />
        </DialogBox>
      )}
      <DialogBox open={!!updateFAQ} handleClose={() => setUpdateFAQ("")}>
        <FAQCard
          title="Edit FAQ"
          handleCancel={() => setUpdateFAQ("")}
          setEditValue={setUpdateFAQQuestion}
          editValue={updateFAQQuestion}
          updateFAQAnswer={updateFAQAnswer}
          setUpdateFAQAnswer={setUpdateFAQAnswer}
          handleUpdate={handleUpdate}
        />
      </DialogBox>

      <DialogBox open={!!addFAQ} handleClose={() => setAddFAQ("")}>
        <FAQCard
          title="Add FAQ"
          handleCancel={() => setAddFAQ("")}
          setEditValue={setAddFAQQuestion}
          editValue={addFAQQuestion}
          updateFAQAnswer={addFAQAnswer}
          setUpdateFAQAnswer={setAddFAQAnswer}
          handleUpdate={addFAQFunction}
        />
      </DialogBox>
    </>
  );
}

export default ShowFAQ;
