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

export const editLanguageApi = async (languageId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/language/:languageId", {
      languageId,
    }),
    method: "PUT",
    data,
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

export const manageTenderCategoryApi = async ({
  limit,
  page,
  search,
  country,
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const createTenderCategoryApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category"),
    method: "POST",
    data,
  });
  return response;
};

export const tenderCategoryDeleteApi = async (tenderCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category/:tenderCategoryId", {
      tenderCategoryId,
    }),
    method: "DELETE",
  });
  return response;
};

export const editTenderCategoryApi = async (tenderCategoryId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category/:tenderCategoryId", {
      tenderCategoryId,
    }),
    method: "PUT",
    data,
  });
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

export const editSectorApi = async (sectorId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/sector/:sectorId", { sectorId }),
    method: "PUT",
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

export const getResourcesApi = async (limit) => {
  const response = await api.request({
    url: urlcat("/v1/admin/resources", { limit }),
    method: "GET",
  });
  return response;
};

export const createResourcesApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/resources"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return response;
};

export const updateResourcesApi = async (resourcesId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/resources/:resourcesId", { resourcesId }),
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return response;
};

export const editResourcesApi = async (resourcesId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/resources/:resourcesId", { resourcesId }),
    method: "PUT",
    data,
  });
  return response;
};

export const resourcesDeleteApi = async (resourcesId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/resources/:resourcesId", {
      resourcesId,
    }),
    method: "DELETE",
  });
  return response;
};

export const getSingleResourcesApi = async (resourcesId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/resources/:resourcesId/detail", { resourcesId }),
    method: "GET",
  });
  return response;
};

export const getUserDetailsApi = async (userId) => {
  const response = await api.request({
    url: urlcat("/v1/users", { userId }),
    method: "GET",
  });
  return response;
};

export const verifyUnVerifyApi = async (employerId, action) => {
  const response = await api.request({
    url: urlcat("/v1/admin/employer/:employerId/:action", {
      employerId,
      action,
    }),
    method: "PUT",
  });
  return response;
};

export const getCompanyListingApi = async (limit) => {
  const response = await api.request({
    url: urlcat("/v1/admin/upload-logo", { limit }),
    method: "GET",
  });
  return response;
};

export const addCategoryLogoApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/upload-logo"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return response;
};

export const deleteCompanyLogoApi = async (logoId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/upload-logo/:logoId", {
      logoId,
    }),
    method: "DELETE",
  });
  return response;
};

export const getNewsletterApi = async ({ limit, page, search, country }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/newsletter-user", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};

export const deleteNewsLetterApi = async (newsletterId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/newsletter-user/:newsletterId", {
      newsletterId,
    }),
    method: "DELETE",
  });
  return response;
};
