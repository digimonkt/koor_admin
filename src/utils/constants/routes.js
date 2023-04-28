import { Login } from "@pages/auth";
import {
  Dashboard,
  ManageCandidate,
  ManageEmployer,
  ManageJobs,
  ManageTenders,
} from "@pages/manageJobsAndTenders";
import {
  ManageSkills,
  ManageSettings,
  ManageUserRights,
  ManagePrivacyPolicy,
  ManageCategory,
  manageEducation,
  ManageJobSeekerCategory,
  ManageJobSeekerSubCategory,
  ManageLanguage,
} from "@pages/manageOptions";
import ManageCity from "@pages/manageOptions/manageCity";
import ManageCountry from "@pages/manageOptions/manageCountry";

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
    id: "manage-category",
    path: "/manage-category",
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
    id: "manage-country",
    path: "/manage-country",
    element: ManageCountry,
  },
  {
    id: "manage-city",
    path: "/manage-city",
    element: ManageCity,
  },

  {
    id: "manage-job-seeker-category",
    path: "/manage-job-seeker-category",
    element: ManageJobSeekerCategory,
  },

  {
    id: "manage-job-sub-category",
    path: "/manage-job-sub-category",
    element: ManageJobSeekerSubCategory,
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
