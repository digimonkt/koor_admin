import api from ".";
import urlcat from "urlcat";

export const getUserCountApi = async (period) => {
  const response = await api.request({
    url: urlcat("/v1/admin/users-count", { period }),
    method: "GET",
  });
  return response;
};

export const getDashboardApi = async (period) => {
  const response = await api.request({
    url: urlcat("/v1/admin/dashboard", { period }),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: {
        employers: response.data.employers || 0,
        jobs: response.data.jobs || 0,
      },
    };
  }
};

export const getFinancialCountApi = async (period) => {
  const response = await api.request({
    url: urlcat("/v1/admin/financial-count", { period }),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: {
        totalCredits: response.data.total_credits || 0,
        gold: response.data.gold || 0,
        silver: response.data.silver || 0,
        copper: response.data.copper || 0,
      },
    };
  }
};
