import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { getUserDetailsApi } from "@api/manageoptions";
import { useParams } from "react-router-dom";

const EmployerDetails = () => {
  const { id } = useParams();
  const [employerDetail, setEmployerDetail] = useState([]);
  const employerDetails = async () => {
    const response = await getUserDetailsApi(id);
    if (response.remote === "success") {
      setEmployerDetail(response.data);
    }
  };
  useEffect(() => {
    employerDetails();
  }, [id]);
  return (
    <>
      <Layout employerDetail={employerDetail} />
    </>
  );
};

export default EmployerDetails;
