export const USER_ROLES = Object.freeze({
  jobSeeker: "job_seeker",
  employer: "employer",
  vendor: "vendor",
  admin: "admin",
});

export const MESSAGE_TYPE = {
  error: "error",
  success: "success",
  warning: "warning",
  null: "",
};
export const PAY_PERIOD = {
  year: "yearly",
  quarter: "quarterly",
  month: "monthly",
  week: "weekly",
  hour: "hourly",
};
export const SUBMITTING_STATUS_ENUM = Object.freeze({
  loading: "loading",
  submitted: "submitted",
  updated: "updated",
  error: "error",
  null: "",
});

export const REGEX = Object.freeze({
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  website: /^(http:\/\/|https:\/\/|www\.)\S+$/,
});

export const SOCIAL_LINKS = Object.freeze({
  facebook: "https://www.facebook.com/koorjobs",
  x: "#",
  linkedin: "https://www.linkedin.com/in/koorjobs",
  instagram: "https://www.instagram.com/koorjobs?igsh=enY5Z2N6MGhjeDBx",
  youtube: "https://www.youtube.com/@Koorjobs",
});
