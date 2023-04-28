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
