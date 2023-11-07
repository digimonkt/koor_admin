import urlcat from "urlcat";
import api from ".";

export const getAdSenseAPI = async ({ pageTitle }) => {
    const response = await api.request({
        url: urlcat("v1/admin/google-add-sense-code", { page_title: pageTitle }),
        method: "GET",
    });
    return response;
};

export const addAdSenseAPI = async (data) => {
    console.log({ data });
    const response = await api.request({
        url: urlcat("v1/admin/google-add-sense-code"),
        method: "POST",
        data
    });
    return response;
};
export const deleteAdSenseAPI = async ({ deleteAdSense }) => {
    const response = await api.request({
        url: urlcat("v1/admin/google-add-sense-code/:codeId", { codeId: deleteAdSense }),
        method: "DELETE",
    });
    return response;
};

export const updateAdSenseAPI = async ({ editAdSense, editAdSenseValue }) => {
    console.log({ editAdSense, editAdSenseValue });
    const response = await api.request({
        url: urlcat("v1/admin/google-add-sense-code/:codeId", { codeId: editAdSense }),
        method: "PUT",
        data: { code: editAdSenseValue }
    });
    return response;
};
