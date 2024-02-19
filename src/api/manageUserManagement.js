import api from ".";
import urlcat from "urlcat";

export const getUsersManageRigthAPI = async (userId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/user-rights", {
      userId,
    }),
    method: "GET",
  });
  return response;
};

// export const addCountriesApi = async (data) => {
//   const response = await api.request({
//     url: "/v1/admin/country",
//     method: "POST",
//     data,
//   });
//   return response;
// };

// export const deleteCountriesApi = async (countryId) => {
//   const response = await api.request({
//     url: urlcat("/v1/admin/country/:countryId", { countryId }),
//     method: "DELETE",
//   });
//   return response;
// };

// export const getCityApi = async (data) => {
//   const response = await api.request({
//     url: urlcat("/v1/admin/city", { ...data, limit: 500 }),
//     method: "GET",
//   });
//   return response;
// };

// export const getWorldCityApi = async (countryName, search) => {
//   const response = await api.request({
//     url: urlcat("/v1/admin/world-city", {
//       countryName,
//       search,
//     }),
//     method: "GET",
//   });
//   return response;
// };
