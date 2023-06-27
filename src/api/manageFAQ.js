import api from ".";
import urlcat from "urlcat";

export const getFAQCategoryApi = async ({ limit, page, search }) => {
  const response = await api.request({
    url: urlcat("/v1/admin/faq-category", { limit, page, search }),
    method: "GET",
  });
  return response;
};

export const getFAQApi = async ({
  limit,
  page,
  search,
  faqCategoryId,
  role,
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/:role/faq/:faqCategoryId", {
      limit,
      page,
      search,
      faqCategoryId,
      role,
    }),
    method: "GET",
  });
  return response;
};

export const deleteFaqApi = async (faqCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/faq/:faqCategoryId", { faqCategoryId }),
    method: "DELETE",
  });
  return response;
};

export const editFaqApi = async (faqId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/faq/:faqId", {
      faqId,
    }),
    method: "PUT",
    data,
  });
  return response;
};

export const addFAQCategoryApi = async (data) => {
  const response = await api.request({
    url: "/v1/admin/faq-category",
    method: "POST",
    data,
  });
  return response;
};

export const deleteFaqCategoryApi = async (faqCategoryId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/faq-category/:faqCategoryId", { faqCategoryId }),
    method: "DELETE",
  });
  return response;
};

export const editFaqCategoryApi = async (faqCategoryId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/faq-category/:faqCategoryId", {
      faqCategoryId,
    }),
    method: "PUT",
    data,
  });
  return response;
};

export const addFAQApi = async (data) => {
  const response = await api.request({
    url: "/v1/admin/faq",
    method: "POST",
    data,
  });
  return response;
};
