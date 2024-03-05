import api from ".";
import urlcat from "urlcat";

export const manageEmployer = async ({
  limit,
  page,
  search,
  country,
  action,
  from,
  to,
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/employer", {
      limit,
      page,
      search,
      country,
      action,
      from,
      to,
    }),
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

export const editEmployerAPI = async (userId, data) => {
  const response = await api.request({
    url: urlcat("api/v1/users/employer/about-me", { userId }),
    method: "PUT",
    data,
  });
  return response;
};

export const UpdateEmployerProfileImageAPI = async (data) => {
  return await api.request({
    url: "/v1/users/display-image",
    method: "PATCH",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
