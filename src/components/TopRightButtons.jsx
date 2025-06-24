import "./TopRightButtons.css";

export default function TopRightButtons({ onInfoClick, onFullscreenClick }) {
  return (
    <div className="top-right-buttons">
      <button onClick={onInfoClick}>𝒊</button>
      <button onClick={onFullscreenClick}>⛶</button>
    </div>
  );
}
