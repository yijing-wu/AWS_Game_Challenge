import React, { useState } from 'react';
import { submitChoice } from '../services/api';

const HtmlContainer = ({ content, index, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(index)}
      style={{
        flex: 1,
        minWidth: '300px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: isSelected 
          ? '0 0 15px rgba(52, 152, 219, 0.5)' 
          : '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: isSelected ? '#f0f9ff' : '#ffffff',
        margin: '10px',
        cursor: 'pointer',
        border: isSelected ? '2px solid #3498db' : '1px solid #ccc',
        transition: 'all 0.3s ease'
      }}
    >
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          maxWidth: '100%',
          overflow: 'auto'
        }}
      />
    </div>
  );
};

const retryMessageContainer = ({ content, clearHtmlContents }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          margin: "10px",
          cursor: "pointer",
          border: "1px solid #ccc",
          transition: "all 0.3s ease",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            maxWidth: "100%",
            overflow: "auto",
          }}
        />
      </div>
      <button
        onClick={clearHtmlContents}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          margin: "20px auto",
          transition: "all 0.3s ease",
        }}
      >
        Sounds good, let's try again
      </button>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      borderRadius: '15px',
      zIndex: 1001,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        position: 'relative',
        height: '60px',
        width: '60px'
      }}>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '40px',
              height: '60px',
              backgroundColor: 'white',
              border: '2px solid #3498db',
              borderRadius: '5px',
              animation: `card-shuffle 2s ease-in-out infinite ${index * 0.15}s`,
              transformOrigin: 'bottom right'
            }}
          />
        ))}
      </div>
      <div style={{ 
        marginTop: '15px', 
        fontSize: '16px',
        color: '#2c3e50',
        fontWeight: '500'
      }}>
        Creating your special messages...
      </div>
      <style>
        {`
          @keyframes card-shuffle {
            0% { transform: rotate(0deg) translateX(0); }
            25% { transform: rotate(-15deg) translateX(-5px); }
            75% { transform: rotate(15deg) translateX(5px); }
            100% { transform: rotate(0deg) translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

const EmailSendingSpinner = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      borderRadius: '15px',
      zIndex: 1001,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        position: 'relative',
        width: '80px',
        height: '60px'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '60px',
          height: '40px',
          backgroundColor: 'white',
          border: '2px solid #3498db',
          borderRadius: '5px',
          animation: 'send-email 2s ease-in-out infinite'
        }}>
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '10px solid #3498db'
          }} />
        </div>
      </div>
      <div style={{ 
        marginTop: '15px', 
        fontSize: '16px',
        color: '#2c3e50',
        fontWeight: '500'
      }}>
        Sending your card...
      </div>
      <style>
        {`
          @keyframes send-email {
            0% { transform: translateX(0) translateY(0); opacity: 1; }
            50% { transform: translateX(20px) translateY(-20px); opacity: 0.5; }
            100% { transform: translateX(40px) translateY(0); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

const EmailInput = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    onSubmit(email);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0,0,0,0.2)',
      zIndex: 1002,
      width: '90%',
      maxWidth: '400px'
    }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Enter your email to receive the card
      </h3>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        placeholder="Enter your email address"
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />
      {error && (
        <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
          {error}
        </div>
      )}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginTop: '20px'
      }}>
        <button
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#3498db',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const ResponseDisplay = ({
  htmlContents,
  isLoading,
  onChoiceSubmitted,
  clearHtmlContents,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleProceedToEmail = () => {
    if (selectedIndex === null) return;
    setShowEmailInput(true);
  };

  const handleSubmitChoice = async (email) => {
    if (selectedIndex === null) return;
    
    setIsSubmitting(true);
    setError(null);
    try {
      const body = {
        to_email: email,
        html_body: htmlContents[selectedIndex]
      };
      
      await submitChoice(body);
      // Reset all local states
      setSelectedIndex(null);
      setShowEmailInput(false);
      setIsSubmitting(false);
      if (typeof onChoiceSubmitted === 'function') {
        onChoiceSubmitted();
      }
    } catch (error) {
      console.error("Error submitting choice:", error);
      setError("Failed to send email. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isSubmitting) {
    return <EmailSendingSpinner />;
  }

  if (htmlContents.length === 0) {
    return null;
  }

  return (
    <div className="response-display-overlay" style={{
      position: 'fixed', // Changed from absolute to fixed for better overlay behavior
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Added overlay background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    }}>
      <div className="response-display-container" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        padding: '30px',
        borderRadius: '20px',
        maxHeight: '90vh',
        width: '90%',
        maxWidth: '1200px', // Added maxWidth for better readability on large screens
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)', // Added shadow for depth
        position: 'relative', // For positioning close button if needed
      }}>
        <div className="response-content" style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}>
          {htmlContents.some((content) => content.includes("<html>")) ? (
            <>
              <div className="header" style={{
                textAlign: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid #eee',
                paddingBottom: '20px',
              }}>
                <h2 style={{ 
                  color: '#2c3e50',
                  marginBottom: '10px',
                }}>Choose your favorite version</h2>
                <p style={{ 
                  color: '#666',
                  fontSize: '16px',
                }}>
                  Click on a card to select it, then click "Choose This One" to confirm
                </p>
              </div>
  
              <div className="cards-container" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                justifyContent: "center",
                padding: '10px',
              }}>
                {htmlContents.map((content, index) => (
                  <HtmlContainer
                    key={index}
                    content={content}
                    index={index}
                    isSelected={selectedIndex === index}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
  
              <div className="action-buttons" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                marginTop: '20px',
              }}>
                <button
                  onClick={handleProceedToEmail}
                  disabled={selectedIndex === null}
                  style={{
                    padding: "14px 28px",
                    fontSize: "16px",
                    backgroundColor: selectedIndex !== null ? "#3498db" : "#cccccc",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: selectedIndex !== null ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease",
                    fontWeight: '500',
                    minWidth: '200px',
                  }}
                  onMouseOver={(e) => {
                    if (selectedIndex !== null) {
                      e.target.style.backgroundColor = '#2980b9'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedIndex !== null) {
                      e.target.style.backgroundColor = '#3498db'
                    }
                  }}
                >
                  Choose This One
                </button>
              </div>
            </>
          ) : (
            retryMessageContainer({
              content: htmlContents[0],
              clearHtmlContents,
            })
          )}
        </div>
      </div>
  
      {showEmailInput && (
        <EmailInput 
          onSubmit={handleSubmitChoice}
          onCancel={() => setShowEmailInput(false)}
        />
      )}
    </div>
  );
};

export default ResponseDisplay;
