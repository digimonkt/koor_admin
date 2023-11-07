import React, { useEffect, useState } from "react";
import { Card, CardContent, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { getUserRightsApi, updateUserRightsApi } from "@api/userRightAndPolicy";
import UpdateContent from "@components/editor/UpdateContent";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
const ManageUserRightsComponent = () => {
  const dispatch = useDispatch();

  const [activeEditor, setActiveEditor] = useState(false);
  const [value, setValue] = useState("");

  const getUserData = async () => {
    dispatch(setLoading(true));
    const response = await getUserRightsApi();
    if (response.remote === "success") {
      dispatch(setLoading(false));
      setValue(response.data.description);
    } else {
      console.log(response.error);
    }
  };

  const handleEditValue = (newValue) => {
    setValue(newValue);
  };
  const handleEdit = () => {
    setActiveEditor(true);
  };

  const handleUpdate = async () => {
    const payload = {
      description: value,
    };
    dispatch(setLoading(true));
    const response = await updateUserRightsApi(payload);
    if (response.remote === "success") {
      dispatch(setLoading(false));
      getUserData();
      setActiveEditor(false);
      dispatch(setSuccessToast("Update User Rights De SuccessFully"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  const onCancelHandle = () => {
    setActiveEditor(false);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        {activeEditor ? (
          <UpdateContent
            handleUpdate={handleUpdate}
            handleEditValue={handleEditValue}
            value={value}
            onCancelHandle={onCancelHandle}
          />
        ) : (
          <CardContent
            sx={{
              "&.MuiCardContent-root": {
                padding: "35px 30px 30px 30px",
              },
            }}
          >
            <div className="userright">
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{ float: "right" }}
              >
                <div onClick={() => handleEdit()}>
                  <OutlinedButton
                    title={
                      <>
                        <SVG.EditIcon />
                        Edit
                      </>
                    }
                    sx={{
                      color: "#274593",
                      borderColor: "#274593",
                    }}
                  ></OutlinedButton>
                </div>
              </Stack>
              <div dangerouslySetInnerHTML={{ __html: value }}></div>
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default ManageUserRightsComponent;
