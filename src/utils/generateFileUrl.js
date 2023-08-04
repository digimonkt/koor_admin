import { FILE_BASE_URL } from "./serverUrl";
export const generateFileUrl = (fileUrl) => {
    if (!fileUrl) {
        return "";
    }
    if (fileUrl.includes("http://") || fileUrl.includes("https://")) {
        return fileUrl;
    } else {
        const newUrl = FILE_BASE_URL + fileUrl.substring(1, fileUrl.length);
        return newUrl;
    }
};
