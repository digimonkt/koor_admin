import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SVG } from "@assets/svg";
import styles from "./styles.module.css";

export const FormLabelBox = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #121212;
    padding-left: 10px;
  }

  @media (max-width: 992px) {
    .MuiFormControlLabel-label {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .MuiFormControlLabel-label {
      font-size: 12px;
    }
  }
`;

const CommonReport = ({ reportList, heddingTitle, onChange, checkedItems }) => {
  const handleCheckboxChange = (event, index) => {
    const { checked } = event.target;
    const selectReport = reportList[index];
    onChange(selectReport, checked, index);
  };
  return (
    <>
      <div className={`${styles.commonReport}`}>
        <h3>{heddingTitle}</h3>
        <div className="checkbox-container">
          <Grid container spacing={2}>
            {reportList?.map((item, index) => (
              <>
                <Grid item lg={4} sm={6} xs={6}>
                  <Stack direction="row" spacing={2}>
                    <FormGroup row>
                      <FormLabelBox
                        control={
                          <Checkbox
                            icon={<SVG.UncheckIcon />}
                            checkedIcon={<SVG.CheckBoxIcon />}
                            checked={checkedItems[index] || false}
                            onChange={(e) => handleCheckboxChange(e, index)}
                            sx={{
                              color: "#CACACA",
                              padding: "0px",
                              marginLeft: "10px",
                              "&.Mui-checked": {
                                color: "#274593",
                              },
                            }}
                          />
                        }
                        label={item.title}
                      />
                    </FormGroup>
                  </Stack>
                </Grid>

                <Grid item lg={8} sm={6} xs={6}>
                  <div className={`${styles.listall}`}>{item.description}</div>
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};
export default CommonReport;
