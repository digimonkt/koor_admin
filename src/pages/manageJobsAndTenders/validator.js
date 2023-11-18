import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as Yup from "yup";
dayjs.extend(isSameOrAfter);

export const validateCreateJobInput = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  budgetCurrency: Yup.string().required("Currency is required"),
  budgetAmount: Yup.number().required("Amount is required"),
  budgetPayPeriod: Yup.string().required("Pay period is required"),
  description: Yup.string().required("Description is required"),
  country: Yup.object().shape({
    label: Yup.string().required("Country is required"),
    value: Yup.string().required("Country is required"),
  }),
  address: Yup.string().required("Address is required"),
  jobCategories: Yup.object().required("Job Category is required"),
  jobSubCategory: Yup.object().required("Job Sub Category is required"),
  isFullTime: Yup.boolean(),
  isPartTime: Yup.boolean(),
  hasContract: Yup.boolean(),
  duration: Yup.number(),
  experience: Yup.number().required("Experience is required"),
  isApplyThroughEmail: Yup.boolean(),
  isApplyThroughWebsite: Yup.boolean(),
  applicationInstruction: Yup.string()
    .nullable()
    .required("Application instructions are required"),
  isContactEmail: Yup.boolean(),
  //   websiteLink: Yup.string().when("isApplyThroughWebsite", {
  //     is: true,
  //     then: Yup.string().required("Website link is required"),
  //     otherwise: Yup.string().nullable(),
  //   }),
  deadline: Yup.string()
    .nullable()
    .required("Deadline is required")
    .test("isFuture", "Date Must be of Future", (value) => {
      return dayjs(value).isSameOrAfter(dayjs(), "days");
    }),
  startDate: Yup.string().nullable().required("Start Date is required"),
  contactEmail: Yup.string()
    .email("Contact email must be a valid")
    .test(
      "atLeastOneContactMethod",
      "At least one email is required",
      function (value) {
        const { isApplyThroughEmail } = this.parent;
        if (isApplyThroughEmail) {
          return value || this.parent.cc1 || this.parent.cc2;
        }
        return true;
      }
    ),
  cc1: Yup.string().email("CC1 email must be a valid"),
  cc2: Yup.string().email("CC2 email must be a valid"),
  isContactWhatsapp: Yup.boolean(),
  contactWhatsapp: Yup.string().test(
    "ifPresent",
    "Contact Whatsapp Number is required",
    (_, context) => {
      const { parent } = context;
      if (parent.isContactWhatsapp) {
        return parent.contactWhatsapp;
      } else {
        return true;
      }
    }
  ),

  languages: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
    })
  ),
  skills: Yup.array().of(Yup.string()),
});

export const validateCreateTenderInput = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  opportunityType: Yup.object().required("Type is required"),
  budgetCurrency: Yup.string(),
  budgetAmount: Yup.number(),
  description: Yup.string().required("Description is required"),
  country: Yup.object().required("Country is required"),
  city: Yup.object().required("City is required"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "At Least one category is required")
    .max(3, "Maximum 3 categories"),
  sectors: Yup.object().required(" Sector is required"),
  tag: Yup.object().required(" Tag is required"),
  address: Yup.string().required("Address is required"),
  deadline: Yup.string()
    .nullable()
    .required("Deadline is required")
    .test("startDate", "Date Must be of Future", (value) => {
      return dayjs(value).isSameOrAfter(dayjs(), "days");
    }),
  startDate: Yup.string().nullable().required("Start Date is required"),
});
