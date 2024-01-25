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
  website:
    /^((ftp|http|https):\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/[\w#-]+)*)?$/gm,
});
