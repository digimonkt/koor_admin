import * as React from "react";
// import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import { SVG } from "@assets/svg";
import { SolidButton } from "@components/button";
import { IMAGES } from "@assets/images";
import styles from "./header.module.css";

const drawerWidth = 240;
const navItems = [
  {
    menu: "Home",
    path: "/",
  },
];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>
                <Link
                  to={item.path}
                  style={{
                    color: "#274593",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                >
                  {item.menu}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
        <SolidButton
          title="ADMIN PANEL"
          sx={{
            background: "#fff",
            borderRadius: "73px",
            border: `1px solid ${"#274593"}`,
            fontFamily: "Bahnschrift",
            fontSize: "16px",
            color: "#274593",
            padding: "10px 30px",
            fontWeight: 600,
            "&:hover": {
              background: "#f7f7f7",
              borderColor: "#f7f7f7",
              //   color: hoverColor,
            },
          }}
        />
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className="header">
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            <Link to="/" className="navbar-brand">
              <img src={IMAGES.Logo} alt="logo" />
            </Link>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "block", "& a": { color: "#fff" } },
            }}
          >
            {navItems.map((item) => (
              <Link key={item} to={item.path} className={styles.header_menu}>
                {item.menu}
              </Link>
            ))}
            <IconButton
              disableFocusRipple={false}
              sx={{
                "&.MuiIconButton-root": {
                  px: 3,
                  color: "#fff",
                  "&:hover": {
                    background: "none",
                  },
                },
              }}
            >
              <SVG.Notification />
            </IconButton>
            <SolidButton
              title="ADMIN PANEL"
              sx={{
                background: "#fff",
                borderRadius: "73px",
                border: `1px solid ${"#fff"}`,
                fontFamily: "Bahnschrift",
                fontSize: "16px",
                color: "#274593",
                padding: "10px 30px",
                fontWeight: 600,
                "&:hover": {
                  background: "#f7f7f7",
                  borderColor: "#f7f7f7",
                  //   color: hoverColor,
                },
              }}
            />
          </Box>
          <IconButton
            disableFocusRipple={false}
            sx={{
              "&.MuiIconButton-root": {
                color: "#fff",
                display: "none",
                "&:hover": {
                  background: "none",
                },
                "@media (max-width: 480px)": {
                  display: "block",
                },
              },
            }}
          >
            <SVG.Notification />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { lg: "none", sm: "block" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
export default Header;
