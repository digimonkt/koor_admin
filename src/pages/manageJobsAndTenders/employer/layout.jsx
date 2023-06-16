import { verifyUnVerifyApi } from "@api/manageoptions";
import { SVG } from "@assets/svg";
import { SolidButton } from "@components/button";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Layout = (employerDetail) => {
  const id = employerDetail.employerDetail?.id;
  const [isVerified, setIsVerified] = useState(false);
  const data = employerDetail.employerDetail?.profile?.is_verified;
  const [verifiedData, setVerifiedData] = useState(data);
  const handleVerified = async () => {
    setIsVerified(!isVerified);
    const response = await verifyUnVerifyApi(
      id,
      isVerified ? "unverify" : "verify"
    );
    if (response.remote === "success") {
      setVerifiedData(!verifiedData);
    }
  };

  useEffect(() => {
    const action = employerDetail.employerDetail?.profile?.is_verified;
    setIsVerified(action);
  }, [employerDetail.employerDetail?.profile?.is_verified]);

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
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
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
          <IconButton LinkComponent={Link} to="/manage-employers">
            <SVG.ArrowLeftIcon />
          </IconButton>{" "}
          <h2>Employer Details</h2>
        </Stack>
        <hr />
        <Avatar
          sx={{
            width: 100,
            height: 100,
            color: "#CACACA",
            borderRadius: "50",
          }}
          src={
            process.env.REACT_APP_BACKEND_URL +
            employerDetail?.employerDetail?.image?.path
          }
        />
        <h1>{employerDetail.employerDetail?.name}</h1>
        <Grid xs={12} spacing={2.5}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "none",
                borderRadius: "10px",
                border: "1px solid #CACACA",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  p: {
                    xs: 2,
                    sm: 1,
                    md: 2.5,
                    lg: 2.5,
                    xl: 2.5,
                  },
                },
              }}
            >
              Description
              <p>{employerDetail.employerDetail?.profile?.description}</p>
            </CardContent>
          </Card>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "none",
                borderRadius: "10px",
                border: "1px solid #CACACA",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  p: {
                    xs: 2,
                    sm: 1,
                    md: 2.5,
                    lg: 2.5,
                    xl: 2.5,
                  },
                },
              }}
            >
              <p>
                Email-<span>{employerDetail.employerDetail.email}</span>
              </p>
              <p>
                mobileNumber-
                <span>{employerDetail?.employerDetail?.mobile_number}</span>
              </p>
              <p>
                address-
                <span>{employerDetail.employerDetail?.profile?.address}</span>
              </p>
              <p>
                license-
                <a
                  href={`${
                    process.env.REACT_APP_BACKEND_URL +
                    employerDetail.employerDetail.profile?.license_id_file?.path
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {
                      employerDetail.employerDetail.profile?.license_id_file
                        ?.title
                    }
                  </span>
                  <SVG.vectorIcon />
                </a>
              </p>
              <p>
                licenseID-
                <span>
                  {employerDetail.employerDetail?.profile?.license_id}
                </span>
              </p>
              <p>
                organization-type:
                <span>
                  {
                    employerDetail.employerDetail.profile?.organization_type
                      ?.title
                  }
                </span>
              </p>
            </CardContent>
          </Card>
          <SolidButton
            align="left"
            className="toggleBtn"
            sx={{
              fontFamily: "Bahnschrift",
            }}
            title={verifiedData ? "verified" : "unverify"}
            onClick={handleVerified}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Layout;
