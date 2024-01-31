import api from ".";
import urlcat from "urlcat";
import {
  transformFullJobDetails,
  transformFullTenderDetails,
} from "./transform/job";

export const manageJobData = async ({
  limit,
  page,
  search,
  country,
  action,
  from,
  to,
  filterType,
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/jobs", {
      limit,
      page,
      search,
      country,
      action,
      from,
      to,
      filterType,
    }),
    method: "GET",
  });
  return response;
};

// DeleteJob
export const deleteJob = async (jobId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/jobs/:jobId", { jobId }),
    method: "DELETE",
  });
  return response;
};

// ToggleJobStatus
export const activeInactiveJob = async (jobId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/jobs/:jobId", { jobId }),
    method: "PATCH",
  });
  return response;
};

// CountriesName
export const getCountriesName = async ({ search, limit, page }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/country", { search, limit, page }),
    method: "GET",
  });
  return response;
};

// Languages
export const getLanguagesAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/language", { ...data, limit: 500 } || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

// EducationLevel
export const getEducationLevelsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/education-level", { ...data, limit: 500 } || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

// Skills
export const getSkillsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/skills", { ...data, limit: 500 } || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

// GoogleMapAddress
export const GetSuggestedAddressAPI = async (search) => {
  return await api.request({
    url: urlcat("v1/users/get-location", { search }),
    method: "GET",
  });
};

// CreateJob
export const createJobAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/admin/jobs/create"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return res;
};

// UpdateEmployeeJob
export const updateEmployerJobAPI = async (jobId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/jobs/create/:jobId", { jobId }),
    method: "PUT",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// JobDetails
export const getJobDetailsByIdAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/:jobId", data),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformFullJobDetails(response.data),
    };
  }
  return response;
};

// CreateTender
export const createTenderAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/admin/tender/create"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return res;
};

// TenderDetails
export const getTenderDetailsByIdAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/tenders/:tenderId", data),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformFullTenderDetails(response.data),
    };
  }
  return response;
};

// UpdateTender
export const updateTenderAPI = async (tenderId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender/create/:tenderId", { tenderId }),
    method: "PUT",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
