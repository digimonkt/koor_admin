import { SVG } from "@assets/svg";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const Layout = () => {
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
          <h2>Single User Details</h2>
        </Stack>
        <hr />
        <Avatar
          sx={{
            width: 100,
            height: 100,
            color: "#CACACA",
            borderRadius: "50",
          }}
        />
        <h1>Test User</h1>
        <Grid lg={6} xs={12} spacing={2.5}>
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
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repudiandae magnam maxime exercitationem! Necessitatibus ut
                corrupti tenetur a tempora debitis aperiam rerum! Inventore
                nostrum animi autem voluptate possimus? Velit, provident
                reprehenderit.
              </p>
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
              Description
              <p>
                Email-<span>test@gmail.com</span>
              </p>
              <p>
                mobileNumber-<span>98989878</span>
              </p>
              <p>
                address-<span>agra,india</span>
              </p>
              <p>
                license-
                <a href="#">
                  <span>anish tiwari.pdf</span>
                </a>
              </p>
              <p>
                orgaization type
                <span>manufacturing</span>
              </p>
              <p>
                role
                <span>Employer</span>
              </p>
            </CardContent>
          </Card>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Layout;
