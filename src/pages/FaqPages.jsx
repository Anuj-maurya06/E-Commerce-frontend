import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://e-commerce-backend-orcin-nine.vercel.app";

const FAQBot = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/faq`);
        console.log(data);
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFAQs();
  }, []);

  const handleMouseOver = (e) => {
    e.target.style.background = "#7b2ff7";
  };

  const handleMouseOut = (e) => {
    e.target.style.background = "#4facfe";
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h3>❓Support Center</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {faqs.length === 0 && <p>Loading FAQs...</p>}
        {faqs.map((faq) => (
          <button
            key={faq._id}
            onClick={() => setSelectedFAQ(faq)}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={buttonStyle}
          >
            {faq.question}
          </button>
        ))}
      </div>

      {/* Answer Box */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          borderRadius: "10px",
          background: "#f1f1f1",
          textAlign: "left",
        }}
      >
        <strong>
          {selectedFAQ ? selectedFAQ.question : "How can we help you?"}
        </strong>
        <p>
          {selectedFAQ
            ? selectedFAQ.answer
            : "Type your question or click any FAQ above to see the answer."}
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#ff4b2b",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Home
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  background: "#4facfe",
  color: "white",
  fontWeight: "600",
  border: "none",
  transition: "0.3s",
};

export default FAQBot;
