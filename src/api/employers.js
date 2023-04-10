import api from ".";
import urlcat from "urlcat";

export const manageEmployer = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/employer", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const activeInactiveUser = async (userId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/user/:userId", { userId }),
    method: "PATCH",
  });
  return response;
};

export const deleteUser = async (jobId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/user/:jobId", { jobId }),
    method: "DELETE",
  });
  return response;
};
