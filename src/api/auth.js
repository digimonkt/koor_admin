import api from ".";

export const adminLogin = async (data) => {
  const response = await api.request({
    url: "/v1/users/session",
    method: "POST",
    data,
  });
  return response;
};
