import { IconButton } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { SVG } from "@assets/svg";
import styles from "./header.module.css";
import { IMAGES } from "@assets/images";
import { SolidButton } from "@components/button";

function Header() {
  const [isMenu, setIsMenu] = useState(false);
  const menu = useRef(null);
  const handleClickOutside = (event) => {
    if (menu.current && !menu.current.contains(event.target)) {
      setIsMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <header className={`${styles.header}`}>
      <Container className={`${styles.headerContainer}`}>
        <Stack
          direction="row"
          spacing="3"
          alignItems={{ xs: "start", lg: "center" }}
        >
          <Link to="/" className="navbar-brand">
            <img src={IMAGES.Logo} alt="logo" className="headerLogo" />
          </Link>

          <div ref={menu} className={` ${styles.headerMenu}`}>
            <IconButton
              color="#fff"
              edge="start"
              sx={{ mr: 2, fontSize: "14px", display: { sm: "none" } }}
              className="hamburgerMenu"
            >
              <MenuIcon />
            </IconButton>

            <ul className={` ${styles.menu} ${isMenu && styles.menuSelected}`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="#!">Resources</Link>
              </li>
              <li>
                <IconButton
                  disableFocusRipple={false}
                  sx={{
                    "&.MuiIconButton-root": {
                      p: 0,
                      color: "#fff",
                    },
                  }}
                  className={` ${styles.ghantiIcon}`}
                >
                  <SVG.Notification />
                </IconButton>
              </li>
              <li>
                <SolidButton
                  className={` ${styles.adminBtn}`}
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
              </li>
            </ul>
          </div>
        </Stack>
      </Container>
    </header>
  );
}

export default Header;
