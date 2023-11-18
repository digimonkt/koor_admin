import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "../dount/styles.module.css";
import { getDashboardApi } from "@api/dashboard";
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

const ColumChart = () => {
  const [isSelect, setIsSelect] = useState("this week");
  const [isApplication, setIsApplication] = useState([]);

  const employerDetails = async () => {
    const response = await getDashboardApi(isSelect);
    if (response.remote === "success") {
      setIsApplication(response.data);
    }
  };

  const handleChange = (event) => {
    setIsSelect(event.target.value);
  };

  const [state] = React.useState({
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,

        toolbar: {
          show: false,
        },
      },
      colors: ["#274593", "#EEA23D"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        borderColor: "#CACACA",
        strokeDashArray: 8,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },

      stroke: {
        show: false,
        width: 2,
        colors: ["#CACACA"],
      },
      yaxis: {
        labels: {
          offsetX: -18,
          formatter: function (value) {
            return value + "";
          },
          style: {
            colors: ["#CACACA"],
            fontSize: "12px",
            fontFamily: "Poppins",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          show: true,

          style: {
            colors: [
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
              "#CACACA",
            ],
            fontSize: "12px",
            fontFamily: '"Poppins" !important',
            fontWeight: 400,
          },
        },
      },

      fill: {
        opacity: 1,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex }) {
          return (
            '<div class="arrow_box">' +
            "<span>" +
            series[seriesIndex][dataPointIndex] +
            "</span>" +
            "<div class='smalltext'>" +
            [" Sun. Aug 21"] +
            "</div>" +
            "</div>"
          );
        },
      },
    },
  });

  useEffect(() => {
    employerDetails();
  }, [isSelect]);
  return (
    <>
      <div className={`${styles.chartContent}`}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "45px" }}
        >
          <h2>Koor employers & jobs</h2>
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
              <MenuItem value="this year">This year</MenuItem>
            </SelectBox>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={5} sx={{ marginBottom: "55px" }}>
          <div className={`${styles.views}`}>
            <span
              className={`${styles.blueView}`}
              style={{ borderColor: "#274593" }}
            ></span>
            <b>{isApplication?.employers}</b>employers
          </div>
          <div className={`${styles.views}`}>
            <span
              className={`${styles.blueView}`}
              style={{ borderColor: "#4CAF50" }}
            ></span>
            <b>{isApplication?.jobs}</b>jobs
          </div>
        </Stack>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
          className="columnchart"
        />
      </div>
    </>
  );
};
export default ColumChart;
