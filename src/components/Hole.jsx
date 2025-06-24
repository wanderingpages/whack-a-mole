import "./Hole.css";

export default function Hole({ isActive, isBomb, showHammer, onClick }) {
  return (
    <div className="hole" onClick={onClick}>
      {isActive && (
        <img
          src={isBomb ? "bomb.png" : "mole.png"}
          alt={isBomb ? "Bomb" : "Mole"}
          className="character"
          draggable={false}
        />
      )}
      {showHammer && (
        <img
          src="hammer.png"
          alt="Hammer"
          className="hammer"
          draggable={false}
        />
      )}
    </div>
  );
}
