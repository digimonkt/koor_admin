import axios from "axios";
import QueryString from "qs";
import { SERVER_URL } from "../utils/serverUrl";
import { localStorage } from "../utils/localStorage";


export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    QueryString.stringify(params, { arrayFormat: "brackets" }),
});

axiosInstance.interceptors.response.use(function (response) {
  // ... do something

  return response;
});

export const request = async (
  config
) => {
  try {
    if (!config.headers) {
      config.headers = {};
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    const accessToken = localStorage.getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    const response = await axiosInstance.request({ ...config });
    return {
      remote: "success",
      data: response.data,
    };
  } catch (error) {
    if (error) {
      if (error.response) {
        const axiosError = error
        if (axiosError.response && axiosError.response.data) {
          let errorMessage = axiosError.response.data.errors;
          // check for 500 to handle message defined by the app
          if (axiosError.response.status === 500) {
            errorMessage = "Internal Server Error";
          } else {
            errorMessage = error.response.data.errors;
          }
          return {
            remote: "failure",
            error: {
              status: axiosError.response.status,
              errors: errorMessage,
            },
          };
        }
      } else {
        const axiosError = error
        let errorMessage = axiosError.message;

        return {
          remote: "failure",
          error: {
            errors: errorMessage,
          },
        };
      }
    }
    throw error;
  }
};

export const parseResponse = (
  response
) => {
  const data = JSON.parse(response);
  if (data && (data.errors || data.error)) {
    return {
      remote: "failure",
      error: {
        errors: data.errors ?? data.error,
      },
    };
  }
  return {
    remote: "success",
    data,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { axiosInstance, request, parseResponse };