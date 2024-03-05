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
  manageListingCompany,
  manageTestimonials,
  postTestimonials,
  manageNewsLetter,
  manageReports,
  financialTools,
  manageFAQ,
  showFAQ,
  ManageAdSense,
  // addFAQ,
} from "@pages/manageOptions";
import ManageCountry from "@pages/manageOptions/manageCountry";
import ManageUserManagement from "@pages/manageOptions/manageUserManagement";
import ViewInvoices from "@pages/manageOptions/manageFinancialTools/view-invoices";
import ManageTenderCategory from "@pages/manageOptions/manageTenderCategory";
import PostNewJob from "@pages/manageJobsAndTenders/jobs/postNewJob/PostNewJob";
import PostTender from "@pages/manageJobsAndTenders/tenders/postTender/postTender";
import EditEmployer from "@pages/manageJobsAndTenders/employer/editEmployer";

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
    id: "edit-employer",
    path: "/edit-employer",
    element: EditEmployer,
  },
  {
    id: "post-new-job",
    path: "/post-newJob",
    element: PostNewJob,
  },
  {
    id: "manage-tenders",
    path: "/manage-tenders/post-tender",
    element: PostTender,
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
    id: "manage-financial-tools",
    path: "/financial-tools",
    element: financialTools,
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

  {
    id: "manage-listing-company",
    path: "/manage-listing-company",
    element: manageListingCompany,
  },
  {
    id: "manage-testimonials",
    path: "/manage-testimonials",
    element: manageTestimonials,
  },
  {
    id: "post-testimonials",
    path: "/post-testimonials/:id",
    element: postTestimonials,
  },
  {
    id: "post-testimonials",
    path: "/post-testimonials",
    element: postTestimonials,
  },
  {
    id: "manage-newsLetter",
    path: "/manage-newsLetter",
    element: manageNewsLetter,
  },
  {
    id: "manage-reports",
    path: "/reports",
    element: manageReports,
  },
  {
    id: "manage-faq",
    path: "/manage-faq",
    element: manageFAQ,
  },
  {
    id: "manage-faq",
    path: "/manage-faq/:faqCategoryId/:role",
    element: showFAQ,
  },
  {
    id: "view-invoice",
    path: "/financial-tools/view-invoice/:invoiceId",
    element: ViewInvoices,
  },
  {
    id: "manage-adsense",
    path: "/manage-adsense",
    element: ManageAdSense,
  },
  {
    id: "user-management",
    path: "/user-management",
    element: ManageUserManagement,
  },
];

export const UNAUTHENTICATED_ROUTE = [
  {
    id: "login",
    path: "/",
    element: Login,
  },
];
