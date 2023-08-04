import api from ".";
import urlcat from "urlcat";
import { transformFullJobDetails } from "./transform/job";
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

export const deleteJob = async (jobId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/jobs/:jobId", { jobId }),
    method: "DELETE",
  });
  return response;
};

export const activeInactiveJob = async (jobId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/jobs/:jobId", { jobId }),
    method: "PATCH",
  });
  return response;
};

export const getCountriesName = async ({ search, limit, page }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/country", { search, limit, page }),
    method: "GET",
  });
  return response;
};

export const getLanguagesAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/language", data || {}),
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
export const getEducationLevelsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/education-level", data || {}),
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

export const getSkillsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/skills", data || {}),
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

export const GetSuggestedAddressAPI = async (search) => {
  return await api.request({
    url: urlcat("v1/users/get-location", { search }),
    method: "GET",
  });
};

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
