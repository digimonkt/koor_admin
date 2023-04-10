export const transformJobAPIResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    jobId: data.job_id,
    jobTitle: data.title,
    company: data.user,
    location: `${data.city.title},${data.country.title}`,
    action: data.status,
  }));
};

export const transformEmployerAPIResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    name: data.name,
    email: data.email,
    mobileNumber: data.mobile_number,
    action: data.is_active,
  }));
};

export const transformCandidatesAPIResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    name: data.name,
    email: data.email,
    mobileNumber: data.mobile_number,
    action: data.is_active,
  }));
};
