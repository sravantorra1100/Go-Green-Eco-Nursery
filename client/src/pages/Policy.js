import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacypolicy.jpg"
            alt="imgnotfound"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>companys privacy policy Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, illo!</p>
          <p>companys privacy policy Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, illo!</p>
          <p>companys privacy policy Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, illo!</p>
          <p>companys privacy policy Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, illo!</p>
          <p>companys privacy policy Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, illo!</p>
          <p>companys privacy policy Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, illo!</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;