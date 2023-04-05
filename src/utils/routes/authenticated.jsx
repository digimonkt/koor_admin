import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthenticatedRouteComponent({ children, redirectURL }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  if (!isLoggedIn) {
    return (
      <Navigate
        to={redirectURL}
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }
  return <div>{children}</div>;
}

AuthenticatedRouteComponent.propTypes = {
  children: PropTypes.element.isRequired,
  redirectURL: PropTypes.string,
};
AuthenticatedRouteComponent.defaultProps = {
  redirectURL: "/",
};

export default AuthenticatedRouteComponent;
