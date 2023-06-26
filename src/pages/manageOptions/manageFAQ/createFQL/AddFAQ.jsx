import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { LabeledInput } from "@components/input";
import { Card, CardContent, IconButton, Stack } from "@mui/material";
import styles from "@pages/manageOptions/manageSettings/styles.module.css";
import { Link } from "react-router-dom";

const AddFAQ = () => {
  return (
    <Card
      sx={{
        "&.MuiCard-root": {
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
          marginBottom: "100px",
        },
      }}
    >
      <CardContent
        sx={{
          "&.MuiCardContent-root": {
            p: {
              xs: 2,
              sm: 1,
              md: 3.75,
              lg: 3.75,
              xl: 3.75,
            },
          },
        }}
      />
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        className={`${styles.title}`}
        sx={{
          mb: {
            xs: 1,
            sm: 1,
            md: 3.75,
            lg: 3.75,
            xl: 3.75,
          },
        }}
      >
        <IconButton LinkComponent={Link} to="/manage-faq">
          <SVG.ArrowLeftIcon />
        </IconButton>{" "}
        <h2>Manage FAQ</h2>
      </Stack>
      <div className={`${styles.title} ${styles.spaceMy}`}>
        <LabeledInput placeholder="Question" type="text" />
      </div>
      <div className={`${styles.title} ${styles.spaceMy}`}>
        <LabeledInput placeholder="Answer" type="text" />
      </div>
      <div className={`${styles.title} ${styles.spaceMy}`}>
        <LabeledInput placeholder="Select Category" type="text" />
      </div>
      <div className={`${styles.title} ${styles.spaceMy}`}></div>
      <Stack direction={"row"} justifyContent={"center"}>
        <OutlinedButton
          title={
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <SVG.AddCircleIcon />
              <span> Add Testimonials</span>
            </Stack>
          }
          sx={{
            color: "#274593",
            borderColor: "#274593",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Stack>
    </Card>
  );
};

export default AddFAQ;
