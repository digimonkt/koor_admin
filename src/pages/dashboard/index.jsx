import React, { Fragment } from "react";
import styles from "./styles.module.css";
import { Card, CardContent, Grid, Stack } from "@mui/material";
import { SVG } from "../../../src/assets/svg";
import ColumChart from "./columChart/ColumChart";
import Donut from "./dount/Donut";
const DashboardComponent = () => {
  const userList = [
    {
      icon: <SVG.CeaditIcon />,
      title: "352 371",
      subtitile: "active users",
    },
    {
      icon: <SVG.ClockIcon />,
      title: "143 344",
      subtitile: "visitors today",
    },
    {
      icon: <SVG.WorkIcon />,
      title: "50 021",
      subtitile: "active posts",
    },
    {
      icon: <SVG.GroupUser />,
      title: "345",
      subtitile: "jobs posted",
    },
  ];
  return (
    <Fragment className="main-admin">
      <Grid container spacing={2} className={`${styles.marginBottom}`}>
        {userList.map((item, index) => (
          <Grid item xl={3} lg={3} xs={12} sm={6} key={index}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className={`${styles.userCounter}`}
            >
              {item.icon}
              <div className={`${styles.user}`}>
                <h2>{item.title}</h2>
                <p>{item.subtitile}</p>
              </div>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} xs={12}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "30px",
                },
              }}
            >
              <Donut
                title="Koor users"
                total="1 934 300"
                user="Total users"
                series={[70, 70, 70]}
                colors={["#4267B2", "#4CAF50", "#FFA500"]}
                content={
                  <>
                    <li>
                      <b>780 183</b> – Jobseekers <small>(40%)</small>
                    </li>
                    <li>
                      <b>664 152</b> – Employers <small>(34%)</small>
                    </li>
                    <li>
                      <b>507 004</b> – Vendors <small>(26%)</small>
                    </li>
                  </>
                }
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={12} lg={12} xs={12}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "30px",
                },
              }}
            >
              <ColumChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardComponent;
