import api from ".";
import urlcat from "urlcat";

export const getJobSubCategoryApi = async ({
  limit = 500,
  page,
  search,
  ...rest
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-sub-category", { limit, page, search, ...rest }),
    method: "GET",
  });
  return response;
};

export const addSubCategoryApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-sub-category"),
    method: "POST",
    data,
  });
  return response;
};

export const deleteSubCategoryApi = async (jobSubCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-sub-category/:jobSubCategoryId", {
      jobSubCategoryId,
    }),
    method: "DELETE",
  });
  return response;
};

export const editSubCategoryApi = async (jobSubCategoryId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-sub-category/:jobSubCategoryId", {
      jobSubCategoryId,
    }),
    method: "PUT",
    data,
  });
  return response;
};
