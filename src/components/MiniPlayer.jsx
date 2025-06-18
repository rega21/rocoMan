import React from "react";
import "./MiniPlayer.css";

const MiniPlayer = ({ song, audioRef, forceUpdate, onClose }) => {
  if (!song) return null;

  return (
    <div className="mini-player">
      <button
        className="mini-close-btn"
        onClick={onClose}
        title="Cerrar"
      >
        ❌
      </button>
      <div className="mini-info">
        <span className="mini-title">{song.name}</span>
        <span className="mini-artist"> — {song.artist_name}</span>
      </div>
      <audio
        ref={audioRef}
        controls
        autoPlay
        src={song.audio}
        style={{ width: "100%", marginTop: 8 }}
        onPlay={() => forceUpdate(n => n + 1)}
        onPause={() => forceUpdate(n => n + 1)}
      >
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
};

export default MiniPlayer;