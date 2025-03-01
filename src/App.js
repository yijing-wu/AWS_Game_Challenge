import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DeskScene from "./components/scene/DeskScene";
import NoteGame from "./NoteGame";
import FilterSwitcher from "./FilterSwitcher";
import { playBgm, playSequence, downloadSequence, stopBgm ,clearSavedNotes} from "./music";
import InputOverlay from "./components/Interface/InputOverlay";
import Paper from "./components/models/Paper";
import ResponseDisplay from "./components/Interface/ResponseDisplay";
import { generateContent } from "./components/services/api";
import ReactGA from 'react-ga4';

function App() {
  const [gameState, setGameState] = useState("idle"); // "idle", "notegame", "selectFilter", "sendEmail"
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [hitCount, setHitCount] = useState(0);
  const [lastNote, setLastNote] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [htmlContents, setHtmlContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    receiver: "",
    relationship: "",
    holiday: "",
    additional_info: "",
    tone: "",
    sender: "",
    music_link: ""
  });

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  const startGame = () => {
    setGameState("startgame"); 
    playBgm();
    setIsLoadingScreen(true); 
    setTimeout(() => {
      setIsLoadingScreen(false); // Hide loading screen after delay
      setGameState("startgame");
    }, 3000);
    ReactGA.event({category: 'GameState', action: 'StartGame'});
  };

  const handleComputerClick = () => {
    if (gameState === "startgame"){
      setGameState("notegame");
      setHitCount(0);
      setLastNote("");
      stopBgm();
      ReactGA.event({category: 'GameState', action: 'NoteGame'});
    }
  }
  useEffect(() => {
    if (gameState === "notegame" && hitCount >= 10) {
      setTimeout(() => {
        setGameState("playSequence");
        ReactGA.event({category: 'GameState', action: 'PlaySequence'});
      }, 1000);
    }
  }, [hitCount, gameState]);

