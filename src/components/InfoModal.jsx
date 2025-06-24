// components/InfoModal.jsx
import "./InfoModal.css";

export default function InfoModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>How to Play</h2>
        <p>
          Whack the moles to score points.
          <br />
          Avoid the bombs or you'll lose points.
          <br />
          You have 40 seconds. Good luck!
        </p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
