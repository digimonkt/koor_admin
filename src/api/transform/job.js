import { generateFileUrl } from "@utils/generateFileUrl";
import dayjs from "dayjs";

export const transformFullJobDetails = (data) => {
    return {
        id: data.id,
        company: data.company,
        companyLogo: data.company_logo?.path ? generateFileUrl(data.company_logo.path) : "",
        title: data.title,
        application: data.application || {},
        description: data.description,
        budgetCurrency: data.budget_currency,
        budgetAmount: Number(data.budget_amount).toLocaleString(),
        budgetPayPeriod: data.budget_pay_period,
        country: data.country,
        city: data.city,
        address: data.address,
        jobCategories: data.job_category,
        jobSubCategory: data.job_sub_category,
        duration: data.duration,
        experience: data.experience,
        deadline: data.deadline,
        startDate: data.start_date,
        isFullTime: data.is_full_time,
        isApplied: data.is_applied,
        isEditable: data.is_editable,
        isSaved: data.is_saved,
        isPartTime: data.is_part_time,
        hasContract: data.has_contract,
        contactEmail: data.contact_email || "",
        cc1: data.cc1 || "",
        cc2: data.cc2 || "",
        contactPhone: data.contact_phone || "",
        contactWhatsapp: data.contact_whatsapp || "",
        highestEducation: data.highest_education,
        languages: data.language || [],
        skills: data.skill || [],
        status: data.status,
        applicant: data.applicant,
        createdAt: data.created,
        expiredInDays: dayjs(data.deadline).diff(
            dayjs(new Date().toISOString().split("T")[0]),
            "day",
            true
        ),
        user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            countryCode: data.user.country_code,
            mobileNumber: data.user.mobile_number,
            image: data.user.image,
        },
        attachments:
            data.attachments?.map((attachment) => ({
                id: attachment.id,
                path: attachment.path,
                type: attachment.type,
                title: attachment.title,
            })) || [],
    };
};
