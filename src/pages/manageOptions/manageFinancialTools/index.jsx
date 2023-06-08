import { Card, CardContent, Grid, Stack } from "@mui/material";
import styles from "../manageSettings/styles.module.css";
import DataTable from "@components/dataTable";

const FinancialTools = () => {
  const rows = [
    {
      id: "1",
      Data: "2022-19-29",
      Number: "11878",
      Company: "Panel Place",
      Amount: "$55.12",
      Sent: "&",
      Save: "&& &&",
      Manage: "&& &&",
    },
  ];
  const columns = [
    {
      id: "1",
      field: "Data",
      headerName: "Data",
      sortable: true,
    },
    {
      id: "2",
      field: "Number",
      headerName: "Number /Id",
      width: "160",
      sortable: true,
    },
    {
      id: "3",
      field: "Company",
      headerName: "Company",
      width: "160",
      sortable: true,
    },

    {
      id: "4",
      field: "Amount",
      headerName: "Amount",
      width: "160",
      sortable: true,
    },
    {
      id: "5",
      field: "Sent",
      headerName: "Sent?",
      width: "160",
      sortable: true,
    },
    {
      id: "6",
      field: "Save",
      headerName: "Save",
      width: "160",
      sortable: true,
    },

    {
      id: "7",
      field: "Manage",
      headerName: "Manage",
      width: "160",
      sortable: true,
    },
  ];

  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 10,
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
        >
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
            <h2>Financial tools</h2>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            justifyContent="space-between"
            alignItems="center"
            className={`${styles.subtitle}`}
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
            <h3>Invoices</h3>
          </Stack>
          <Grid container spacing={2.5}></Grid>

          <DataTable
            rows={rows || []}
            columns={columns || []}
            limitProps={{ value: 5 }}
            // loader={loading}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default FinancialTools;
