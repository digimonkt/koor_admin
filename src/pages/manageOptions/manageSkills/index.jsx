import React, { useState, useEffect, useCallback } from "react";
import Layout from "../layout";
import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  editSkillApi,
  createSkillApi,
  manageSkillApi,
  skillDeleteApi,
} from "@api/manageoptions";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { transformSkillResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DeleteCard from "@components/card/deleteCard";
import EditCard from "@components/card/editCard";
import { useDebounce } from "usehooks-ts";
function ManageSkillsComponent() {
  const dispatch = useDispatch();
  const [skillsTable, setSkillsTable] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [addSkill, setAddSkill] = useState("");
  const [editSkill, setEditSkill] = useState("");
  const [editSkillValue, setEditSkillValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [deleteSkill, setDeleteSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchSkillValue = useDebounce(searchTerm, 500);

  const columns = [
    {
      id: "1",
      field: "no",
      headerName: "No",
      sortable: true,
    },

    {
      id: "3",
      field: "name",
      headerName: "Name",
      width: 650,
      sortable: true,
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: item => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={() => setDeleteSkill(item.row.id)}
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}>
              <SVG.DeleteIcon />
            </IconButton>

            <IconButton
              onClick={() => handleEdit(item.row)}
              sx={{
                "&.MuiIconButton-root": {
                  background: "#D5E3F7",
                },
                width: 30,
                height: 30,
                color: "#274593",
              }}>
              <SVG.EditIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const skillsList = async () => {
    dispatch(setLoading(true));
    const page = pages;
    const search = debouncedSearchSkillValue || "";
    const response = await manageSkillApi({ limit, page, search });
    if (response.remote === "success") {
      const formateData = transformSkillResponse(response.data.results);
      if (!formateData.length) {
        dispatch(setLoading(false));
      }
      setSkillsTable(formateData);
      const totalCounts = Math.ceil(response.data.count / limit);
      setTotalCount(totalCounts);
    } else {
      console.log(response.error);
    }
  };

  const addSkillFunction = async () => {
    const payload = {
      title: addSkill,
    };
    const response = await createSkillApi(payload);
    if (response.remote === "success") {
      const temp = [...skillsTable];
      temp.push({
        id: response.data.data.id || Math.random(),
        no: temp.length + 1,
        name: response.data.data.title,
      });

      setSkillsTable([...temp]);
      setAddSkill("");

      dispatch(setSuccessToast("Add Skill SuccessFully"));
    } else {
      console.log(response.error);
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  // function getPage(_, page) {
  //   setPages(page);
  // }
  const getPage = useCallback((_, page) => {
    setPages(page);
  }, []);

  const handleDelete = async () => {
    setLoading(false);
    const response = await skillDeleteApi(deleteSkill);
    if (response.remote === "success") {
      const newSkillTable = skillsTable.filter(emp => emp.id !== deleteSkill);
      setSkillsTable(newSkillTable);
      setDeleteSkill("");
      dispatch(setSuccessToast("Delete Skill SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  const handleEdit = async item => {
    setEditSkill(item.id);
    setEditSkillValue(item.name);
  };

  const handleUpdate = async () => {
    const payload = {
      title: editSkillValue,
    };

    const response = await editSkillApi(editSkill, payload);
    if (response.remote === "success") {
      skillsList();
      setEditSkill("");
      dispatch(setSuccessToast(response.data.message));
    } else {
      dispatch(setErrorToast(response.error.errors.title));
    }
  };

  useEffect(() => {
    skillsList();
  }, [debouncedSearchSkillValue, pages, limit]);

  useEffect(() => {
    if (skillsTable.length) {
      dispatch(setLoading(false));
    }
  }, [skillsTable]);

  return (
    <>
      <Layout
        rows={skillsTable}
        columns={columns}
        totalCount={totalCount}
        page={pages}
        handlePageChange={getPage}
        searchProps={{
          placeholder: "Search Skills",
          onChange: e => setSearchTerm(e.target.value),
          value: searchTerm,
        }}
        inputProps={{
          type: "text",
          placeholder: "Enter Skill",
          onChange: e => setAddSkill(e.target.value),
          value: addSkill,
        }}
        limitProps={{
          value: limit,
          options: [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 },
          ],
          onChange: e => setLimit(e.target.value),
        }}
        optionsProps={{
          title: (
            <div onClick={addSkillFunction}>
              <span className="d-inline-flex align-items-center me-2"></span>{" "}
              Add Skill
            </div>
          ),
        }}
      />
      <DialogBox open={!!deleteSkill} handleClose={() => setDeleteSkill("")}>
        <DeleteCard
          title="Delete Skill"
          content="Are you sure you want to delete Skill?"
          handleCancel={() => setDeleteSkill("")}
          handleDelete={handleDelete}
        />
      </DialogBox>

      <DialogBox open={!!editSkill} handleClose={() => setEditSkill("")}>
        <EditCard
          title="Edit Skill"
          handleCancel={() => setEditSkill("")}
          setEditValue={setEditSkillValue}
          editValue={editSkillValue}
          handleUpdate={handleUpdate}
        />
      </DialogBox>
    </>
  );
}

export default ManageSkillsComponent;
