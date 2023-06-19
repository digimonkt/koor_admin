import { FormLabel, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { styled } from "@mui/material/styles";
import SelectDropDown from "./SelectDropDown";
import { manageEmployer } from "@api/employers";
import { SVG } from "@assets/svg";
import Cbutton from "@components/button/cButton";
import { getUserDetailsApi, verifyUnVerifyApi } from "@api/manageoptions";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily: "Poppins",
  color: "#121212",
  fontSize: "16px",
  fontWeight: "300",
  marginBottom: 10,
  display: "block",
}));

const Recharge = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const [contentId, setContentId] = useState("");
  const [creditsAmount, setCreditsAmount] = useState([]);
  const [userPoints, setUserPoints] = useState(null);
  function handleChange(event) {
    setCreditsAmount(event.target.value);
  }
  const getEmployerList = async () => {
    const response = await manageEmployer({});
    if (response.remote === "success") {
      setContent(response.data.results);
    }
  };

  const handleSubmit = async () => {
    const action = "recharge";
    const response = await verifyUnVerifyApi(contentId, action, creditsAmount);
    if (response.remote === "success") {
      dispatch(setSuccessToast("Recharge add successFully"));
      setCreditsAmount([]);
      setContentId("");
      setContent([]);
    } else {
      dispatch(setErrorToast("Something Went Wrong"));
    }
  };
  useEffect(() => {
    getEmployerList();
  }, []);
  useEffect(() => {
    if (contentId.length) {
      const getUserCredit = async () => {
        const response = await getUserDetailsApi(contentId);
        if (response.remote === "success") {
          setUserPoints(response.data.profile.points);
          // console.log(response.data.profile.points);
        }
      };
      getUserCredit();
    }
  }, [contentId]);
  return (
    <>
      <div className={`${styles.packageManagement}`}>
        <h3>Select employer and credits amount</h3>
        <form>
          <Grid container spacing={2.5}>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Select employer (by name or ID)</StyledFormLabel>
              <SelectDropDown content={content} setContentId={setContentId} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Number of job cretits</StyledFormLabel>
              <input
                className={`${styles.textType}`}
                placeholder="Add Credits"
                onChange={handleChange}
                type="number"
              />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" sx={{ mt: 3.75 }}>
            <div onClick={handleSubmit}>
              <Cbutton
                bgcolor="#D5E3F7"
                color="#274593"
                bordercolor="#D5E3F7"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                padding="7px 30px"
              >
                <span className="d-inline-flex me-2">
                  <SVG.TokenIcon />
                </span>
                Recharge employer’s credits
              </Cbutton>
            </div>
          </Stack>
          {userPoints && (
            <span className="text-center">
              Currently have <b>{userPoints} credits</b> remaining.
            </span>
          )}
        </form>
      </div>
    </>
  );
};
export default Recharge;
