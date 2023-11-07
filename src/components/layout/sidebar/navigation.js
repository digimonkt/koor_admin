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
    id: "3A",
    icon: <SVG.ManageTenders />,
    page: "Manage newsLetter",
    url: "/manage-newsLetter",
  },
  {
    id: "3b",
    icon: <SVG.ManageTenders />,
    page: "Manage skills",
    url: "/manage-skills",
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
    id: "6A",
    icon: <SVG.FinancialTools />,
    page: "Manage tender category",
    url: "/manage-tender-category",
  },
  {
    id: "6",
    icon: <SVG.FinancialTools />,
    page: "Financial tools",
    url: "/financial-tools",
  },

  {
    id: "7b",
    icon: <SVG.FinancialTools />,
    page: "Manage Listing Company",
    url: "/manage-listing-company",
  },
  {
    id: "7c",
    icon: <SVG.FinancialTools />,
    page: "Manage testimonials",
    url: "/manage-testimonials",
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

  {
    id: "11",
    icon: <SVG.FinancialTools />,
    page: "Manage Sector",
    url: "/manage-sector",
  },

  {
    id: "12",
    icon: <SVG.FinancialTools />,
    page: "Manage Tag",
    url: "/manage-tag",
  },

  {
    id: "13",
    icon: <SVG.FinancialTools />,
    page: "Manage Opportunity",
    url: "/manage-opportunity",
  },

  {
    id: "14",
    icon: <SVG.FinancialTools />,
    page: "Manage language",
    url: "/manage-language",
  },

  {
    id: "15",
    icon: <SVG.Report />,
    page: "Reports",
    url: "/reports",
  },
  {
    id: "16",
    icon: <SVG.UserRole />,
    page: "User rights",
    url: "/user-rights",
  },
  {
    id: "17",
    icon: <SVG.PrivacyPolicy />,
    page: "Privacy policy",
    url: "/privacy-policy",
    menuBorder: styles.borderBottom,
  },
  // {
  //   id: "18",
  //   icon: <SVG.UserManagement />,
  //   page: "User management",
  //   url: "/user-management",
  // },
  {
    id: "18a",
    icon: <SVG.Settings />,
    page: "Manage FAQ",
    url: "/manage-faq",
  },
  {
    id: "19",
    icon: <SVG.Settings />,
    page: "Settings",
    url: "/settings",
  },
  {
    id: "20",
    icon: <SVG.Settings />,
    page: "AdSense",
    url: "/manage-adsense",
  },
];
