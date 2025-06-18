import React, { useState, useEffect } from "react";
import "./App.css";
import SongPlayerModal from "./components/SongPlayerModal";
import MiniPlayer from "./components/MiniPlayer";

const categories = [
  { name: "Rock", color: "#e53935", icon: "🎸", jamendoTag: "rock" },
  { name: "Pop", color: "#8e24aa", icon: "🎤", jamendoTag: "pop" },
  { name: "Jazz/Blues", color: "#3949ab", icon: "🎷", jamendoTag: "jazz,blues" },
  { name: "Música Urbana", color: "#00897b", icon: "🎧", jamendoTag: "hiphop,rap,urban" },
  { name: "Global Ranking", color: "#fbc02d", icon: "🌎", jamendoTag: "charts" },
  { name: "News", color: "#757575", icon: "📰", jamendoTag: "news" },
  // Nuevos géneros:
  { name: "Electrónica", color: "#00bcd4", icon: "🎛️", jamendoTag: "electronic" },
  { name: "Reggae", color: "#43a047", icon: "🌴", jamendoTag: "reggae" },
  { name: "Clásica", color: "#ff7043", icon: "🎻", jamendoTag: "classical" },
  { name: "Metal", color: "#616161", icon: "🤘", jamendoTag: "metal" },
  { name: "Folk", color: "#a1887f", icon: "🪕", jamendoTag: "folk" },
  { name: "Country", color: "#ffd54f", icon: "🤠", jamendoTag: "country" },
  { name: "Latina", color: "#ffb300", icon: "💃", jamendoTag: "latin" },
  { name: "Soul/R&B", color: "#6d4c41", icon: "🎹", jamendoTag: "soul,rnb" },
  { name: "Soundtrack", color: "#8d6e63", icon: "🎬", jamendoTag: "soundtrack" },
  { name: "Dance", color: "#ff4081", icon: "🕺", jamendoTag: "dance" },
  // Puedes seguir agregando más...
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [modalSong, setModalSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [audioTime, setAudioTime] = useState(0);

  const clientId = process.env.REACT_APP_JAMENDO_CLIENT_ID;

  // Buscar canciones por género y texto usando Jamendo API
  const fetchSongs = async (genre, searchText = "", pageNum = 1) => {
    setSongs([]);
    setLoading(true);
    setError("");
    try {
      let url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=20&tags=${genre}&offset=${(pageNum - 1) * 20}`;
      if (searchText) {
        url += `&namesearch=${encodeURIComponent(searchText)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setSongs(data.results);
      } else {
        setSongs([]);
        setError("No se encontraron canciones para este género.");
      }
    } catch (err) {
      setError("Error al cargar canciones. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Cuando seleccionas una categoría
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSearch("");
    setPage(1);
    fetchSongs(cat.jamendoTag, "", 1);
  };

  // Cambiar página
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchSongs(selectedCategory.jamendoTag, search, newPage);
  };

  // Búsqueda en tiempo real al escribir
  useEffect(() => {
    if (selectedCategory) {
      const delayDebounce = setTimeout(() => {
        fetchSongs(selectedCategory.jamendoTag, search, 1);
        setPage(1);
      }, 400);
      return () => clearTimeout(delayDebounce);
    }
    // eslint-disable-next-line
  }, [search, selectedCategory]);

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearch("");
    // No modifiques currentSong ni isPlaying aquí
  };

  return (
    <div id="mainContainer">
      <h1>RocoMan</h1>
      {!selectedCategory ? (
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              className="category-card"
              key={cat.name}
              style={{ background: cat.color }}
              onClick={() => handleCategoryClick(cat)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button className="back-btn" onClick={handleBackToCategories}>
            ← Volver a categorías
          </button>
          <h2>{selectedCategory.name}</h2>
          <input
            type="text"
            placeholder="Buscar artista o canción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {loading ? (
            <div className="loading">Cargando canciones...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <ul className="song-list">
              {songs.length === 0 ? (
                <li>No hay canciones para mostrar.</li>
              ) : (
                songs.map((song) => {
                  const isCurrent = currentSong && currentSong.id === song.id && isPlaying;
                  return (
                    <li
                      key={song.id}
                      className={isCurrent ? "song-row active" : "song-row"}
                      onDoubleClick={() => {
                        setCurrentSong(song);
                        setIsPlaying(true);
                      }}
                    >
                      <span className={isCurrent ? "song-title playing" : "song-title"}>
                        <strong>{song.name}</strong>
                        <span className="song-artist"> — {song.artist_name}</span>
                      </span>
                      <button
                        className="play-btn"
                        onClick={e => {
                          e.stopPropagation();
                          if (isCurrent) {
                            setIsPlaying(false);
                          } else {
                            setCurrentSong(song);
                            setIsPlaying(true);
                          }
                        }}
                      >
                        {isCurrent ? "⏸" : "▶️"}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          )}

          {!loading && !error && songs.length > 0 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span>Página {page}</span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={songs.length < 20}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      {/* MiniPlayer y Modal SIEMPRE fuera del condicional */}
      <MiniPlayer
        song={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioTime={audioTime}
        setAudioTime={setAudioTime}
      />
      <SongPlayerModal song={modalSong} onClose={() => setModalSong(null)} />
    </div>
  );
}

export default App;

