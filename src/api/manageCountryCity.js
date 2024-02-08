import api from ".";
import urlcat from "urlcat";

export const getWorldCountryApi = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/world-country"),
    method: "GET",
  });
  return response;
};

export const addCountriesApi = async (data) => {
  const response = await api.request({
    url: "/v1/admin/country",
    method: "POST",
    data,
  });
  return response;
};

export const deleteCountriesApi = async (countryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/country/:countryId", { countryId }),
    method: "DELETE",
  });
  return response;
};

export const getCityApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/city", { ...data, limit: 500 }),
    method: "GET",
  });
  return response;
};

export const getWorldCityApi = async (countryName, search) => {
  const response = await api.request({
    url: urlcat("/v1/admin/world-city", {
      countryName,
      search,
    }),
    method: "GET",
  });
  return response;
};

export const addCityApi = async (data) => {
  const response = await api.request({
    url: "/v1/admin/city",
    method: "POST",
    data,
  });
  return response;
};

export const deleteCitiesApi = async (cityId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/city/:cityId", { cityId }),
    method: "DELETE",
  });
  return response;
};
