import { SVG } from "@assets/svg";

export const DATE_FORMAT = "MM-DD-YYYY";
export const DATABASE_DATE_FORMAT = "YYYY-MM-DD";
export const YEAR_FORMAT = "YYYY";
export const MONTH_YEAR_FORMAT = "MMMM YYYY";
export const SALARY_MIN = "";
export const SALARY_MAX = "";
export const TESTIMONIAL_MAX_WORD = 450;
export const BLACKLIST_REASON_LIST = [
  { label: "Spam", value: "Spam" },
  { label: "Offensive Behavior", value: "Offensive Behavior" },
  { label: "Fake Information", value: "Fake Information" },
  { label: "Malicious activity", value: "Malicious Activity" },
];
export const OTHER_BUTTON = [
  {
    icon: <SVG.Reciept />,
    svg: <SVG.ArrowForward />,
    text: "Find Tender",
    url: "/search/tenders",
  },
  {
    icon: <SVG.ProfileIcon />,
    svg: <SVG.ArrowForward />,
    text: "Find Talent",
    url: "/search/talents",
  },
  {
    icon: <SVG.Work />,
    svg: <SVG.ArrowForward />,
    text: "Find Job",
    url: "/search/jobs",
  },
];
