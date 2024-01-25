import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Card, CardContent, Grid, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import ColumChart from "./columChart/ColumChart";
import Donut from "./dount/Donut";
import { getFinancialCountApi, getUserCountApi } from "@api/dashboard";
import { setErrorToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";
const DashboardComponent = () => {
  const dispatch = useDispatch;
  const [userList, setUserList] = useState([]);
  const [isSelect, setIsSelect] = useState("this year");
  const [financialPerPeriod, setFinancialPerPeriod] = useState("this year");
  const [userData, setUserData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalJobs: 0,
    jobSeekersCount: 0,
    employersCount: 0,
    vendorsCount: 10,
    seriesData: [],
  });

  const [financialData, setFinancialData] = useState({
    totalCredits: 0,
    seriesData: [],
  });

  const userCount = async () => {
    const response = await getUserCountApi(isSelect);
    if (response.remote === "success") {
      const NewUserList = [
        {
          icon: <SVG.CreditIcon />,
          title: response.data.active_user,
          subtitle: "active users",
        },
        {
          icon: <SVG.ClockIcon />,
          title: response.data.total_visitor || 0,
          subtitle: "visitors today",
        },
        {
          icon: <SVG.WorkIcon />,
          title: response.data.active_jobs,
          subtitle: "active posts",
        },
        {
          icon: <SVG.GroupUser />,
          title: response.data.total_jobs,
          subtitle: "jobs posted",
        },
      ];
      setUserList(NewUserList);
    } else {
      dispatch(setErrorToast("something went wrong"));
    }
  };

  const userDonutCount = async () => {
    const response = await getUserCountApi(isSelect);
    if (response.remote === "success") {
      const { employers, vendors } = response.data;
      setUserData({
        totalUsers: response.data.total_user,
        activeUsers: response.data.active_user,
        totalJobs: response.data.total_jobs,
        vendorsCount: vendors,
        jobSeekersCount: response.data.job_seekers,
        employersCount: employers,
        seriesData: [vendors, response.data.job_seekers, employers],
      });
    } else {
      dispatch(setErrorToast("something went wrong"));
    }
  };

  const financialDonutCount = async () => {
    const response = await getFinancialCountApi(financialPerPeriod);
    if (response.remote === "success") {
      const { totalCredits, gold, silver, copper } = response.data;
      setFinancialData({
        totalCredits,
        seriesData: [gold, silver, copper],
      });
    } else {
      dispatch(setErrorToast("something went wrong"));
    }
  };
  function getPercentage(usersCount, totalUser) {
    if (typeof usersCount !== "number" || typeof totalUser !== "number") {
      return 0;
    }
    if (totalUser === 0) {
      return 0;
    }
    const result = (usersCount / totalUser) * 100;
    if (isNaN(result)) {
      return 0;
    }
    return result.toFixed(2);
  }

  const handleChange = (event) => {
    setIsSelect(event.target.value);
  };
  const handleFinancialChange = (event) => {
    setFinancialPerPeriod(event.target.value);
  };
  useEffect(() => {
    userCount();
  }, []);
  useEffect(() => {
    userDonutCount();
  }, [isSelect]);
  useEffect(() => {
    financialDonutCount();
  }, [financialPerPeriod]);
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
          <Grid item xl={6} lg={6} xs={12}>
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
                    handleChange={handleChange}
                    isSelect={isSelect}
                    content={
                      <>
                        <li>
                          <b>{userData.jobSeekersCount || 0}</b> – JobSeekers{" "}
                          <small>
                            (
                            {getPercentage(
                              userData.jobSeekersCount,
                              userData.totalUsers,
                            )}
                            % )
                          </small>
                        </li>
                        <li>
                          <b>{userData.employersCount || 0}</b> – Employers{" "}
                          <small>
                            {" "}
                            (
                            {getPercentage(
                              userData.employersCount,
                              userData.totalUsers,
                            )}
                            % )
                          </small>
                        </li>
                        <li>
                          <b>{userData.vendorsCount || 0}</b> – Vendors{" "}
                          <small>
                            {" "}
                            (
                            {getPercentage(
                              userData.vendorsCount,
                              userData.totalUsers,
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
          <Grid item xl={6} lg={6} xs={12}>
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
                {financialData.seriesData.length > 0 && (
                  <Donut
                    title="Credit Plans Purchased"
                    total={financialData.totalCredits}
                    user="Total Credits"
                    series={financialData.seriesData}
                    colors={["#F1BA4E", "#BA9365", "#D2D2D2"]}
                    handleChange={handleFinancialChange}
                    isSelect={financialPerPeriod}
                    content={
                      <>
                        <li>
                          <b>{financialData?.seriesData[0] || 0}</b> – Gold{" "}
                          <small>
                            (
                            {getPercentage(
                              financialData.gold,
                              financialData.totalCredits,
                            )}
                            % )
                          </small>
                        </li>
                        <li>
                          <b>{financialData?.seriesData[1] || 0}</b> – Silver{" "}
                          <small>
                            {" "}
                            (
                            {getPercentage(
                              financialData.silver,
                              financialData.totalCredits,
                            )}
                            % )
                          </small>
                        </li>
                        <li>
                          <b>{financialData?.seriesData[2] || 0}</b> – Coppers{" "}
                          <small>
                            {" "}
                            (
                            {getPercentage(
                              financialData.copper,
                              financialData.totalCredits,
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
