import { FormLabel, Grid, Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { styled } from "@mui/material/styles";
import { manageEmployer } from "@api/employers";
import { SVG } from "@assets/svg";
import Cbutton from "@components/button/cButton";
import { getUserDetailsApi, verifyUnVerifyApi } from "@api/manageoptions";
import { useDispatch } from "react-redux";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import SelectWithSearch from "@components/input/selectWithsearch";
import { useDebounce } from "usehooks-ts";
const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily: "Poppins",
  color: "#121212",
  fontSize: "16px",
  fontWeight: "300",
  marginBottom: 10,
  display: "block",

  "@media (max-width: 990px)": {
    fontSize: "14px",
  },

  "@media (max-width: 480px)": {
    fontSize: "12px",
  },
}));

const Recharge = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const [contentId, setContentId] = useState(0);
  const [creditsAmount, setCreditsAmount] = useState([]);
  const [userPoints, setUserPoints] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    setCreditsAmount(event.target.value);
  }
  const getEmployerList = async () => {
    const response = await manageEmployer({ search: searchTerm });
    if (response.remote === "success") {
      setContent(response.data.results);
    }
  };

  const handleSubmit = async () => {
    const action = "recharge";
    if (!contentId || !creditsAmount || !creditsAmount.length) {
      dispatch(setErrorToast("Please fill all the fields"));
    } else {
      const response = await verifyUnVerifyApi(
        contentId,
        action,
        creditsAmount,
      );
      if (response.remote === "success") {
        dispatch(setSuccessToast("Recharge add successFully"));
        setCreditsAmount([]);
        setContentId("");
        setContent([]);
      } else {
        dispatch(setErrorToast("Something Went Wrong"));
      }
    }
  };

  const debouncedSearchCountryValue = useDebounce(searchTerm, 500);
  useEffect(() => {
    getEmployerList();
  }, [debouncedSearchCountryValue]);
  useEffect(() => {
    if (contentId.length) {
      const getUserCredit = async () => {
        const response = await getUserDetailsApi(contentId);
        if (response.remote === "success") {
          setUserPoints(response.data.profile.points);
        }
      };
      getUserCredit();
    }
  }, [contentId]);
  const options = content.map((item) => ({
    value: item.id,
    label: item.name || item.email,
  }));

  return (
    <>
      <div className={`${styles.packageManagement}`}>
        <h3>Select employer and credits amount</h3>
        <form>
          <Grid container spacing={2.5}>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Select employer (by name or ID)</StyledFormLabel>

              <SelectWithSearch
                sx={{
                  borderRadius: "10px",
                  background: "#F0F0F0",
                  fontFamily: "Poppins !important",

                  "& fieldset": {
                    border: "1px solid #cacaca",
                    borderRadius: "93px",
                    display: "none",
                    "&:hover": { borderColor: "#cacaca" },
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "#121212",
                    fontFamily: "Poppins !important",
                    padding: "4px 9px !important",
                    fontWeight: "500 !important",
                    "@media (max-width: 992px)": {
                      fontSize: "14px !important",
                    },
                    "@media (max-width: 480px)": {
                      fontSize: "12px !important",
                    },
                  },
                  "& .MuiFormLabel-root": {
                    fontSize: "16px",
                    color: "#848484",
                    fontFamily: "Poppins !important",
                    transform: "translate(14px, 12px) scale(1)",
                  },
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                }}
                options={options}
                title={"select the options"}
                required
                onChange={(_, value) => {
                  if (value) {
                    setContentId(value.value);
                  } else {
                    setContentId("");
                  }
                }}
                {...options}
                onKeyUp={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <StyledFormLabel>Number of job credits</StyledFormLabel>
              <input
                className={`${styles.textType}`}
                placeholder="Add Credits"
                onChange={handleChange}
                type="number"
              />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" sx={{ mt: 3.75 }}>
            <div>
              <Cbutton
                bgcolor="#D5E3F7"
                color="#274593"
                bordercolor="#D5E3F7"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                padding="7px 30px"
                sx={{
                  "@media (max-width: 480px)": {
                    fontSize: "14px",
                    padding: "10px 18px",
                  },
                }}
                onClick={handleSubmit}
              >
                <span className="d-inline-flex me-2">
                  <SVG.TokenIcon />
                </span>
                Recharge employer’s credits
              </Cbutton>
            </div>
          </Stack>
          {userPoints && (
            <Box className="text-center mt-3">
              <span>
                Currently have <b>{userPoints} credits</b> remaining.
              </span>
            </Box>
          )}
        </form>
      </div>
    </>
  );
};
export default Recharge;
