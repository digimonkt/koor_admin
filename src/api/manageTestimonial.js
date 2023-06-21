import api from ".";
import urlcat from "urlcat";

export const getTestimonialListApi = async (limit) => {
  const response = await api.request({
    url: urlcat("/v1/admin/testimonial", { limit }),
    method: "GET",
  });
  return response;
};

export const getSingleTestimonialListApi = async (testimonialId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/testimonial/:testimonialId/detail", {
      testimonialId,
    }),
    method: "GET",
  });
  return response;
};

export const createTestimonialApi = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/testimonial"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return response;
};

export const testimonialDeleteApi = async (testimonialId) => {
  const response = await api.request({
    url: urlcat("/v1/admin/testimonial/:testimonialId", { testimonialId }),
    method: "DELETE",
  });
  return response;
};

export const editTestimonialIdApi = async (testimonialId, data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/testimonial/:testimonialId", { testimonialId }),
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return response;
};
