import { Card, CardContent, Grid, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SVG } from "@assets/svg";
import styles from "@components/financialtools/styles.module.css";
// import Cbutton from "@components/button/cButton";
import logo from "@assets/images/logo.png";
import CustomTable from "@components/financialtools/table";

import { styled } from "@mui/material/styles";
import { getInvoiceDetailsAPI } from "@api/manageoptions";
import { useDispatch } from "react-redux";
import { setErrorToast } from "@redux/slice/toast";

const StyledIconButton = styled(IconButton)(() => ({
  color: "#121212",
  padding: 0,
}));

const ViewInvoices = () => {
  const dispatch = useDispatch();
  const { invoiceId } = useParams();
  const USER_COLUMN_DATA = [
    {
      id: 1,
      name: "Amount",
      key: "amount",
      width: 115,
    },
    {
      id: 2,
      name: "Points",
      key: "points",
      tableCellClass: "text-center",
    },
    {
      id: 3,
      name: "Created",
      key: "created",
      tableCellClass: "text-center",
    },
    // {
    //   id: 4,
    //   name: "Amount",
    //   key: "amount",
    // },
  ];
  const [invoiceDetails, setInvoiceDetails] = useState({
    id: "",
    startDate: "",
    endDate: "",
    invoiceId: "",
    total: "",
    discount: "",
    isSend: "",
    grandTotal: "",
    created: "",
    points: "",
    user: {
      id: "",
      name: "",
      email: "",
      country_code: "",
      mobileNumber: "",
      // image: {
      //     title: data.user.image.title,
      //     path: data.user.image.path,
      // },
    },
    detail: []
  });
  // const [invoiceId, setInvoiceId] = useState([]);
  const getInvoiceDetail = async (id) => {
    const response = await getInvoiceDetailsAPI({ id });
    if (response.remote === "success") {
      setInvoiceDetails(response.data);
    } else {
      dispatch(setErrorToast("Something went wrong"));
    };
  };
  useEffect(() => {
    getInvoiceDetail(invoiceId);
  }, [invoiceId]);

  return (
    <>
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
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={{ xs: "start", sm: "center" }}
            justifyContent={{ xs: "flex-start", sm: "space-between" }}
            className={`${styles.title}`}
            sx={{
              mb: {
                xs: 1,
                sm: 1,
                md: 5.75,
                lg: 5.75,
                xl: 5.75,
              },
            }}
          >
            <Stack direction="row" spacing={2}>
              <IconButton LinkComponent={Link} to="/financial-tools">
                <SVG.ArrowLeftIcon />
              </IconButton>{" "}
              <h2>Invoice – ID {invoiceId}</h2>
            </Stack>
            <Stack direction="row" spacing={2}>
              {/* <Cbutton
                color="#274593"
                bordercolor="#274593"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                padding="7px 30px 7px 20px"
                url="/financial-tools/edit"
              >
                <span className="d-inline-flex me-2">
                  <SVG.EditIcon />
                </span>
                Edit
              </Cbutton>
              <Cbutton
                color="#274593"
                bordercolor="#274593"
                hoverBgColor="#b4d2fe"
                hoverborderColor="#b4d2fe"
                padding="7px 30px 7px 20px"
              >
                <span className="d-inline-flex me-2">
                  <SVG.ForwardIcon />
                </span>
                Send
              </Cbutton> */}
            </Stack>
          </Stack>
          <Box sx={{ textAlign: "center", mb: "54px" }}>
            <img alt="" src={logo} />
          </Box>
          <div className={` ${styles.invoiceTitle}`}>
            <h3 className="text-lg-end">Invoice</h3>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <div className={`${styles.address}`}>
                  <Box sx={{ mb: 1.875 }}>
                    <b>Client name:</b> {invoiceDetails.user.name || invoiceDetails.user.email}
                  </Box>
                  <p>{invoiceDetails.user.mobileNumber}</p>
                  <p>{invoiceDetails.user.email}</p>
                </div>
              </Grid>
              <Grid item lg={6} xs={12}>
                <div className={`text-lg-end ${styles.address}`}>
                  <Box sx={{ mb: 1.875 }}>
                    <b>Invoice number:</b> {invoiceId}
                  </Box>
                  {/* <Box sx={{ mb: 1.875 }}>
                    <b>Contract number:</b> 804
                  </Box> */}
                </div>
              </Grid>
            </Grid>
            <Box sx={{ mt: 1.875 }}>
              <Grid container spacing={2} justifyContent="space-between">
                {/* <Grid item lg={6} xs={6}>
                  <ul className={`${styles.bankDetails}`}>
                    <li>
                      <span>Please deposit to through</span>
                      <b>xxx</b>
                    </li>
                    <li>
                      <span>Bank name:</span>
                      <b>IBS Bank</b>
                    </li>
                    <li>
                      <span>Account name:</span>
                      <b>Koor LTD</b>
                    </li>
                    <li>
                      <span>Account No:</span>
                      <b>0971881</b>
                    </li>
                  </ul>
                </Grid> */}
                <Grid item xs="auto">
                  <Box className={`${styles.topBorder}`}>
                    <table className={`${styles.totalBox}`}>
                      <tbody>
                        <tr>
                          <td>Subtotal:</td>
                          <td>
                            <b>{invoiceDetails.total}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Discount:</td>
                          <td>
                            <b>{invoiceDetails.discount}</b>
                          </td>
                        </tr>
                        <tr>
                          <td className={`${styles.td_last}`}>
                            <strong>Total:</strong>
                          </td>
                          <td className={`${styles.td_last}`}>
                            <strong>{invoiceDetails.grandTotal}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <CustomTable
                rows={invoiceDetails.detail || []}
                columns={USER_COLUMN_DATA || []}
                radius="7px 7px 0px 0px"
              />
            </Box>
            <Box sx={{ my: 6.25 }}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                {/* <Grid item lg={3} xs={12}>
                  <div className="text-center">
                    <img alt="" src={Verified} />
                  </div>
                </Grid> */}
                <Grid item lg={6} xs={12}>
                  <div className={`text-center ${styles.thanksMessage}`}>
                    {" "}
                    Thank you for using Koor!
                  </div>
                </Grid>
                {/* <Grid item lg={3} xs={12}>
                  <div className="text-center">
                    <img alt="" src={autograp} />
                  </div>
                </Grid> */}
              </Grid>
            </Box>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item lg={6} xs={12}>
                <div className={`${styles.bottomAddres}`}>
                  <h5>Koor.com</h5>
                  <ul>
                    <li>contact@koor.com</li>
                    <li>+27 97 87 878 83</li>
                    <li>Mogadishu, Kenya</li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs="auto">
                <Stack direction="row" spacing={2}>
                  <Stack direction="row" spacing={1.875}>
                    <StyledIconButton disableRipple={true}>
                      <SVG.TwitterIcon />
                    </StyledIconButton>
                    <StyledIconButton disableRipple={true}>
                      <SVG.YouTubeIcon />
                    </StyledIconButton>
                    <StyledIconButton disableRipple={true}>
                      <SVG.InstagramIcon />
                    </StyledIconButton>
                    <StyledIconButton disableRipple={true}>
                      <SVG.LinkedinIcon />
                    </StyledIconButton>
                    <StyledIconButton disableRipple={true}>
                      <SVG.FacebookIcon />
                    </StyledIconButton>
                  </Stack>
                  <span className={`${styles.emailId}`}>@koor_com</span>
                </Stack>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default ViewInvoices;
