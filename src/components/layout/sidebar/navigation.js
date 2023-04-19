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
  {
    id: "6",
    icon: <SVG.FinancialTools />,
    page: "Manage skills",
    url: "/manage-skills",
  },
  {
    id: "7",
    icon: <SVG.FinancialTools />,
    page: "Manage category",
    url: "/manage-category",
  },
  {
    id: "8",
    icon: <SVG.FinancialTools />,
    page: "Manage higher education",
    url: "/manage-higher-education",
  },
  {
    id: "9",
    icon: <SVG.Report />,
    page: "Reports",
    url: "/reports",
  },
  {
    id: "10",
    icon: <SVG.UserRole />,
    page: "User rights",
    url: "/user-rights",
  },
  {
    id: "11",
    icon: <SVG.PrivacyPolicy />,
    page: "Privacy policy",
    url: "/privacy-policy",
    menuBorder: styles.borderBottom,
  },
  {
    id: "12",
    icon: <SVG.UserManagement />,
    page: "User management",
    url: "/user-management",
  },
  {
    id: "13",
    icon: <SVG.Settings />,
    page: "Settings",
    url: "/settings",
  },
];
