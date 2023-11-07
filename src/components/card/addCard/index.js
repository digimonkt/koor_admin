import { FilledButton, OutlinedButton } from "@components/button";
import { LabeledInput, SelectInput } from "@components/input";
import Loader from "@components/loader";
import { Grid, Stack } from "@mui/material";
import React from "react";

function AddCardComponent({
  title,
  content,
  handleCancel,
  loading,
  handleStore,
  setPageNameValue,
  setCodeValue,
  pageNameValue,
  codeValue,
  pageList
}) {
  function inputPageNameValue(e) {
    setPageNameValue(e.target.value);
  }
  function inputCodeValue(e) {
    setCodeValue(e.target.value);
  }
  return (
    <div>
      <h1 className="headding">{title}</h1>
      <div className="form-content">{content}</div>
      <Grid item xl={12} lg={12} xs={12}>
        <Stack direction="column" spacing={2}>
          <SelectInput
            placeholder={"Select Page"}
            options={(
              pageList || []
            ).map((page) => ({
              value: page.value,
              label: page.label,
            }))}
            onChange={(e) => inputPageNameValue(e)}
          />
          <LabeledInput
            placeholder="Code"
            type="text"
            onChange={(e) => inputCodeValue(e)}
            value={codeValue}
          />
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <OutlinedButton
              title="Cancel"
              sx={{
                "&.MuiButton-outlined": {
                  borderRadius: "73px",
                  border: "0px",
                  color: "#848484",
                  fontWeight: "500",
                  fontSize: "16px",
                  fontFamily: "Bahnschrift",
                  padding: "6px 50px",

                  "&:hover": {
                    background: "rgba(40, 71, 146, 0.1)",
                    color: "#274593",
                  },
                  "@media (max-width: 992px)": {
                    padding: "5px 15px",
                    fontSize: "14px",
                  },
                },
              }}
              disabled={loading}
              onClick={handleCancel}
            />
            <FilledButton
              title={loading ? <Loader loading={loading} /> : "Submit"}
              onClick={handleStore}
              disabled={loading}
            />
          </Stack>
        </Stack>
      </Grid>
    </div>
  );
}

export default AddCardComponent;
