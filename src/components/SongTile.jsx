import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongTile = ({ song }) => {
  const [currentSong, setCurrentSong] = useContext(PlayerContext);
  function loadSong() {
    setCurrentSong({ ...song, isFirst: false });
  }
  return (
    <div
      onClick={loadSong}
      className={`song-tile ${currentSong._id === song._id ? "active" : ""}`}
    >
      <div>
        <span>
          <img src={song.photo} />
        </span>
        <span>
          <p>{song.title}</p>
          <small>{song.artist}</small>
        </span>
      </div>

      <div className="song-duration">
        <p>
          {(song.duration / 60).toString().replace(".", ":").substring(0, 4)}
        </p>
      </div>
    </div>
  );
};

export default SongTile;
