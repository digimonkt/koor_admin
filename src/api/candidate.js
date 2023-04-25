import api from ".";
import urlcat from "urlcat";

export const manageCandidate = async ({
  limit,
  page,
  search,
  country,
  action,
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/candidates", {
      limit,
      page,
      search,
      country,
      action,
    }),
    method: "GET",
  });
  return response;
};
