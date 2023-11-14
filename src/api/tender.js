import api from ".";
import urlcat from "urlcat";

// Sectors
export const getTenderSectorAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/sector", data || {}),
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
export const getTenderOpportunityTypeAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/opportunity-type", data || {}),
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
export const getTenderTagsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tag", data || {}),
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
export const getTenderCategoryAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category", data || {}),
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
