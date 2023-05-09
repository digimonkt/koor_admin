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
    page: "Manage job category",
    url: "/manage-job-category",
  },
  {
    id: "8",
    icon: <SVG.FinancialTools />,
    page: "Manage  education",
    url: "/manage-education",
  },

  {
    id: "9",
    icon: <SVG.FinancialTools />,
    page: "Manage  country",
    url: "/manage-country",
  },

  // {
  //   id: "10",
  //   icon: <SVG.FinancialTools />,
  //   page: "Manage  city",
  //   url: "/manage-city",
  // },

  {
    id: "11",
    icon: <SVG.FinancialTools />,
    page: "Manage job seeker category",
    url: "/manage-job-seeker-category",
  },

  // {
  //   id: "12",
  //   icon: <SVG.FinancialTools />,
  //   page: "Manage job sub category",
  //   url: "/manage-job-sub-category",
  // },

  {
    id: "13",
    icon: <SVG.FinancialTools />,
    page: "Manage language",
    url: "/manage-language",
  },

  {
    id: "14",
    icon: <SVG.Report />,
    page: "Reports",
    url: "/reports",
  },
  {
    id: "15",
    icon: <SVG.UserRole />,
    page: "User rights",
    url: "/user-rights",
  },
  {
    id: "16",
    icon: <SVG.PrivacyPolicy />,
    page: "Privacy policy",
    url: "/privacy-policy",
    menuBorder: styles.borderBottom,
  },
  {
    id: "17",
    icon: <SVG.UserManagement />,
    page: "User management",
    url: "/user-management",
  },
  {
    id: "18",
    icon: <SVG.Settings />,
    page: "Settings",
    url: "/settings",
  },
];
