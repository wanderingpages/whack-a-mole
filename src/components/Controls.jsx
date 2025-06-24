import "./Controls.css";

// Functional component to display game controls
export default function Controls({
  score,
  timeLeft,
  gameRunning,
  onStart,
  onReset,
}) {
  return (
    <div className="controls">
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}s</p>
      {gameRunning ? (
        <button onClick={onReset}>Reset Game</button>
      ) : (
        <button onClick={onStart}>Start Game</button>
      )}
    </div>
  );
}
