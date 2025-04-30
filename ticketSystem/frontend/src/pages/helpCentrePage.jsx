import React, { useState } from 'react';
import "../styles/helpCenter.css"

const HelpCentre = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How to purchase tickets?",
      answer: "To purchase tickets, visit the event page and select your desired ticket type. Then, proceed to the checkout where you'll enter your payment details and complete the transaction.",
      subQuestions: [
        "What payment methods are available?",
        "Can I cancel my order?",
        "What to do if payment fails?"
      ]
    },
    {
      id: 2,
      question: "What is the refund policy?",
      answer: "Refunds are available if the event is canceled by the organizer. Requests must be made within 14 days of the event cancellation.",
      subQuestions: [
        "Can I get a refund if the event is canceled?",
        "What is the time limit for refund requests?"
      ]
    },
    {
      id: 3,
      question: "How to view my purchased tickets?",
      answer: "You can view your purchased tickets by logging into your account and visiting the 'My Tickets' section. All your active and past tickets will be listed there.",
      subQuestions: [
        "How to check my ticket order?",
        "How to resend my e-ticket?"
      ]
    },
    {
      id: 4,
      question: "How to modify my order information?",
      answer: "To modify your order information, please contact customer support within 24 hours of your purchase. Event details such as the date or venue cannot be modified once the order is finalized.",
      subQuestions: [
        "Can I change the event date?",
        "How to update my personal information?"
      ]
    }
  ];

  const handleToggle = (id) => {
    setSelectedQuestion(selectedQuestion === id ? null : id);
  };

  return (
    <div className="container">
      <h3>Help Center & FAQ</h3>
      <p>Here are some common questions about ticketing. If you can't find feasible ways to solve your problem, 
        please go back to homepage to send a message for help.</p>

      <div className="faq-container">
        {faqData.map((item) => (
          <div key={item.id} className="card">
            <div className="card-header" onClick={() => handleToggle(item.id)}>
              <h4>{item.question}</h4>
            </div>
            {selectedQuestion === item.id && (
              <div className="sub-question-list">
                <p><strong>Answer:</strong> {item.answer}</p>
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

export default HelpCentre;
