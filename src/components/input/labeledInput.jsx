import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";

function LabeledInputComponent({
  title,
  subtitle,
  type,
  labelWeight,
  ...rest
}) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const handleChangePasswordVisibility = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  useEffect(() => {
    if (type === "password") {
      setIsVisiblePassword(false);
    }
  }, [type]);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="mb-2"
      >
        {title ? (
          <label
            className="mb-1 d-inline-block"
            style={{
              fontWeight: labelWeight,
            }}
          >
            {title}
          </label>
        ) : (
          ""
        )}
        {subtitle ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <span className="text-gray">{subtitle}</span>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
      {type === "textarea" ? (
        <textarea className="form-control-area" {...rest}></textarea>
      ) : (
        <div className="showpassword">
          <input
            className="form-control"
            type={
              type === "password"
                ? isVisiblePassword
                  ? "text"
                  : "password"
                : type
            }
            {...rest}
          />
          {type === "password" ? (
            <div onClick={handleChangePasswordVisibility}>
              {!isVisiblePassword ? <SVG.EyeIcon /> : <SVG.EyeOff />}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default LabeledInputComponent;
