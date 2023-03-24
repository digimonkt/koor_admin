import { SVG } from "@assets/svg";
import styles from "./sidebar.module.css";
export const MENU_ITEM = [
  {
    id: "1",
    icon: <SVG.Dashboard />,
    page: "Dashboard",
    url: "/dashboard",
  },
  {
    id: "2",
    icon: <SVG.ManageJobIcon />,
    page: "Manage jobs",
    url: "/manage-jobs",
  },
  {
    id: "3",
    icon: <SVG.ManageTenders />,
    page: "Manage tenders",
    url: "/manage-tenders",
  },
  {
    id: "4",
    icon: <SVG.ManageEmployee />,
    page: "Manage employers",
    url: "/manage-employers",
  },
  {
    id: "5",
    icon: <SVG.ManageCandidate />,
    page: "Manage candidates",
    url: "/manage-candidates",
    menuBorder: styles.borderBottom,
  },
  // {
  //   id: "6",
  //   icon: <SVG.FinancialTools />,
  //   page: "Financial tools",
  //   url: "/financial-tools",
  // },
  {
    id: "7",
    icon: <SVG.Report />,
    page: "Reports",
    url: "/reports",
  },
  {
    id: "8",
    icon: <SVG.UserRole />,
    page: "User rights",
    url: "/user-rights",
  },
  {
    id: "9",
    icon: <SVG.PrivacyPolicy />,
    page: "Privacy policy",
    url: "/privacy-policy",
    menuBorder: styles.borderBottom,
  },
  {
    id: "10",
    icon: <SVG.UserManagement />,
    page: "User management",
    url: "/user-management",
  },
  {
    id: "11",
    icon: <SVG.Settings />,
    page: "Settings",
    url: "/settings",
  },
];
