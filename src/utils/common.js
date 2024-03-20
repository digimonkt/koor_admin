import { USER_ROLES } from "./enum";

export const incrementPage = ({ rows, page, startIndex }) => {
  let count = 0;
  const newRow = rows.map((item, index) => {
    if (page <= 1) {
      count = index + 1;
      item.no = count;
    } else {
      const calculatedIndex = startIndex + index;
      item.no = calculatedIndex;
    }
    return item;
  });
  return newRow;
};

export const showRole = (role) => {
  if (role === USER_ROLES.jobSeeker) {
    return "Job Seeker";
  } else if (role === USER_ROLES.employer) {
    return "Employer";
  } else if (role === USER_ROLES.vendor) {
    return "Vendor";
  } else {
    return "NA";
  }
};

export const mimeTypes = {
  ".txt": "text/plain",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".midi": "audio/midi",
  ".mid": "audio/midi",
  ".ogg": "audio/ogg",
  ".mp4": "video/mp4",
  ".mpeg": "video/mpeg",
  ".mpg": "video/mpeg",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".xls": "application/vnd.ms-excel",
  ".ppt": "application/vnd.ms-powerpoint",
  ".json": "application/json",
  ".xml": "application/xml",
  ".zip": "application/zip",
  ".rar": "application/x-rar-compressed",
  ".tar": "application/x-tar",
  ".gz": "application/gzip",
  ".7z": "application/x-7z-compressed",
};

export function getKeysByValue(object, value) {
  return Object.keys(object).filter((key) => object[key] === value);
}
