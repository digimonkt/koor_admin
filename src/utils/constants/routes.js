import { Login } from "@pages/auth";
import {
  Dashboard,
  ManageCandidate,
  ManageEmployer,
  ManageJobs,
  ManageTenders,
  employerDetails,
} from "@pages/manageJobsAndTenders";
import {
  ManageSkills,
  ManageSettings,
  ManageUserRights,
  ManagePrivacyPolicy,
  ManageCategory,
  manageEducation,
  ManageLanguage,
  manageSector,
  manageTag,
  manageOpportunity,
  newPostResource,
} from "@pages/manageOptions";
import ManageCountry from "@pages/manageOptions/manageCountry";
import ManageTenderCategory from "@pages/manageOptions/manageTenderCategory";

export const PUBLIC_ROUTE = [];

export const AUTHENTICATED_ROUTE = [
  {
    id: "manage-jobs",
    path: "/dashboard",
    element: Dashboard,
  },
  {
    id: "manage-jobs",
    path: "/manage-jobs",
    element: ManageJobs,
  },
  {
    id: "manage-tenders",
    path: "/manage-tenders",
    element: ManageTenders,
  },
  {
    id: "manage-employers",
    path: "/manage-employers",
    element: ManageEmployer,
  },
  {
    id: "employer-details",
    path: "/manage-employers/employer-details/:id",
    element: employerDetails,
  },
  {
    id: "manage-candidates",
    path: "/manage-candidates",
    element: ManageCandidate,
  },
  {
    id: "manage-user-rights",
    path: "/user-rights",
    element: ManageUserRights,
  },
  {
    id: "manage-privacy-policy",
    path: "/privacy-policy",
    element: ManagePrivacyPolicy,
  },
  {
    id: "manage-skills",
    path: "/manage-skills",
    element: ManageSkills,
  },

  {
    id: "manage-tender-category",
    path: "/manage-tender-category",
    element: ManageTenderCategory,
  },

  {
    id: "manage-job-category",
    path: "/manage-job-category",
    element: ManageCategory,
  },
  {
    id: "manage-education",
    path: "/manage-education",
    element: manageEducation,
  },
  {
    id: "manage-settings",
    path: "/settings",
    element: ManageSettings,
  },
  {
    id: "create-post-settings",
    path: "/settings/create-new-post",
    element: newPostResource,
  },
  {
    id: "create-post-settings",
    path: "/settings/create-new-post/:resourceId",
    element: newPostResource,
  },

  {
    id: "manage-country",
    path: "/manage-country",
    element: ManageCountry,
  },

  {
    id: "manage-sector",
    path: "/manage-sector",
    element: manageSector,
  },

  {
    id: "manage-tag",
    path: "/manage-tag",
    element: manageTag,
  },

  {
    id: "manage-opportunity",
    path: "/manage-opportunity",
    element: manageOpportunity,
  },

  {
    id: "manage-language",
    path: "/manage-language",
    element: ManageLanguage,
  },
];

export const UNAUTHENTICATED_ROUTE = [
  {
    id: "login",
    path: "/",
    element: Login,
  },
];
