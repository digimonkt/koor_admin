import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Card, CardContent, Grid, Stack } from "@mui/material";
import { SVG } from "../../../src/assets/svg";
import ColumChart from "./columChart/ColumChart";
import Donut from "./dount/Donut";
import { getUserCountApi } from "@api/dashboard";
const DashboardComponent = () => {
  const [userList, setUserList] = useState([]);
  const [totalUsers, setTotalUsers] = useState("");
  const [jobSeekersCount, setJobSeekersCount] = useState("");
  const [employersCount, setEmployersCount] = useState("");
  const [vendorsCount, setVendorsCount] = useState("");

  const userCount = async () => {
    const response = await getUserCountApi();
    if (response.remote === "success") {
      const NewUserList = [
        {
          icon: <SVG.CreditIcon />,
          title: response.data.active_jobs,
          subtitle: "active users",
        },
        {
          icon: <SVG.ClockIcon />,
          title: "143 344",
          subtitle: "visitors today",
        },
        {
          icon: <SVG.WorkIcon />,
          title: response.data.active_user,
          subtitle: "active posts",
        },
        {
          icon: <SVG.GroupUser />,
          title: response.data.employers,
          subtitle: "jobs posted",
        },
      ];
      setUserList(NewUserList);
      setTotalUsers(response.data.total_user);
      setVendorsCount(response.data.vendors);
      setJobSeekersCount(response.data.job_seekers);
      setEmployersCount(response.data.employers);
      console.log(response.data);
    } else {
      console.log(response.error);
    }
  };

  function getPercentage(userCount, totalUser) {
    const result = (userCount / totalUser) * 100;
    return result.toFixed(2);
  }

  useEffect(() => {
    userCount();
  }, []);

  return (
    <Fragment>
      <div className="main-admin">
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
                  <p>{item.subtitle}</p>
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
                  total={totalUsers}
                  user="Total users"
                  series={[70, 70, 70]}
                  colors={["#4267B2", "#4CAF50", "#FFA500"]}
                  content={
                    <>
                      <li>
                        <b>{jobSeekersCount}</b> – JobSeekers{" "}
                        <small>
                          ({getPercentage(jobSeekersCount, totalUsers)}% )
                        </small>
                      </li>
                      <li>
                        <b>{employersCount}</b> – Employers{" "}
                        <small>
                          {" "}
                          ({getPercentage(employersCount, totalUsers)}% )
                        </small>
                      </li>
                      <li>
                        <b>{vendorsCount}</b> – Vendors{" "}
                        <small>
                          {" "}
                          ({getPercentage(vendorsCount, totalUsers)}% )
                        </small>
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
      </div>
    </Fragment>
  );
};

export default DashboardComponent;
