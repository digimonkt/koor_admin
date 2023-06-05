import React, { useEffect } from "react";
import Layout from "./layout";
import { getUserDetailsApi } from "@api/manageoptions";
import { useParams } from "react-router-dom";

const EmployerDetails = () => {
  const { id } = useParams();
  console.log(id);
  const employerDetails = async () => {
    const response = await getUserDetailsApi(id);
    if (response.remote === "success") {
      console.log(response.data);
    }
  };
  useEffect(() => {
    employerDetails();
  }, []);
  return (
    <>
      <Layout />
    </>
  );
};

export default EmployerDetails;
