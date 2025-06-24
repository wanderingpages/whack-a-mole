import { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Controls from "./components/Controls";
import InfoModal from "./components/InfoModal";
import TopRightButtons from "./components/TopRightButtons";
import NameModal from "./components/NameModal";
import HighScores from "./components/HighScores";

const NUM_HOLES = 9;
const GAME_TIME = 40;

export default function App() {
  const [score, setScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isBomb, setIsBomb] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameRunning, setGameRunning] = useState(false);
  const [hammerIndex, setHammerIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [highScores, setHighScores] = useState(() => {
    const stored = localStorage.getItem("highScores");
    return stored ? JSON.parse(stored) : [];
  });
  const [gameId, setGameId] = useState(0);

  // Managing the timer and mole/bomb intervals
  useEffect(() => {
    let timer;
    let moleInterval;

    // Countdown timer: decreasing timeLeft
    if (gameRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            clearInterval(moleInterval);
            setGameRunning(false);
            setActiveIndex(null);

            // Saving top 10 score to high score
            if (playerName) {
              const updated = [...highScores, { name: playerName, score }]
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);
              setHighScores(updated);
              localStorage.setItem("highScores", JSON.stringify(updated));
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Random mole or bomb appears
      moleInterval = setInterval(() => {
        const index = Math.floor(Math.random() * NUM_HOLES);
        const bombChance = Math.random() < 0.2;
        setActiveIndex(index);
        setIsBomb(bombChance);
      }, 800);
    }

    // Interval cleanup
    return () => {
      clearInterval(timer);
      clearInterval(moleInterval);
    };
  }, [gameRunning, gameId, highScores, playerName, score]);

  // Reset score and time after game ends
  useEffect(() => {
    if (!gameRunning && timeLeft === 0) {
      const timer = setTimeout(() => {
        setScore(0);
        setTimeLeft(GAME_TIME);
      });

      return () => clearTimeout(timer);
    }
  }, [gameRunning, timeLeft]);

  // Handle user clicking a hole
  const handleClick = (index) => {
    if (gameRunning) {
      setHammerIndex(index);
      setTimeout(() => setHammerIndex(null), 300);

      // If clicked the active mole/bomb
      if (index === activeIndex) {
        // Increase or decrease score depending on bomb
        setScore((prev) => (isBomb ? Math.max(prev - 1, 0) : prev + 1));
        setActiveIndex(null);
      }
    }
  };

  // Name modal appears when clicked on start
  const startGame = () => {
    setShowNameModal(true);
  };

  //Name gets submitted and the game starts
  const handleNameSubmit = (name) => {
    setPlayerName(name);
    setShowNameModal(false);
    setScore(0);
    setTimeLeft(GAME_TIME);
    setGameId((prev) => prev + 1);
    setGameRunning(true);
  };

  // Reset the game without saving score
  const resetGame = () => {
    setGameRunning(false);
    setActiveIndex(null);
    setHammerIndex(null);
    setTimeLeft(GAME_TIME);
    setScore(0);
  };

  // Shows the info modal
  const showInfo = () => {
    setShowModal(true);
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  //HTML for the displayed game and highscore grid
  return (
    <div className="App">
      {/* ✅ Moved outside of .app-content */}
      <TopRightButtons
        onInfoClick={showInfo}
        onFullscreenClick={toggleFullScreen}
      />

      <div className="app-content">
        <div className="game-wrapper">
          <h1>Whack a Mole 🔨</h1>

          <div className="game-and-scores">
            <div className="game">
              <GameBoard
                numHoles={NUM_HOLES}
                activeIndex={activeIndex}
                isBomb={isBomb}
                hammerIndex={hammerIndex}
                onHoleClick={handleClick}
              />
              <Controls
                score={score}
                timeLeft={timeLeft}
                gameRunning={gameRunning}
                onStart={startGame}
                onReset={resetGame}
              />
            </div>

            <HighScores scores={highScores} />
          </div>
        </div>
      </div>

      {showModal && <InfoModal onClose={() => setShowModal(false)} />}
      {showNameModal && <NameModal onSubmit={handleNameSubmit} />}
    </div>
  );
}
