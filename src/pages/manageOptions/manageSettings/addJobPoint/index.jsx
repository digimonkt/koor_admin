import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { ErrorMessage } from "@components/caption";
import styles from "../change-password/styles.module.css";
import { LabeledInput } from "@components/input";
import { OutlinedButton } from "@components/button";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { validateSetPassword } from "@pages/auth/validator";
import { setSuccessToast } from "@redux/slice/toast";
import { getPointApi, setPointsApi } from "@api/manageoptions";
const AddJobPoint = () => {
  const dispatch = useDispatch();
  const [pointData, setPointData] = useState("");
  const formik = useFormik({
    initialValues: {
      getPoints: "",
    },
    validationSchema: validateSetPassword,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        point: values.getPoints,
      };
      const response = await setPointsApi(payload);
      if (response.remote === "success") {
        dispatch(setSuccessToast("Set Points  SuccessFully"));
        resetForm();
      } else {
        formik.setErrors("Something went wrong");
      }
    },
  });

  const getPoints = async () => {
    const response = await getPointApi();
    if (response.remote === "success") {
      setPointData(response.data.point);
    }
  };
  useEffect(() => {
    getPoints();
  }, [getPoints]);
  return (
    <>
      <h4>Currently {pointData} points are redeem when post a job</h4>
      <form>
        <Stack direction="column" spacing={1.5}>
          <div className={`${styles.formGroup}`}>
            <label>Set Job Points</label>
            <LabeledInput
              placeholder="Add Points"
              type="number"
              className={`${styles.formControl}`}
              value={formik.values.getPoints}
              {...formik.getFieldProps("getPoints")}
            />
            {formik.touched.getPoints && formik.errors.getPoints ? (
              <ErrorMessage>{formik.errors.getPoints}</ErrorMessage>
            ) : null}
          </div>
        </Stack>
        <div className={`${styles.Mt_41}`}>
          <div className={`${styles.showButton}`}>
            <OutlinedButton
              title={
                <>
                  <div style={{ marginTop: "6px", marginRight: "8px" }}>
                    <SVG.PriorityIcon />
                  </div>
                  <div>Set Points</div>
                </>
              }
              sx={{
                borderRadius: "73px",
                border: "1px solid #274593",
                color: "#274593",
                fontWeight: "500",
                fontSize: "16px",
                fontFamily: "Bahnschrift",
                width: "100%",
              }}
              onClick={() => formik.handleSubmit()}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddJobPoint;
