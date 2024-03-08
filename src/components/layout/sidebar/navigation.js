import { SVG } from "@assets/svg";
import styles from "./sidebar.module.css";

export const MENU_ITEM = [
  {
    id: "1",
    icon: <SVG.Dashboard />,
    page: "Dashboard",
    slug: "dashboard",
    url: "/dashboard",
  },
  {
    id: "2",
    icon: <SVG.ManageJobIcon />,
    page: "Manage jobs",
    slug: "manageJobs",
    url: "/manage-jobs",
  },
  {
    id: "3",
    icon: <SVG.ManageTenders />,
    page: "Manage tenders",
    slug: "manageTenders",
    url: "/manage-tenders",
  },
  {
    id: "3A",
    icon: <SVG.ManageTenders />,
    page: "Manage newsLetter",
    slug: "manageNewsLetter",
    url: "/manage-newsLetter",
  },
  {
    id: "3b",
    icon: <SVG.ManageTenders />,
    page: "Manage skills",
    slug: "manageSkills",
    url: "/manage-skills",
  },
  {
    id: "4",
    icon: <SVG.ManageEmployee />,
    page: "Manage employers",
    slug: "manageEmployers",
    url: "/manage-employers",
  },
  {
    id: "5",
    icon: <SVG.ManageCandidate />,
    page: "Manage candidates",
    slug: "manageCandidates",
    url: "/manage-candidates",
    menuBorder: styles.borderBottom,
  },
  {
    id: "6A",
    icon: <SVG.FinancialTools />,
    page: "Manage tender category",
    slug: "manageTenderCategory",
    url: "/manage-tender-category",
  },
  {
    id: "6",
    icon: <SVG.FinancialTools />,
    page: "Financial tools",
    slug: "financialTools",
    url: "/financial-tools",
  },

  {
    id: "7b",
    icon: <SVG.FinancialTools />,
    slug: "manageListingCompany",
    page: "Manage Listing Company",
    url: "/manage-listing-company",
  },
  {
    id: "7c",
    icon: <SVG.FinancialTools />,
    page: "Manage testimonials",
    slug: "manageTestimonials",
    url: "/manage-testimonials",
  },
  {
    id: "7",
    icon: <SVG.FinancialTools />,
    slug: "manageJobCategory",
    page: "Manage job category",
    url: "/manage-job-category",
  },
  {
    id: "8",
    icon: <SVG.FinancialTools />,
    page: "Manage  education",
    slug: "manageEducation",
    url: "/manage-education",
  },

  {
    id: "9",
    icon: <SVG.FinancialTools />,
    page: "Manage  country",
    slug: "manageCountry",
    url: "/manage-country",
  },

  {
    id: "11",
    icon: <SVG.FinancialTools />,
    page: "Manage Sector",
    slug: "manageSector",
    url: "/manage-sector",
  },

  {
    id: "12",
    icon: <SVG.FinancialTools />,
    slug: "manageTag",
    page: "Manage Tag",
    url: "/manage-tag",
  },

  {
    id: "13",
    icon: <SVG.FinancialTools />,
    page: "Manage Opportunity",
    slug: "manageOpportunity",
    url: "/manage-opportunity",
  },

  {
    id: "14",
    icon: <SVG.FinancialTools />,
    slug: "manageLanguage",
    page: "Manage language",
    url: "/manage-language",
  },

  {
    id: "15",
    icon: <SVG.Report />,
    page: "Reports",
    slug: "manageReports",
    url: "/reports",
  },
  {
    id: "16",
    icon: <SVG.UserRole />,
    slug: "userRights",
    page: "User rights",
    url: "/user-rights",
  },
  {
    id: "17",
    icon: <SVG.PrivacyPolicy />,
    slug: "privacyPolicy",
    page: "Privacy policy",
    url: "/privacy-policy",
    menuBorder: styles.borderBottom,
  },
  {
    id: "18",
    icon: <SVG.UserManagement />,
    slug: "UserManagement",
    page: "User management",
    url: "/user-management",
  },
  {
    id: "18a",
    icon: <SVG.Settings />,
    page: "Manage FAQ",
    slug: "manageFaq",
    url: "/manage-faq",
  },
  {
    id: "19",
    icon: <SVG.Settings />,
    page: "CMS and settings",
    slug: "CmsAndSetting",
    url: "/settings",
  },
  {
    id: "20",
    icon: <SVG.Settings />,
    page: "AdSense",
    slug: "AdSense",
    url: "/manage-adsense",
  },
];
