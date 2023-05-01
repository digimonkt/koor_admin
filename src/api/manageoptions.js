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
    url: urlcat("/v1/admin/skills/:skillId", { skillId }),
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
    url: urlcat("/v1/admin/job-category/:jobCategoryId", { jobCategoryId }),
    method: "DELETE",
  });
  return response;
};

export const manageEducationApi = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/education-level", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const addEducationApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/education-level"),
    method: "POST",
    data,
  });
  return response;
};

export const deleteEducationApi = async (educationLevelId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/education-level/:educationLevelId", {
      educationLevelId,
    }),
    method: "DELETE",
  });
  return response;
};

export const editSkillApi = async (skillId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/skills/:skillId", { skillId }),
    method: "PUT",
    data,
  });
  return response;
};

export const editCategoryApi = async (jobCategoryId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-category/:jobCategoryId", jobCategoryId),
    method: "PUT",
    data,
  });
  return response;
};

export const editEducationApi = async (educationLevelId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/education-level/:educationLevelId", {
      educationLevelId,
    }),
    method: "PUT",
    data,
  });
  return response;
};

export const getJobSeekerCategoryApi = async ({ limit, page, search }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-seeker-category", { limit, page, search }),
    method: "GET",
  });
  return response;
};

export const addJobSeekerCategoryApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-seeker-category"),
    method: "POST",
    data,
  });
  return response;
};

export const editJobSeekerCategoryApi = async (jobSeekerCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-seeker-category/:jobSeekerCategoryId", {
      jobSeekerCategoryId,
    }),
    method: "PUT",
  });
  return response;
};

export const deleteJobSeekerCategoryApi = async (jobSeekerCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-seeker-category/:jobSeekerCategoryId", {
      jobSeekerCategoryId,
    }),
    method: "DELETE",
  });
  return response;
};

export const getLanguageApi = async ({ limit, page, search }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/language", { limit, page, search }),
    method: "GET",
  });
  return response;
};

export const addLanguageApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/language"),
    method: "POST",
    data,
  });
  return response;
};

export const editLanguageApi = async (jobSeekerCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/language/:jobSeekerCategoryId", jobSeekerCategoryId),
    method: "PUT",
  });
  return response;
};

export const deleteLanguageApi = async (jobSeekerCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/language/:jobSeekerCategoryId", {
      jobSeekerCategoryId,
    }),
    method: "DELETE",
  });
  return response;
};
