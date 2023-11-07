import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import UpdateContent from "@components/editor/UpdateContent";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { getPrivacyApi, updatePrivacyApi } from "@api/userRightAndPolicy";

const ManagePrivacyPolicyComponent = () => {
  const dispatch = useDispatch();

  const [activeEditor, setActiveEditor] = useState(false);
  const [value, setValue] = useState("");

  const getPrivacyData = async () => {
    dispatch(setLoading(true));
    const response = await getPrivacyApi();
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
    const response = await updatePrivacyApi(payload);
    if (response.remote === "success") {
      dispatch(setLoading(false));
      getPrivacyData();
      setActiveEditor(false);
      dispatch(setSuccessToast("Update ly"));
    } else {
      dispatch(setErrorToast("Something went wrong"));
      console.log(response.error);
    }
  };

  const onCancelHandle = () => {
    setActiveEditor(false);
  };

  useEffect(() => {
    getPrivacyData();
  }, []);
  return (
    <div>
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
                "@media (max-width: 480px)": {
                  padding: "35px 15px 30px 15px",
                },
              },
            }}
          >
            <div>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: "#121212",

                    fontFamily: "Bahnschrift",
                    "@media (max-width: 992px)": {
                      fontSize: "24px",
                    },
                    "@media (max-width: 480px)": {
                      fontSize: "20px",
                      fontWeight: "600",
                    },
                  }}
                >
                  Koor Privacy Policy
                </Box>
                <OutlinedButton
                  title={
                    <div onClick={() => handleEdit()}>
                      <SVG.EditIcon />
                      Edit
                    </div>
                  }
                  sx={{
                    color: "#274593 !important",
                    borderColor: "#274593 !important",
                    fontSize: "16px !important",

                    "@media (max-width: 480px)": {
                      fontSize: "14px  !important",
                    },
                  }}
                ></OutlinedButton>
              </Stack>
              <Box
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "Poppins",
                  color: "#121212",

                  "@media (max-width: 992px)": {
                    fontSize: "14px",
                  },

                  "@media (max-width: 480px)": {
                    fontSize: "12px",
                  },
                }}
                dangerouslySetInnerHTML={{ __html: value }}
              ></Box>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ManagePrivacyPolicyComponent;
