import React, { useState } from "react";
import { submitChoice } from "../services/api";

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
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f5e6d3", // Warm background color
        padding: "30px",
        borderRadius: "15px",
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        boxShadow: "0 4px 15px rgba(139, 115, 85, 0.2)",
        border: "1px solid #c29c86",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          height: "80px",
          width: "80px",
        }}
      >
        {/* Quill pen animation */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            width: "60px",
            height: "60px",
            animation: "writing 2s ease-in-out infinite",
            zIndex: 2, // Higher z-index to stay on top
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8b7355"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 2C20 2 22 4 22 6C22 8 20 10 20 10L4 26L2 22L18 6C18 6 20 4 20 2Z" />
            <path d="M18 6L14 10" />
          </svg>
        </div>

        {/* Paper sheets with warm colors */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "50px",
              height: "65px",
              backgroundColor: "white",
              border: "2px solid #c29c86",
              borderRadius: "5px",
              animation: `paper-shuffle 2s ease-in-out infinite ${
                index * 0.15
              }s`,
              transformOrigin: "bottom right",
              background: `linear-gradient(45deg, #f5e6d3, #fff)`,
              boxShadow: "0 2px 4px rgba(139, 115, 85, 0.1)",
            }}
          >
            {/* Decorative lines on papers */}
            {[...Array(3)].map((_, lineIndex) => (
              <div
                key={lineIndex}
                style={{
                  position: "absolute",
                  left: "5px",
                  top: `${lineIndex * 15 + 10}px`,
                  width: "30px",
                  height: "2px",
                  backgroundColor: "rgba(139, 115, 85, 0.2)",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Warm-colored text */}
      <div
        style={{
          marginTop: "15px",
          fontSize: "16px",
          color: "#8b7355",
          fontWeight: "500",
          fontFamily: "'Pacifico', cursive",
          textAlign: "center",
        }}
      >
        Refining your letter with care...
      </div>

      <style>
        {`
          @keyframes writing {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            25% { transform: translate(-50%, -50%) rotate(-15deg) translateX(-5px); }
            75% { transform: translate(-50%, -50%) rotate(15deg) translateX(5px); }
            100% { transform: translate(-50%, -50%) rotate(0deg); }
          }

          @keyframes paper-shuffle {
            0% { transform: rotate(0deg) translateX(0); opacity: 1; }
            25% { transform: rotate(-8deg) translateX(-3px); }
            75% { transform: rotate(8deg) translateX(3px); }
            100% { transform: rotate(0deg) translateX(0); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

const EmailSendingSpinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f5e6d3", // Warm background color
        padding: "30px",
        borderRadius: "15px",
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        boxShadow: "0 4px 15px rgba(139, 115, 85, 0.2)",
        border: "1px solid #c29c86",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "80px",
          height: "60px",
          perspective: "1000px",
        }}
      >
        {/* Sealed Letter Animation */}
        <div
          style={{
            position: "absolute",
            width: "60px",
            height: "40px",
            backgroundColor: "#fff",
            border: "2px solid #8b7355",
            borderRadius: "3px",
            transformStyle: "preserve-3d",
            animation: "float 2s ease-in-out infinite",
            boxShadow: "0 4px 8px rgba(139, 115, 85, 0.2)",
          }}
        >
          {/* Wax Seal */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              backgroundColor: "#c23f3f", // Red wax color
              borderRadius: "50%",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {/* Seal Design */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
              }}
            />
          </div>

          {/* Decorative Lines */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: "8px",
                top: `${index * 10 + 8}px`,
                width: "30px",
                height: "2px",
                backgroundColor: "rgba(139, 115, 85, 0.2)",
                borderRadius: "1px",
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              backgroundColor: "#c29c86",
              borderRadius: "50%",
              opacity: 0.6,
              animation: `particle ${1 + index * 0.2}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Message Text */}
      <div
        style={{
          marginTop: "15px",
          fontSize: "16px",
          color: "#8b7355",
          fontWeight: "500",
          fontFamily: "'Pacifico', cursive",
          textAlign: "center",
        }}
      >
        Sending your letter...
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(2deg); }
            75% { transform: translateY(5px) rotate(-2deg); }
          }

          @keyframes particle {
            0% { 
              transform: translate(0, 0);
              opacity: 0;
            }
            50% { 
              transform: translate(${Math.random() * 40 - 20}px, ${
          Math.random() * 40 - 20
        }px);
              opacity: 0.6;
            }
            100% { 
              transform: translate(${Math.random() * 60 - 30}px, ${
          Math.random() * 60 - 30
        }px);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

const EmailInput = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    onSubmit(email);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f5e6d3",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(139, 115, 85, 0.2)",
        border: "1px solid #c29c86",
        zIndex: 1002,
        width: "90%",
        maxWidth: "400px",
      }}
    >

      {/* Envelope Icon */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8b7355"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </div>

      <h3
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#8b7355",
          fontSize: "20px",
          fontFamily: "'Pacifico', cursive",
        }}
      >
        Where shall we send your letter?
      </h3>

      <div
        style={{
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="Enter your email address"
          style={{
            width: "92%",
            padding: "12px 15px",
            borderRadius: "8px",
            border: "2px solid #e8d5c0",
            fontSize: "16px",
            backgroundColor: "white",
            color: "#5a4a3f",
            outline: "none",
            transition: "all 0.3s ease",
            "&:focus": {
              borderColor: "#c29c86",
              boxShadow: "0 0 0 3px rgba(194, 156, 134, 0.2)",
            },
          }}
        />

        {error && (
          <div
            style={{
              color: "#c23f3f",
              fontSize: "14px",
              marginTop: "8px",
              textAlign: "left",
              paddingLeft: "5px",
            }}
          >
            {error}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={onCancel}
          style={{
            padding: "12px 24px",
            backgroundColor: "white",
            color: "#8b7355",
            border: "2px solid #c29c86",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "'Pacifico', cursive",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f9f1e7",
              transform: "translateY(-2px)",
            },
          }}
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 24px",
            backgroundColor: "#c29c86",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "'Pacifico', cursive",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#8b7355",
              transform: "translateY(-2px)",
            },
          }}
        >
          Send My Letter
        </button>
      </div>

      {/* Optional: Decorative bottom flourish */}
      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
          color: "#8b7355",
          opacity: 0.5,
          fontSize: "20px",
        }}
      >
        ✦ ❦ ✦
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
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = (index) => {
    console.log("handle Select selectedIndex", selectedIndex);
    setSelectedIndex(index);
    setShowOnlySelected(false); // Reset when selecting a new version
  };

  const handleProceedToEmail = () => {
    console.log("proceed to email selectedIndex", selectedIndex);
    if (selectedIndex === null) return;
    setShowOnlySelected(true); // Show only selected version
    setShowEmailInput(true);
  };

  const handleSubmitChoice = async (email) => {
    if (selectedIndex === null) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const body = {
        to_email: email,
        html_body: htmlContents[selectedIndex],
      };

      await submitChoice(body);
      // Reset all local states
      setSelectedIndex(null);
      setShowEmailInput(false);
      setIsSubmitting(false);
      if (typeof onChoiceSubmitted === "function") {
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
    <div
      className="response-display-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(139, 115, 85, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      {!showEmailInput && (
        <div
          className="response-display-container"
          style={{
            backgroundColor: "#f5e6d3",
            padding: "40px",
            borderRadius: "15px",
            width: showOnlySelected ? "30%" : "95%",
            maxWidth: showOnlySelected ? "800px" : "1400px",
            maxHeight: "85vh",
            position: "relative",
            boxShadow: "0 4px 20px rgba(139, 115, 85, 0.2)",
            border: "1px solid #c29c86",
          }}
        >
          {/* Content Container */}
          {!showEmailInput && (
            <div
              style={{
                display: "flex",
                gap: "30px",
                maxHeight: "calc(85vh - 200px)",
                marginBottom: "20px",
                position: "relative",
                zIndex: 2,
                justifyContent: "space-between",
              }}
            >
              {htmlContents.some((content) => content.includes("<html>"))
                ? htmlContents.map((content, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(index)}
                      style={{
                        flex: 1,
                        padding: "30px",
                        backgroundColor: "#fff",
                        border: `2px solid ${
                          selectedIndex === index ? "#c29c86" : "#e8d5c0"
                        }`,
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow:
                          selectedIndex === index
                            ? "0 4px 12px rgba(139, 115, 85, 0.2)"
                            : "0 2px 6px rgba(139, 115, 85, 0.1)",
                        transform:
                          selectedIndex === index ? "translateY(-2px)" : "none",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          overflowY: "auto",
                          marginBottom: "20px",
                          paddingRight: "10px",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: content }}
                          style={{
                            lineHeight: "1.6",
                            color: "#5a4a3f",
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      {selectedIndex === index && (
                        <div
                          style={{
                            marginTop: "auto",
                            textAlign: "center",
                            padding: "15px 0 0",
                            borderTop: "1px solid #e8d5c0",
                          }}
                        >
                          <button
                            onClick={handleProceedToEmail}
                            style={{
                              padding: "12px 24px",
                              backgroundColor: "#c29c86",
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontSize: "16px",
                              fontFamily: "'Pacifico', cursive",
                              transition: "all 0.3s ease",
                              width: "100%",
                              maxWidth: "200px",
                            }}
                          >
                            Choose This Version
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                : retryMessageContainer({
                    content: htmlContents[0],
                    clearHtmlContents: clearHtmlContents,
                  })}
            </div>
          )}
        </div>
      )}

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
