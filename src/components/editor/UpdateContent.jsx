import React from "react";
import { QuillInput } from "@components/input";
import { SolidButton } from "@components/button";
import "react-quill/dist/quill.snow.css";

const UpdateContent = ({
  handleUpdate,
  handleEditValue,
  value,
  onCancelHandle,
}) => {
  return (
    <>
      <QuillInput
        value={value}
        onChange={handleEditValue}
      />
      <div className="textEditor">
        <div onClick={() => handleUpdate()}>
          <SolidButton
            sx={{
              borderRadius: "73px",
              border: "solid 1px ",
              fontFamily: "Bahnschrift",
              fontSize: "16px",
              color: "#274593",
              fontWeight: 400,
              marginRight: "20px",
              "&:hover": {
                background: "#f7f7f7",
                borderColor: "#f7f7f7",
              },
            }}
            title="Update"
          />
        </div>
        <div
          onClick={() => {
            onCancelHandle();
          }}
        >
          <SolidButton
            sx={{
              borderRadius: "73px",
              border: "solid 1px ",
              fontFamily: "Bahnschrift",
              fontSize: "16px",
              color: "#274593",
              fontWeight: 400,
              marginRight: "20px",
              "&:hover": {
                background: "#f7f7f7",
                borderColor: "#f7f7f7",
              },
            }}
            title="cancel"
          />
        </div>
      </div>
    </>
  );
};

export default UpdateContent;
