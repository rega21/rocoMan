import React, { useState } from "react";
import SongPlayer from "./components/SongPlayer";
import SongList from "./components/SongList";
import AddSongForm from "./components/AddSongForm";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([
    {
      title: "Canción 1",
      artist: "Artista A",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "Canción 2",
      artist: "Artista B",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      title: "Canción 3",
      artist: "Artista C",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ]);
  const [currentSongUrl, setCurrentSongUrl] = useState(songs[0].url);

  const handleAddSong = (song) => {
    setSongs([...songs, song]);
  };

  return (
    <div>
      <h1>Mi Rocola</h1>
      <SongPlayer songUrl={currentSongUrl} />
      <h2>Agregar Canción</h2>
      <AddSongForm onAdd={handleAddSong} />
      <h2>Lista de Canciones</h2>
      <SongList songs={songs} onSelect={setCurrentSongUrl} />
    </div>
  );
}

export default App;

