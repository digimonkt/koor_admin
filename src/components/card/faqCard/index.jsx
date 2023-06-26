import { FilledButton, OutlinedButton } from "@components/button";
import { LabeledInput } from "@components/input";
import Loader from "@components/loader";
import { Grid, Stack } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";

function FAQComponent({
  title,
  content,
  handleCancel,
  loading,
  setEditValue,
  editValue,
  handleUpdate,
  setUpdateFAQAnswer,
  updateFAQAnswer,
}) {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // basic formatting
    ["blockquote", "code-block"], // blockquote and code block
    [{ header: 1 }, { header: 2 }], // headers
    [{ list: "ordered" }, { list: "bullet" }], // ordered and unordered lists
    [{ script: "sub" }, { script: "super" }], // subscript and superscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent and indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // font size
    [{ color: [] }, { background: [] }], // text and background color
    [{ font: [] }], // font family
    [{ align: [] }], // text alignment
    ["link", "image", "video"], // link, image, and video
    ["clean"], // remove formatting
  ];
  function inputValue(e) {
    setEditValue(e.target.value);
  }
  const handleEditorValue = (value) => {
    setUpdateFAQAnswer(value);
  };
  return (
    <div>
      <h1 className="headding">{title}</h1>
      <div className="form-content">{content}</div>
      <Grid item xl={12} lg={12} xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Grid item xs={12}>
            <LabeledInput
              type="text"
              placeholder="Add Question"
              onChange={(e) => inputValue(e)}
              value={editValue}
            />
          </Grid>
        </Stack>
      </Grid>
      <h3>Answer-:</h3>
      <ReactQuill
        theme="snow"
        value={updateFAQAnswer}
        modules={{
          toolbar: toolbarOptions,
        }}
        onChange={(value) => handleEditorValue(value)}
        style={{
          width: "100%",
          marginTop: "20px",
          background: "#F0F0F0",
        }}
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
    </div>
  );
}

export default FAQComponent;
