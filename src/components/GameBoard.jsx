import "./GameBoard.css";
import Hole from "./Hole";

export default function GameBoard({
  numHoles,
  activeIndex,
  isBomb,
  hammerIndex,
  onHoleClick,
}) {
  return (
    <div className="grid">
      {Array.from({ length: numHoles }).map((_, index) => (
        <Hole
          key={index}
          index={index}
          isActive={index === activeIndex}
          isBomb={isBomb}
          showHammer={index === hammerIndex}
          onClick={() => onHoleClick(index)}
        />
      ))}
    </div>
  );
}
