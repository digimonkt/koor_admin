export const transformAdminList = (data) => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    countryCode: data.country_code,
    mobileNumber: data.mobile_number,
  };
};
