import React, { useState } from 'react';
import "../styles/helpCenter.css"

const HelpCenter = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Example FAQ data
  const faqData = [
    {
      id: 1,
      question: "How to purchase tickets?",
      subQuestions: [
        "What payment methods are available?",
        "Can I cancel my order?",
        "What to do if payment fails?"
      ]
    },
    {
      id: 2,
      question: "What is the refund policy?",
      subQuestions: [
        "Can I get a refund if the event is canceled?",
        "What is the time limit for refund requests?"
      ]
    },
    {
      id: 3,
      question: "How to view my purchased tickets?",
      subQuestions: [
        "How to check my ticket order?",
        "How to resend my e-ticket?"
      ]
    },
    {
      id: 4,
      question: "How to modify my order information?",
      subQuestions: [
        "Can I change the event date?",
        "How to update my personal information?"
      ]
    }
  ];

  // Toggle expand/collapse for questions
  const handleToggle = (id) => {
    setSelectedQuestion(selectedQuestion === id ? null : id);
  };

  return (
    <div className="container">
      <h3>Help Center & FAQ</h3>
      <p>Here are some common questions about our ticketing system:</p>

      <div className="faq-container">
        {faqData.map((item) => (
          <div key={item.id} className="card">
            <div className="card-header" onClick={() => handleToggle(item.id)}>
              <h4>{item.question}</h4>
            </div>
            {selectedQuestion === item.id && (
              <div className="sub-question-list">
                {item.subQuestions.map((subQuestion, index) => (
                  <div key={index} className="sub-question">
                    <p>{subQuestion}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
