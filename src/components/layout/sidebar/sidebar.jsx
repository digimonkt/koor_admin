import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Box, Drawer, IconButton, Stack } from "@mui/material";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { MENU_ITEM } from "./navigation";
import { SVG } from "@assets/svg";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import styles from "./sidebar.module.css";
import { AUTHENTICATED_ROUTE } from "@utils/constants/routes";
import { AuthenticatedRoute } from "@utils/routes";

const drawerWidth = 300;
function Sidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <>
      <div className="sidebar-scroll">
        <PerfectScrollbar component="div">
          <ul className={`${styles.sidebarMenu}`}>
            {MENU_ITEM.map((item, index) => (
              <React.Fragment key={item.id}>
                <li className={`${item.menuBorder}`}>
                  <Link
                    to={item.url}
                    className={
                      location.pathname.includes(item.url) ? styles.active : ""
                    }
                  >
                    <span className={`${styles.menuIcon}`}>{item.icon}</span>
                    <span>{item.page}</span>
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </PerfectScrollbar>
      </div>
      <div className={`${styles.logout}`}>
        <a
          href="/"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <span className={`${styles.logoutIcon}`}>
              <SVG.LogOut />
            </span>
            <span>Log Out</span>
          </Stack>
        </a>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;
  return (
    <Box sx={{ display: "flex" }} className="sidebar__box">
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
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

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              top: "84px",
            },
          }}
          open
        >
          {drawer}
          <div className={`${styles.logout}`}>
            <a
              href="/"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <span className={`${styles.logoutIcon}`}>
                  <SVG.LogOut />
                </span>
                <span>Log Out</span>
              </Stack>
            </a>
          </div>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: {
            xs: 1.875,
            lg: 5,

            height: "100%",
          },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: "#E5E5E5",
          marginTop: 10.5,
          minHeight: "calc(100vh - 84px)",
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuOpenIcon />
          </IconButton>

          <Routes>
            {AUTHENTICATED_ROUTE.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={
                    <AuthenticatedRoute redirectURL="/">
                      <route.element />
                    </AuthenticatedRoute>
                  }
                  key={index}
                />
              );
            })}
            {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
