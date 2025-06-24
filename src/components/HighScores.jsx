import "./HighScores.css";

export default function HighScores({ scores }) {
  // reset the high scores
  const handleReset = () => {
    localStorage.removeItem("highScores");
    window.location.reload();
  };

  return (
    <div className="highscores-box">
      <h2>🏆 High Scores</h2>
      <div className="score-header">
        <span>Name</span>
        <span>Score</span>
      </div>
      <ul className="score-list">
        {scores.length === 0 && <li className="empty">No scores yet</li>}
        {scores.map((entry, idx) => (
          <li key={idx}>
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
      <button className="reset-button" onClick={handleReset}>
        Reset Scores
      </button>
    </div>
  );
}
