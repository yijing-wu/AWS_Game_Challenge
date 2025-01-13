import { Html } from "@react-three/drei";

export default function InputOverlay({ isFloating, text, setText, handleSubmit }) {
  if (!isFloating) return null;

  const templateParagraph = `Dear ___[receiver]___,

I hope this letter finds you well. As your ___[relationship]___, I wanted to take a moment to wish you a wonderful ___[holiday]___. 

___[additional_info]___

With ___[tone]___ regards,
___[sender]___`;

  const handleInputChange = (value, fieldName) => {
    const newText = { ...text };
    newText[fieldName] = value;
    setText(newText);
  };

  return (
    <Html>
      <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: `translate(-50%, -50%) ${isFloating ? 'scale(1)' : 'scale(0)'}`,
        opacity: isFloating ? 1 : 0,
        transition: 'all 0.3s ease-in-out',
        width: "500px",
        height: "auto",
        borderRadius: "2px 5px 3px 4px",
        padding: "40px",
        zIndex: 1000,
        fontFamily: "'Pacifico', cursive",
        fontSize: "16px",
        lineHeight: "1.9",
        backgroundColor: "#f5e6d3",
        backgroundImage: `
          radial-gradient(circle at center, #f5e6d3 0%, #c29c86 100%)
        `,
        boxShadow: `
          inset 0 0 50px rgba(139, 115, 85, 0.1),
          inset 0 0 20px rgba(139, 115, 85, 0.1),
          0 10px 20px rgba(0,0,0,0.1)
        `,
        // Add slight rotation for a more natural look
        transform: `translate(-50%, -50%) rotate(-2deg) ${isFloating ? 'scale(1)' : 'scale(0)'}`,
        overflow: "hidden",
      }}>

        {/* Background cover triangle - this will hide the background */}
  <div style={{
    position: "absolute",
    top: "-2px",
    right: "-2px",
    width: "70px",
    height: "70px",
    background: "#000000", // Same as your main background color
    clipPath: "polygon(0 0, 100% 0, 100% 100%)",
    zIndex: 5,
  }} />
      
      {/* Folded corner effect */}
      <div style={{
        position: "absolute",
        top: "-2px", // Adjust to -1px to cover the border
        right: "-2px", // Adjust to -1px to cover the border
        width: "20px",
        height: "20px",
        borderStyle: "solid",
        borderWidth: "0 50px 50px 0",
        borderColor: "transparent #d4c5b3 transparent transparent",
        boxShadow: "-2px 2px 5px rgba(0,0,0,0.2)",
        zIndex: 2,
      }} />

      {/* Add a subtle noise texture overlay */}
        <div style={{
          position: "absolute",
          top: 0,left: 0,right: 0,bottom: 0,
          opacity: 0.2,
          backgroundImage: `
            linear-gradient(90deg, #8b7355 1px, transparent 1px),
            linear-gradient(0deg, #8b7355 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute",
          top: 0,left: 0,right: 0,bottom: 0,
          opacity: 0.3,
          backgroundImage: `
            linear-gradient(45deg, #8b7355 25%, transparent 25%),
            linear-gradient(-45deg, #8b7355 25%, transparent 25%)
          `,
          backgroundSize: "4px 4px",
          pointerEvents: "none",
        }} />


        <div style={{
          position: "absolute",
          top: 0,left: 0,right: 0,bottom: 0,
          opacity: 0.5,
          backgroundImage: `
            radial-gradient(#8b7355 1px, transparent 1px),
            radial-gradient(#d4c5b3 0.5px, transparent 0.5px),
            radial-gradient(#8b7355 0.7px, transparent 0.7px)
          `,
          backgroundSize: "16px 16px, 12px 12px, 8px 8px",
          backgroundPosition: "0 0, 6px 6px, 4px 4px",
          pointerEvents: "none",
        }} />

      <div style={{ 
        whiteSpace: "pre-wrap",
        position: "relative",
        zIndex: 1,
      }}>

    {/* Add a seal decoration */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: "20px",
        width: "100px",
        height: "100px",
        border: "2px solid #d6c3b3",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8b7355",
        fontSize: "20px",
        transform: "rotate(-15deg)",
        backgroundColor: "rgba(255,255,255,0.2)",
      }}>
        SEAL
      </div>


          {templateParagraph.split(/___\[(.*?)\]___/).map((part, index) => {
            if (index % 2 === 0) {
              // Regular text
              return <span key={index}>{part}</span>;
            } else {
              // Special handling for additional info
              if (part === 'additional_info') {
                return (
                  <textarea
                    key={index}
                    placeholder={"Add any supplementary information here!"}
                    value={text[part] || ''}
                    onChange={(e) => handleInputChange(e.target.value, part)}
                    style={{
                      width: "95%",
                      height: "100px",
                      padding: "12px",
                      margin: "0 0",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      fontFamily: "'Pacifico', cursive",
                      fontSize: "16px",
                      resize: "vertical",
                      transition: "all 0.3s ease",
                      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                      lineHeight: "1.9",
                      outline: "none", // Remove default outline
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#c29c86";
                      e.target.style.boxShadow = "0 0 0 4px rgba(139, 115, 85, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#ddd";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                );
              }
              // Regular input fields for other parts
              return (
                <input
                  key={index}
                  type="text"
                  placeholder={part}
                  value={text[part] || ''}
                  onChange={(e) => handleInputChange(e.target.value, part)}
                  style={{
                    width: "120px",
                    padding: "2px 5px",
                    margin: "5px 5px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    fontFamily: "'Pacifico', cursive",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    outline: "none", // Remove default outline
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#c29c86";
                    e.target.style.boxShadow = "0 0 0 4px rgba(139, 115, 85, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.boxShadow = "none";
                  }}
                />
              );
            }
          })}
        </div>
        <button
          style={{
            marginTop: "25px",
            padding: "10px 20px",
            backgroundColor: "#c29c86", // Warmer brown that matches the paper theme
            color: "#f5e6d3", // Light color for contrast
            border: "2px solid #8b7355",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "'Pacifico', cursive", // Match the letter's font
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(139, 115, 85, 0.2)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            // Hover effect
            "&:hover": {
              backgroundColor: "#8b7355",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(139, 115, 85, 0.3)",
            },
            // Active effect
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 2px 4px rgba(139, 115, 85, 0.2)",
            }
          }}
          onClick={handleSubmit}
        >
        {/* Quill icon */}
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M20 2C20 2 22 4 22 6C22 8 20 10 20 10L4 26L2 22L18 6C18 6 20 4 20 2Z"/>
          <path d="M18 6L14 10"/>
        </svg>
        Refine Letter
      </button>

      </div>
    </Html>
  );
}