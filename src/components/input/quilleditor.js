import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillInputComponent = ({ value = "", placeholder = "", onChange }) => {
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    setEditorValue(value || "");
  }, [value]);

  const handleChange = (newValue) => {
    setEditorValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

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
    [{ font: ["Poppins"] }], // font family
    [{ align: [] }], // text alignment
    ["link", "image", "video"], // link, image, and video
    ["clean"], // remove formatting
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        placeholder={placeholder || "Description"}
        modules={{
          toolbar: toolbarOptions,
        }}
        style={{
          width: "100%",
          marginTop: "20px",
          fontFamily: "'Poppins' !important",
          background: "#F0F0F0",
        }}
      />
    </div>
  );
};

export default QuillInputComponent;
