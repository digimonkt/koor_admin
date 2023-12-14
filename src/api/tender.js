import api from ".";
import urlcat from "urlcat";

// Sectors
export const getTenderSectorAPI = async data => {
  const response = await api.request({
    url: urlcat("/v1/admin/sector", { ...data, limit: 500 } || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

// OrganizationTypes
export const getTenderOpportunityTypeAPI = async data => {
  const response = await api.request({
    url: urlcat("/v1/admin/opportunity-type", { ...data, limit: 500 } || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

// TenderTags
export const getTenderTagsAPI = async data => {
  const response = await api.request({
    url: urlcat("/v1/admin/tag", { ...data, limit: 500 } || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

// TenderCategories
export const getTenderCategoryAPI = async data => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category", { ...data, limit: 500 } || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

export const deleteTenderAPI = async tenderId => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender/:tenderId", { tenderId }),
    method: "DELETE",
  });
  return response;
};
