import React from "react";
import PropTypes from "prop-types";

function PublicRouteComponent({ children }) {
  return <div>{children}</div>;
}

PublicRouteComponent.propTypes = {
  children: PropTypes.element.isRequired,
};
export default PublicRouteComponent;
