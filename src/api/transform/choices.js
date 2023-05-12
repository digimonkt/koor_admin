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

export const transformOptionsResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    tender_id: data.tender_id,
    title: data.title,
    tender_type: data.tender_type.title,
    sector: data.sector.title,
    city: data.city.title,
    country: data.country.title,
    status: data.status,
  }));
};

export const transformSubCategoryResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    name: data.title,
    category: data.category.title,
    categoryId: data.category.id,
  }));
};

export const transformCityResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    city: data.title,
    country: data.country.title,
    countryId: data.country.id,
  }));
};
