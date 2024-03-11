import React, { useEffect } from "react";
import Layout from "@components/layout";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { PUBLIC_ROUTE, UNAUTHENTICATED_ROUTE } from "./utils/constants/routes";
import { PublicRoute, UnauthenticatedRoute } from "./utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToast, SuccessToast } from "@components/toast";
import { MESSAGE_TYPE } from "@utils/enum";
import { resetToast } from "@redux/slice/toast";
import { setIsLoggedIn } from "@redux/slice/user";
import { globalLocalStorage } from "@utils/localStorage";
import "react-perfect-scrollbar/dist/css/styles.css";
import { getUserMangeRigths } from "@redux/slice/userRightsManagement";
import { MENU_ITEM } from "@utils/constants/navigation";

function App() {
  const dispatch = useDispatch();
  const {
    toast: { message: toastMessage, type: toastType },
    auth: { isLoggedIn },
    userRights: { pageManageRights },
  } = useSelector((state) => state);
  const navigation = useNavigate();
  const checkLoginStatus = () => {
    const accessToken = globalLocalStorage.getAccessToken();
    const refreshToken = globalLocalStorage.getRefreshToken();
    if (accessToken && refreshToken) {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
    }
  };

  useEffect(() => {
    MENU_ITEM.filter((item) => {
      const hasSubright = pageManageRights.some(
        (right) => right.subrights_value === item.url.substring(1),
      );

      if (!hasSubright && !item.url.includes(hasSubright)) {
        navigation("/");
      }

      return hasSubright;
    });
  }, [pageManageRights]);

  useEffect(() => {
    checkLoginStatus();
  }, []);
  useEffect(() => {
    dispatch(getUserMangeRigths());
  }, [isLoggedIn]);
  return (
    <div className="App">
      <Routes>
        {PUBLIC_ROUTE.map((route) => {
          return (
            <Route
              path={route.path}
              element={
                <PublicRoute>
                  <route.element />
                </PublicRoute>
              }
              key={route.id}
            />
          );
        })}

        {UNAUTHENTICATED_ROUTE.map((route) => {
          return (
            <Route
              path={route.path}
              element={
                <UnauthenticatedRoute redirectURL="/dashboard">
                  <route.element />
                </UnauthenticatedRoute>
              }
              key={route.id}
            />
          );
        })}
        <Route path={"/*"} element={<Layout />} />
      </Routes>
      <SuccessToast
        open={toastType === MESSAGE_TYPE.success}
        message={toastMessage}
        handleClose={() => dispatch(resetToast())}
      />
      <ErrorToast
        open={toastType === MESSAGE_TYPE.error}
        message={toastMessage}
        handleClose={() => dispatch(resetToast())}
      />
    </div>
  );
}

export default App;
