import React from "react";
const SongList = ({ songs, onSelect }) => (
  <ul>
    {" "}
    {songs.map((song, index) => (
      <li key={index}>
        {" "}
        <button onClick={() => onSelect(song.url)}>
          {" "}
          {song.title} - {song.artist}{" "}
        </button>{" "}
      </li>
    ))}{" "}
  </ul>
);
export default SongList;
