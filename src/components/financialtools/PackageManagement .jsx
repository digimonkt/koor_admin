import { FormLabel, Grid, Stack } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import { styled } from "@mui/material/styles";

const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily: "Poppins",
  color: "#121212",
  fontSize: "16px",
  fontWeight: "300",
  marginBottom: 10,
  display: "block",
}));

const PackageManagement = ({ packageList }) => {
  function handleChange(event) {
    console.log(event.target.value);
  }
  return (
    <>
      {packageList?.map((item) => (
        <div className={`${styles.packageManagement}`} key={item.id}>
          <h3>{item.title}</h3>
          <form>
            <Grid container spacing={2.5}>
              <Grid item lg={6} xs={12}>
                <StyledFormLabel>Price</StyledFormLabel>
                <Stack
                  direction="row"
                  spacing={1.875}
                  className={`${styles.formGroupBg}`}
                >
                  <span>USD</span>
                  <input
                    className={`${styles.usdform}`}
                    defaultValue={item.price}
                    onChange={handleChange}
                  />
                </Stack>
              </Grid>
              <Grid item lg={6} xs={12}>
                <StyledFormLabel>Number of job posts</StyledFormLabel>
                <input
                  className={`${styles.textType}`}
                  defaultValue={item.post}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <div className={`${styles.MT15}`}>
              <StyledFormLabel>Benefits</StyledFormLabel>
              <div>
                <Grid container spacing={1.875}>
                  <Grid item lg={6} xs={12}>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <span>1</span>
                      <input
                        className={`${styles.textType}`}
                        defaultValue={item.benefits}
                        onChange={handleChange}
                        placeholder={item.placeholder}
                      />
                    </Stack>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <span>2</span>
                      <input
                        className={`${styles.textType}`}
                        defaultValue={item.benefitPost}
                        onChange={handleChange}
                        placeholder={item.placeholder}
                      />
                    </Stack>
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <span>3</span>
                      <input
                        className={`${styles.textType}`}
                        defaultValue={item.benefits3}
                        onChange={handleChange}
                        placeholder={item.placeholder}
                      />
                    </Stack>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <span>4</span>
                      <input
                        className={`${styles.textType}`}
                        defaultValue={item.benefitPost4}
                        onChange={handleChange}
                        placeholder={item.placeholder}
                      />
                    </Stack>
                  </Grid>
                </Grid>
                {item.divider}
              </div>
            </div>
          </form>
        </div>
      ))}
    </>
  );
};
export default PackageManagement;
