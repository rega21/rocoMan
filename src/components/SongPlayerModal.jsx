import React from "react";
import "./SongPlayerModal.css";

const SongPlayerModal = ({ song, onClose }) => {
  if (!song) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{song.name}</h2>
        <h3>{song.artist_name}</h3>
        <audio
          controls
          autoPlay
          src={song.audio}
          style={{ width: "100%", margin: "16px 0" }}
        >
          Tu navegador no soporta el elemento de audio.
        </audio>
        {/* Puedes agregar más info aquí, como portada o duración */}
      </div>
    </div>
  );
};

export default SongPlayerModal;