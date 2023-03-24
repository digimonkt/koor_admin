import styled from "@emotion/styled";
import { FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import React from "react";
const FormLabelBox = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #121212;
    text-transform: capitalize;
  }
`;
function LabeledRadioInputComponent({ title, options, labelWeight, ...rest }) {
  return (
    <Stack
      direction={{ xs: "column", lg: "column" }}
      spacing={{ xs: 2, lg: 2, md: 2 }}
      alignItems={{ xs: "start", lg: "left" }}
    >
      <div>
        <label
          className="d-inline-block"
          style={{
            fontWeight: labelWeight,
          }}
        >
          {title}
        </label>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          {...rest}
          value={rest.value || ""}
        >
          {(options || []).map((option) => {
            return (
              <FormLabelBox
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    sx={{
                      color: "#CACACA",
                      "&.Mui-checked": {
                        color: "#EEA23D",
                      },
                    }}
                  />
                }
                label={option.label}
              />
            );
          })}
        </RadioGroup>
      </div>
    </Stack>
  );
}

export default LabeledRadioInputComponent;
