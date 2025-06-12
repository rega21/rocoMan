import React from "react";
const SongPlayer = ({ songUrl }) => (
  <div className="song-player">
    {" "}
    <audio controls src={songUrl}>
      {" "}
      Tu navegador no soporta el elemento de audio.{" "}
    </audio>{" "}
  </div>
);
export default SongPlayer;
