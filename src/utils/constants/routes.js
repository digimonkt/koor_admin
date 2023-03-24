import { Login } from "@pages/auth";
import {
  ManageCandidate,
  ManageEmployer,
  ManageJobs,
  ManageTenders,
} from "@pages/manageJobsAndTenders";

export const PUBLIC_ROUTE = [];

export const AUTHENTICATED_ROUTE = [
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
];

export const UNAUTHENTICATED_ROUTE = [
  {
    id: "login",
    path: "/",
    element: Login,
  },
];
