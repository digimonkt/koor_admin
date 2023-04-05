import api from ".";
import urlcat from "urlcat";

export const manageCandidate = async (limit, page, search, country) => {
  const response = await api.request({
    url: urlcat("/v1/admin/candidates", { limit, page, search, country }),
    method: "GET",
  });
  return response;
};
