import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
    font-size: 12px;
    line-height: 22px;

    letter-spacing: 0.02em;

    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;

const Donut = ({ title, total, user, series, colors, content }) => {
  const [isSelect, setIsSelect] = useState("");

  const handleChange = (event) => {
    setIsSelect(event.target.value);
  };

  const [state] = React.useState({
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
          }}
          size="small"
        >
          <SelectBox
            value={isSelect}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={KeyboardArrowUpIcon}
            displayEmpty
          >
            <MenuItem value="">This Week</MenuItem>
            <MenuItem value={20}>Last Month</MenuItem>
            <MenuItem value={30}>year</MenuItem>
          </SelectBox>
        </FormControl>
      </Stack>

      <Grid container spacing={2}>
        <Grid item lg={4} xl={4} xs={12}>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            height={300}
          />
        </Grid>
        <Grid item xl={8} lg={8} xs={12}>
          <div className={`${styles.seriesBox}`}>
            <h2>{total}</h2>
            <span>{user}</span>
            <ul>{content}</ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Donut;
