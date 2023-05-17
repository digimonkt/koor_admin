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

export const manageCategoryApi = async ({ search, limit, page }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-category", { search, limit, page }),
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
    url: urlcat("/v1/admin/job-category/:jobCategoryId", { jobCategoryId }),
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
    url: urlcat("/v1/admin/language/:jobSeekerCategoryId", {
      jobSeekerCategoryId,
    }),
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

export const manageTenderApi = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const createTenderApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category"),
    method: "POST",
    data,
  });
  return response;
};

export const tenderDeleteApi = async (tenderCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category/:tenderCategoryId", {
      tenderCategoryId,
    }),
    method: "DELETE",
  });
  return response;
};

export const editTenderApi = async (skillId, data) => {
  const response = alert("This Api is under process");
  // const response = await api.request({
  //   url: urlcat("/v1/admin/skills/:skillId", { skillId }),
  //   method: "PUT",
  //   data,
  // });
  return response;
};

export const manageSectorApi = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/sector", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const sectorDeleteApi = async (sectorId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/sector/:sectorId", {
      sectorId,
    }),
    method: "DELETE",
  });
  return response;
};

export const createSectorApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/sector"),
    method: "POST",
    data,
  });
  return response;
};

export const manageTagApi = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tag", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const tagDeleteApi = async (tagId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tag/:tagId", {
      tagId,
    }),
    method: "DELETE",
  });
  return response;
};

export const createTagApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tag"),
    method: "POST",
    data,
  });
  return response;
};

export const editTagApi = async (tagId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tag/:tagId", { tagId }),
    method: "PUT",
    data,
  });
  return response;
};

export const manageOpportunityApi = async ({
  limit,
  page,
  search,
  country,
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/opportunity-type", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const opportunityDeleteApi = async (opportunityId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/opportunity-type/:opportunityId", {
      opportunityId,
    }),
    method: "DELETE",
  });
  return response;
};

export const createOpportunityApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/opportunity-type"),
    method: "POST",
    data,
  });
  return response;
};

export const editOpportunityApi = async (opportunityId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/opportunity-type/:opportunityId", { opportunityId }),
    method: "PUT",
    data,
  });
  return response;
};
