import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function UnauthenticatedRouteComponent({ children, redirectURL }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  if (isLoggedIn) {
    return <Navigate to={location.state?.from || redirectURL} />;
  }
  return <div>{children}</div>;
}

UnauthenticatedRouteComponent.propTypes = {
  children: PropTypes.element.isRequired,
  redirectURL: PropTypes.string,
};
UnauthenticatedRouteComponent.defaultProps = {
  redirectURL: "/home",
};

export default UnauthenticatedRouteComponent;
