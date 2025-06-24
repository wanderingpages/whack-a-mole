import { useState } from "react";
import "./NameModal.css"; // Reuse same styles

export default function NameModal({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Enter Your Name</h2>
        <input
          type="text"
          value={name}
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Start Game</button>
      </div>
    </div>
  );
}
