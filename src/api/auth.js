import api from ".";

export const adminLogin = async (data) => {
  const response = await api.request({
    url: "/v1/users/session",
    method: "POST",
    data,
  });
  return response;
};

export const ChangeAdminPassword = async (data) => {
  const response = await api.request({
    url: "/v1/admin/change-password",
    method: "PATCH",
    data,
  });
  return response;
};
