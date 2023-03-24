import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NormalButton } from "../../components/button";
import { setIsLoggedIn } from "../../redux/slice/user";

function UnauthenticatedRouteExample() {
  const dispatch = useDispatch();
  const handleLoggedIn = (e) => {
    if (e) e.preventDefault();
    dispatch(setIsLoggedIn(true));
  };
  return (
    <div>
      <span>UnauthenticatedRouteExample</span>
      <div>
        <button onClick={handleLoggedIn}>Login</button>
        <Link to="/">
          <NormalButton>Public</NormalButton>
        </Link>
      </div>
    </div>
  );
}

export default UnauthenticatedRouteExample;
