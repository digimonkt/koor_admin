import React from "react";
import ReactQuill from "react-quill";
import { SolidButton } from "@components/button";
import "react-quill/dist/quill.snow.css";

const UpdateContent = ({ handleUpdate, handleEditValue, value }) => {
  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={handleEditValue} />
      <div onClick={() => handleUpdate()}>
        <SolidButton
          sx={{
            background: "#fff",
            borderRadius: "73px",
            border: "solid 1px ",
            fontFamily: "Bahnschrift",
            fontSize: "16px",
            color: "#274593",
            padding: "10px 30px",
            fontWeight: 600,
            "&:hover": {
              background: "#f7f7f7",
              borderColor: "#f7f7f7",
            },
          }}
          title="Update"
        />
        <SolidButton
          sx={{
            background: "#fff",
            borderRadius: "73px",
            border: "solid 1px ",
            fontFamily: "Bahnschrift",
            fontSize: "16px",
            color: "#274593",
            padding: "10px 30px",
            fontWeight: 600,
            "&:hover": {
              background: "#f7f7f7",
              borderColor: "#f7f7f7",
            },
          }}
          title="cancel"
        />
      </div>
    </>
  );
};

export default UpdateContent;