// Second useEffect - handles the actual sequence playback
  useEffect(() => {
    if (gameState === "playSequence") {
      playSequence();
      setIsPlaying(true);
    }
  }, [gameState]);

  const handleBooksClick = () => {
    if (gameState === "playSequence") {
      setGameState("selectFilter");
      ReactGA.event({category: 'GameState', action: 'SelectFilter'});
    }
  };

  const handleFilterConfirmed = () => {
    // Download the music file
    handleDownload();
    setGameState("sendEmail");
    ReactGA.event({category: 'GameState', action: 'SendEmail'});
  };

  const handlePaperClick = () => {
    if (gameState === "sendEmail") {
      setGameState("inputOverlay");
      setIsFloating(true);
      ReactGA.event({category: 'GameState', action: 'InputOverlay'});
    }
  };


  const handleSubmit = async () => {
    setIsLoading(true);
    setIsFloating(false); // Hide the InputOverlay immediately when submitting
    try {
      const data = await generateContent(formData);
      setHtmlContents(data);
    } catch (error) {
      console.error("Error:", error);
      setIsFloating(true); // Show the form again if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoiceSubmitted = () => {
    setHtmlContents([]); // Clear the responses
    setIsLoading(false); // Reset loading state
    setIsFloating(false); // Hide the input overlay
    // Optionally show a success message
    // alert("Your card has been sent successfully!"); // You can replace this with a more elegant notification
    setGameState("gameover");
    ReactGA.event({category: 'GameState', action: 'GameOver'});
  };

  const generateRandomFileName = () => {
    // Generate a unique file name using timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let fileName = '';
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        fileName += letters.charAt(Math.floor(Math.random() * letters.length));
      } else {
        fileName += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
    }
    
    const uniqueFileName = `${fileName}-${timestamp}`;
    return uniqueFileName;
  };

  const handleDownload = async () => {
      try {
          const fileName = generateRandomFileName();
          await downloadSequence(fileName);
          const musicUrl = `https://aws-game-music-bucket.s3.us-east-1.amazonaws.com/${fileName}.wav`;
          setFormData({ ...formData, music_link: musicUrl});
      } catch (error) {
          console.error('Download failed:', error);
      }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Start Game Screen */}
      {gameState === "idle" && !isLoadingScreen && (
  <div style={{
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    backgroundImage: "url('https://darksky.org/app/uploads/2020/03/hero-Night-Sky-Family-Activities.jpg')",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "'Pacifico', cursive",
    fontSize: "50px",
    flexDirection: "column",
    textAlign: "center",
    zIndex: gameState === "idle" ? 2 : 1, 
  }}>
    <div>Welcome to JingleCard!</div>
    <button 
      onClick={startGame} 
      style={{
        backgroundColor: "transparent",
        border: "2px solid white",
        borderRadius: "5px",
        padding: "10px 20px",
        marginTop: "20px",
        color: "white",
        fontFamily: "'Pacifico', cursive",
        fontSize: "20px",
        cursor: "pointer"
      }}>
      Start Game
    </button>
    <div 
      style={{
        fontSize: "16px",
        marginTop: "20px",
        animation: "bounce 1s infinite",
      }}
    >
      🔊 Please turn up your volume for the best experience!
    </div>
  </div>
)}
  
  {/* Loading Screen */}
  {isLoadingScreen && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            backgroundImage: "url('https://darksky.org/app/uploads/2020/03/hero-Night-Sky-Family-Activities.jpg')",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontFamily: "'Pacifico', cursive",
            fontSize: "50px",
            flexDirection: "column",
            textAlign: "center",
            zIndex: 3,
          }}
        >
          <div>Loading...</div>
          <div
            style={{
              marginTop: "20px",
              border: "5px solid white",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              borderTop: "5px solid transparent",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}


      {/* Game Content */}
      {gameState !== "idle" && (
        <div style={{ height: "100vh", position: "relative" }}>
          <Canvas shadows>
            <DeskScene
            gameState={gameState}
            onComputerClick={handleComputerClick}
            onBooksClick={handleBooksClick} 
            onPaperClick={handlePaperClick}
            />
            
            {gameState === "notegame" && (
              <NoteGame 
              hitCount={hitCount} 
              setHitCount={setHitCount}
              setLastNote={setLastNote}
              gameState={gameState} />
            )}
            <OrbitControls 
              enablePan={false} 
              enableZoom={false} 
              enableRotate={false} 
            />
            {gameState === "inputOverlay" && (
              <InputOverlay
                isFloating={isFloating}
                text={formData}
                setText={setFormData}
                handleSubmit={handleSubmit}
              />
            )}
          </Canvas>
  
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              fontSize: "20px",
              fontFamily: "'Pacifico', cursive",
              zIndex: 1, 
            }}
          >
            {gameState === "notegame" && (
              <>
                <div>You need to click {Math.max(0, 10-hitCount)} more 🎵 to create your own music</div>
                <div>The ball you received is {lastNote} note</div>
              </>
            )}
          </div>

          {gameState === "selectFilter" && (
              <FilterSwitcher onConfirm={handleFilterConfirmed} />
          )}
  
          <ResponseDisplay 
            htmlContents={htmlContents}
            isLoading={isLoading}
            onChoiceSubmitted={handleChoiceSubmitted}
            clearHtmlContents={() => {  
              // Show the form again if generation content does not include html
              setHtmlContents([]);
              setIsFloating(true);
            }}
          />
        </div>
      )}

{gameState === "gameover" && (
  <div style={{
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
    fontFamily: "'Pacifico', cursive",
    zIndex: 2
  }}>
    <div style={{
      fontSize: "50px",
      marginBottom: "20px"
    }}>
      Thanks for Playing!
    </div>
    <div style={{
      fontSize: "24px",
      marginBottom: "30px"
    }}>
      Your card has been sent successfully!
    </div>
    <div style={{
      fontSize: "20px",
      marginBottom: "30px"
    }}>
      As we step into new year, we hope everyone remembers to reconnect our old friends and cherish the bonds that have shaped our lives!
    </div>
  </div>
)}

    </div>
  );  
}

export default App;