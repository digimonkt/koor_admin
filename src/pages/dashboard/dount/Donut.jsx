import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FormControl, Grid, MenuItem, Select, Stack } from "@mui/material";
import styles from "./styles.module.css";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
    padding: 8px 25px 8px 30px;
  }
  &.MuiInputBase-root {
    border-radius: 10px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;

const Donut = ({
  title,
  total,
  user,
  series,
  colors,
  content,
  handleChange,
  isSelect,
}) => {
  const [state, setState] = useState({
    series,
    options: {
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      labels: ["Vendors", "JobSeekers", "Employers"],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: { show: false },
              total: {
                show: true,
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      legend: {
        show: false,
      },
      fill: {
        colors,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
              show: false,
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series,
    }));
  }, [series]);

  return (
    <div className={`${styles.chartContent}`}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "30px" }}
      >
        <h2>{title}</h2>
        <FormControl
          sx={{
            minWidth: 128,
            "&.MuiSelect-select": {
              fontFamily: "Poppins",
              fontSize: "12px",
            },
            "@media (max-width: 480px)": {
              "&.MuiSelect-select": {
                fontSize: "10px !important",
              },
            },
          }}
          size="small"
        >
          <SelectBox
            value={isSelect}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
            sx={{
              "@media (max-width: 992px)": {
                fontSize: "12px !important",
              },
              "@media (max-width: 480px)": {
                fontSize: "10px !important",
              },
            }}
          >
            <MenuItem value="this week">This Week</MenuItem>
            <MenuItem value="last month">Last Month</MenuItem>
            <MenuItem value="this year">This Year</MenuItem>
          </SelectBox>
        </FormControl>
      </Stack>

      <Grid container spacing={2}>
        <Grid item lg={4} xl={4} sm={6} xs={12}>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            height={300}
          />
        </Grid>
        <Grid item xl={8} lg={8} sm={6} xs={12}>
          <div className={`${styles.seriesBox}`}>
            <h2>{total}</h2>
            <span>{user || 0}</span>
            <ul>{content || 0}</ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Donut;
