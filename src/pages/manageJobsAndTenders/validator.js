import { REGEX } from "@utils/enum";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as Yup from "yup";
dayjs.extend(isSameOrAfter);

export const validateCreateJobInput = Yup.object()
  .shape({
    companyType: Yup.string(),
    title: Yup.string().required("Title is required"),
    budgetCurrency: Yup.string().required("Currency is required"),
    budgetAmount: Yup.number().required("Amount is required"),
    budgetPayPeriod: Yup.string().required("Pay period is required"),
    description: Yup.string()
      .trim()
      .nonNullable()
      .required("Description cannot be empty"),
    country: Yup.object().shape({
      label: Yup.string().required("Country is required"),
      value: Yup.string().required("Country is required"),
    }),
    existCompany: Yup.string().when("companyType", {
      is: (e) => e === "exist",
      then: () => Yup.object().required("Company is required"),
      otherwise: () => Yup.object().notRequired(),
    }),
    company: Yup.string().when("companyType", {
      is: (e) => e === "new",
      then: () => Yup.string().required("Company details is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    companyEmail: Yup.string().when("companyType", {
      is: (e) => e === "new",
      then: () =>
        Yup.string()
          .email("Email must be a valid")
          .required("Company Email is required"),
      otherwise: () =>
        Yup.string().email("Email must be a valid").notRequired(),
    }),
    companyAbout: Yup.string(),
    address: Yup.string().required("Address is required"),
    jobCategories: Yup.object().shape({
      label: Yup.string().required("job Categories is required"),
      value: Yup.string().required("job Categories is required"),
    }),
    jobSubCategory: Yup.object().required("Job Sub Category is required"),
    isFullTime: Yup.boolean(),
    isPartTime: Yup.boolean(),
    hasContract: Yup.boolean(),
    duration: Yup.number(),
    experience: Yup.number().required("Experience is required"),
    isApplyThroughEmail: Yup.boolean(),
    isApplyThroughWebsite: Yup.boolean(),
    isApplyThroughKoor: Yup.boolean(),
    applicationInstruction: Yup.string().trim().nonNullable(),
    isContactEmail: Yup.boolean(),
    startDate: Yup.string().nullable().required("Start Date is required"),
    deadline: Yup.string()
      .nullable()
      .required("Deadline is required")
      .test("startDate", "Date Must be of Future", (value) => {
        return dayjs(value).isSameOrAfter(dayjs(), "days");
      }),
    websiteLink: Yup.string().when("isApplyThroughWebsite", {
      is: true,
      then: () =>
        Yup.string()
          .required("Website link is required")
          .matches(REGEX.website, "website link not valid"),
      otherwise: () =>
        Yup.string()
          .notRequired()
          .matches(REGEX.website, "website link not valid"),
    }),
    contactEmail: Yup.string().when("isApplyThroughEmail", {
      is: true,
      then: () =>
        Yup.string()
          .email("Contact email must be a valid")
          .required("Contact email is required"),
      otherwise: () => Yup.string().email().notRequired(),
    }),
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
  })
  .test(
    "oneOfFields",
    "At least one option must be selected",
    function (value) {
      const { isApplyThroughKoor, isApplyThroughEmail, isApplyThroughWebsite } =
        value;

      const isError = !(
        isApplyThroughKoor ||
        isApplyThroughEmail ||
        isApplyThroughWebsite
      );

      if (isError) {
        return this.createError({
          path: "isApplyThroughKoor",
          message: "At least one option must be selected",
        });
      }

      return true;
    }
  );

export const validateCreateTenderInput = Yup.object()
  .shape({
    title: Yup.string().required("Title is required"),
    companyType: Yup.string(),
    opportunityType: Yup.object(),
    budgetCurrency: Yup.string(),
    budgetAmount: Yup.number(),
    description: Yup.string().trim().required("Description cannot be empty"),
    country: Yup.object().shape({
      label: Yup.string().required("Country is required"),
      value: Yup.string().required("Country is required"),
    }),
    city: Yup.object().shape({
      label: Yup.string().required("City Categories is required"),
      value: Yup.string().required("City is required"),
    }),
    categories: Yup.array()
      .min(1, "At Least one category is required")
      .max(3, "Maximum 3 categories"),
    existCompany: Yup.string().when("companyType", {
      is: (e) => e === "exist" || e === undefined,
      then: () =>
        Yup.object().shape({
          label: Yup.string().required("Company is required"),
          value: Yup.string().required("Company is required"),
        }),
      otherwise: () =>
        Yup.object().shape({
          label: Yup.string().notRequired(),
          value: Yup.string().notRequired(),
        }),
    }),
    company: Yup.string().when("companyType", {
      is: (e) => e === "new" || e === undefined,
      then: () => Yup.string().required("Company details is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    companyEmail: Yup.string().when("companyType", {
      is: (e) => e === "new",
      then: () =>
        Yup.string()
          .email("Email must be a valid")
          .required("Company Email is required"),
      otherwise: () =>
        Yup.string().email("Email must be a valid").notRequired(),
    }),
    companyAbout: Yup.string(),

    sectors: Yup.object(),
    tag: Yup.object(),
    address: Yup.string().required("Address is required"),
    startDate: Yup.string().nullable().required("Start Date is required"),
    deadline: Yup.string()
      .nullable()
      .required("Deadline is required")
      .test("startDate", "Date Must be of Future", (value) => {
        return dayjs(value).isSameOrAfter(dayjs(), "days");
      }),
    isApplyThroughEmail: Yup.boolean(),
    isApplyThroughWebsite: Yup.boolean(),
    isApplyThroughKoor: Yup.boolean(),
    applicationInstruction: Yup.string().trim(),
    isContactEmail: Yup.boolean(),
    websiteLink: Yup.string().when("isApplyThroughWebsite", {
      is: true,
      then: () =>
        Yup.string()
          .required("Website link is required")
          .matches(REGEX.website, "website link not valid"),
      otherwise: () =>
        Yup.string()
          .notRequired()
          .matches(REGEX.website, "website link not valid"),
    }),
    contactEmail: Yup.string().when("isApplyThroughEmail", {
      is: true,
      then: () =>
        Yup.string()
          .email("Contact email must be a valid")
          .required("Contact email is required"),
      otherwise: () => Yup.string().email().notRequired(),
    }),
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
  })
  .test(
    "oneOfFields",
    "At least one option must be selected",
    function (value) {
      const { isApplyThroughKoor, isApplyThroughEmail, isApplyThroughWebsite } =
        value;

      const isError = !(
        isApplyThroughKoor ||
        isApplyThroughEmail ||
        isApplyThroughWebsite
      );

      if (isError) {
        return this.createError({
          path: "isApplyThroughKoor",
          message: "At least one option must be selected",
        });
      }

      return true;
    }
  );

export const validateEmployerAboutMe = Yup.object().shape({
  organizationName: Yup.string().nullable(),
  licenseId: Yup.number().typeError("License ID must be a number").nullable(),
  address: Yup.string().nullable(),
  email: Yup.string().matches(REGEX.email, "Email must be a valid").nullable(),
  description: Yup.string().nullable(),
});
