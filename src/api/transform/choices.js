import {
  ManageButtonIcon,
  SaveButton,
} from "@components/financialtools/table/data";
import { SVG } from "@assets/svg";
export const transformJobAPIResponse = (data) => {
  console.log(data);
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    jobId: data.job_id,
    jobTitle: data.title,
    company: data.user || data.company,
    postedBy: data.post_by_admin ? "Admin" : data.user || data.company,
    location: `${data.city.title ? data.city.title + ", " : ""}${
      data.country.title
    }`,
    action: data.status,
  }));
};

export const transformEmployerAPIResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    name: data.name,
    credits: data.points,
    email: data.email,
    mobileNumber: data.mobile_number,
    action: data.is_active,
    verify: data.verify,
  }));
};

export const transformCandidatesAPIResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    name: data.name,
    email: data.email,
    role: data.role,
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
    postedBy: data.posted_by_admin ? "Admin" : data.user || data.company,
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

export const transformSkillResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    name: data.title,
  }));
};
export const transformFAQCategoryResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    name: data.title,
    role: data.role,
  }));
};

export const transformResourcesResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    imgUrl: data.attachment.path,
    title: data.title,
    description: data.description,
  }));
};

export const transformCompanyListResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    imgUrl: data.logo.path,
    title: data.logo.title,
  }));
};

export const transformNewsLetterResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    email: data.email,
    date: data.created.slice(0, 10),
  }));
};

export const transformFAQResponse = (data) => {
  return data.map((data, index) => ({
    id: data.id,
    no: index + 1,
    Question: data.question,
    Answer: stripHTMLTags(data.answer).slice(0, 15) + "...",
  }));
};

export const transformTestimonialResponse = (data) => {
  return data.map((data) => ({
    id: data.id,
    clientName: data.client_name,
    description: data.description,
    imageUrl: data.image.path,
  }));
};

export function stripHTMLTags(html) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || "";
}

export const transformInvoiceList = (data) => {
  return data.map((data) => ({
    date: data.created.slice(0, 9),
    number: data.invoice_id,
    company: data.user.name,
    amount: "0",
    sent: data.is_send ? <SVG.CircleCheckIcon /> : "",
    save: <SaveButton buttonName="XLS" buttonPdf="PDF" />,
    manage: (
      <ManageButtonIcon
        eyeIcon={<SVG.EyeIcon />}
        editIcon={<SVG.EditIcon />}
        mailIcon={<SVG.ForwardIcon />}
      />
    ),
  }));
};

export const transformEmployerData = (data) => {
  return data.map((data) => ({
    id: data.id,
    title: data.name || data.email,
    value: data.id,
  }));
};

export const transformAdSenseResponse = (data) => {
  return data.map((data) => ({
    id: data.id || "",
    pageName: data.page_title || "",
    code: data.code || "",
  }));
};
