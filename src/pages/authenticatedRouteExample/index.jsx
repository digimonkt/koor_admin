import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NormalButton } from "../../components/button";
import { setIsLoggedIn } from "../../redux/slice/user";

function AuthenticatedRouteExample() {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    if (e) e.preventDefault();
    dispatch(setIsLoggedIn());
  };
  return (
    <div>
      <span>AuthenticatedRouteExample</span>
      <div>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/">
          <NormalButton>Public</NormalButton>
        </Link>
      </div>
    </div>
  );
}

export default AuthenticatedRouteExample;
