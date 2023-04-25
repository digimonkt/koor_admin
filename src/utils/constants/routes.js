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
} from "@pages/manageOptions";

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
];

export const UNAUTHENTICATED_ROUTE = [
  {
    id: "login",
    path: "/",
    element: Login,
  },
];
