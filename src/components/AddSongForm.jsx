import React, { useState } from "react";

const AddSongForm = ({ onAdd }) => {
  const [title, setTitle] = useState("Yellow");
  const [artist, setArtist] = useState("Coldplay");
  const [url, setUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && artist && url) {
      onAdd({ title, artist, url });
      setTitle("");
      setArtist("");
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Artista"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="URL de la canción"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Agregar Canción</button>
    </form>
  );
};

export default AddSongForm;