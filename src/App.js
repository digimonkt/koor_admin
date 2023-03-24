import Layout from "@components/layout";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PUBLIC_ROUTE, UNAUTHENTICATED_ROUTE } from "./utils/constants/routes";
import { PublicRoute, UnauthenticatedRoute } from "./utils/routes";

function App() {
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
                <UnauthenticatedRoute redirectURL="/authenticated">
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
