import api from ".";
import urlcat from "urlcat";

export const manageCandidate = async ({
  limit,
  page,
  search,
  country,
  action,
  period,
}) => {
  const response = await api.request({
    url: urlcat("/v1/admin/candidates", {
      limit,
      page,
      search,
      country,
      action,
      period,
    }),
    method: "GET",
  });
  return response;
};
