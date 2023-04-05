export const globalLocalStorage = {
  setAccessToken: (accessToken) => {
    localStorage.setItem("x-access", accessToken);
    window.dispatchEvent(new Event("storage"));
  },
  removeAccessToken: () => {
    localStorage.removeItem("x-access");
    window.dispatchEvent(new Event("storage"));
  },
  getAccessToken: () => localStorage.getItem("x-access"),
  setRefreshToken: (refreshToken) => {
    localStorage.setItem("x-refresh", refreshToken);
    window.dispatchEvent(new Event("storage"));
  },
  removeRefreshToken: () => {
    localStorage.removeItem("x-refresh");
    window.dispatchEvent(new Event("storage"));
  },
  getRefreshToken: () => localStorage.getItem("x-refresh"),
};
