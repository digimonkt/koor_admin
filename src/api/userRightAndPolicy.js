import api from ".";
import urlcat from "urlcat";

export const getUserRightsApi = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/user-rights"),
    method: "GET",
  });
  return response;
};
export const updateUserRightsApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/user-rights"),
    method: "PATCH",
    data,
  });
  return response;
};

export const getPrivacyApi = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/privacy-policy"),
    method: "GET",
  });
  return response;
};
export const updatePrivacyApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/privacy-policy"),
    method: "PATCH",
    data,
  });
  return response;
};
