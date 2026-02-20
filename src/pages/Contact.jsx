import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Contact = () => {

 const navigate = useNavigate();

  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/image/contact.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
                 
      <p
        className="mt-3"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          borderRadius: "10px",
          background: "#4facfe",
          color: "white",
          fontWeight: "600",
          transition: "0.3s",
        }}
        onClick={() => navigate("/faq")} // yaha /faq ya /support page ka path
        onMouseOver={(e) => (e.target.style.background = "#7b2ff7")}
        onMouseOut={(e) => (e.target.style.background = "#4facfe")}
      >
        Talk to Us
      </p>
   




        </div>
      </div>
    </Layout>
  );
};

export default Contact;