import React, { useRef, useEffect } from "react";
import "./MiniPlayer.css";

const MiniPlayer = ({ song, isPlaying, setIsPlaying, audioTime, setAudioTime }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  // Cuando cambia la canción, si es la misma, setea el tiempo
  useEffect(() => {
    if (audioRef.current && audioTime && !audioRef.current.seeking) {
      audioRef.current.currentTime = audioTime;
    }
    // eslint-disable-next-line
  }, [song]);

  // Actualiza el tiempo actual en el estado
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioTime(audioRef.current.currentTime);
    }
  };

  if (!song) return null;

  return (
    <div className="mini-player">
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
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
      >
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
};

export default MiniPlayer;