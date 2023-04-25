import api from ".";
import urlcat from "urlcat";

export const getUserCountApi = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/users-count"),
    method: "GET",
  });
  return response;
};

export const getDashboardApi = async (period) => {
  const response = await api.request({
    url: urlcat("/v1/admin/dashboard", { period }),
    method: "GET",
  });
  return response;
};
