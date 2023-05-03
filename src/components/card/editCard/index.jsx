import { FilledButton, OutlinedButton } from "@components/button";
import { LabeledInput } from "@components/input";
import Loader from "@components/loader";
import { Grid, Stack } from "@mui/material";
import React from "react";

function EditCardComponent({
  title,
  content,
  handleCancel,
  loading,
  setEditValue,
  editValue,
  handleUpdate,
}) {
  function inputValue(e) {
    setEditValue(e.target.value);
  }
  return (
    <div>
      <h1 className="headding">{title}</h1>
      <div className="form-content">{content}</div>
      <Grid item xl={12} lg={12} xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <LabeledInput
            placeholder="Edit Skill"
            type="text"
            onChange={(e) => inputValue(e)}
            value={editValue}
          />
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
            onClick={handleUpdate}
            disabled={loading}
          />
        </Stack>
      </Grid>
    </div>
  );
}

export default EditCardComponent;
