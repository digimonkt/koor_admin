import api from ".";
import urlcat from "urlcat";
export const manageJobData = async ({
  limit,
  page,
  search,
  country,
  action,
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/jobs", { limit, page, search, country, action }),
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
