import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Card, CardContent, Grid, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import ColumChart from "./columChart/ColumChart";
import Donut from "./dount/Donut";
import { getUserCountApi } from "@api/dashboard";
import { setErrorToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";
const DashboardComponent = () => {
  const dispatch = useDispatch;
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState({
    totalUser: 0,
    jobSeekersCount: 0,
    employersCount: 0,
    vendorsCount: 10,
    seriesData: [],
  });

  const userCount = async () => {
    const response = await getUserCountApi();
    if (response.remote === "success") {
      const { employers, vendors } = response.data;
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
          title: employers,
          subtitle: "jobs posted",
        },
      ];
      setUserList(NewUserList);

      setUserData({
        totalUsers: response.data.total_user,
        vendorsCount: vendors,
        jobSeekersCount: response.data.job_seekers,
        employersCount: employers,
        seriesData: [vendors, response.data.job_seekers, employers],
      });
    } else {
      dispatch(setErrorToast("something went wrong"));
    }
  };

  function getPercentage(usersCount, totalUser) {
    const result = (usersCount / totalUser) * 100;
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
                {userData.seriesData.length > 0 && (
                  <Donut
                    title="Koor users"
                    total={userData.totalUsers}
                    user="Total users"
                    series={userData.seriesData}
                    colors={["#4267B2", "#4CAF50", "#FFA500"]}
                    content={
                      <>
                        <li>
                          <b>{userData.jobSeekersCount}</b> – JobSeekers{" "}
                          <small>
                            (
                            {getPercentage(
                              userData.jobSeekersCount,
                              userData.totalUsers
                            )}
                            % )
                          </small>
                        </li>
                        <li>
                          <b>{userData.employersCount}</b> – Employers{" "}
                          <small>
                            {" "}
                            (
                            {getPercentage(
                              userData.employersCount,
                              userData.totalUsers
                            )}
                            % )
                          </small>
                        </li>
                        <li>
                          <b>{userData.vendorsCount}</b> – Vendors{" "}
                          <small>
                            {" "}
                            (
                            {getPercentage(
                              userData.vendorsCount,
                              userData.totalUsers
                            )}
                            % )
                          </small>
                        </li>
                      </>
                    }
                  />
                )}
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
