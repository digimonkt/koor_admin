import React, { useEffect } from "react";
import Layout from "@components/layout";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PUBLIC_ROUTE, UNAUTHENTICATED_ROUTE } from "./utils/constants/routes";
import { PublicRoute, UnauthenticatedRoute } from "./utils/routes";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "@redux/slice/user";
import { globalLocalStorage } from "@utils/localStorage";
function App() {
  const dispatch = useDispatch();
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
    checkLoginStatus();
  }, []);
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
        <Route
          path={"/*"}
          element={
            <>
              <Layout />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
