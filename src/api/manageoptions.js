import api from ".";
import urlcat from "urlcat";

export const manageSkillApi = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/skills", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const createSkillApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/skills"),
    method: "POST",
    data,
  });
  return response;
};

export const skillDeleteApi = async (skillId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/skills", skillId),
    method: "DELETE",
  });
  return response;
};

export const manageCategoryApi = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-category", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const addCategoryApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-category"),
    method: "POST",
    data,
  });
  return response;
};

export const deleteCategoryApi = async (jobCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-category", jobCategoryId),
    method: "DELETE",
  });
  return response;
};

export const manageEducation = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-category", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};
