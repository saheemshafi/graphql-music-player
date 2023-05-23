import React, { useEffect, useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { IoSearch } from "react-icons/io5";
import SongTile from "./SongTile";
import { BiLoaderAlt } from "react-icons/bi";
import { MusicContext } from "../context/MusicContext";

const GET_SONGS = gql`
  query Query($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;

const Favourites = () => {
  const { loading, data } = useQuery(GET_SONGS, {
    variables: { playlistId: 3 },
  });
  const [songs, setSongs] = useContext(MusicContext);
  const [filteredSongs, setFilteredSongs] = useState([]);
  useEffect(() => {
    if (data) {
      setSongs([...songs, ...data.getSongs]);
      setFilteredSongs(data.getSongs);
    }
  }, [data]);
  function handleSearch(e) {
    const filtered = data.getSongs.filter((song) =>
      song.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSongs(filtered);
  }

  return (
    <>
      <h1>Favourites</h1>
      <div className="search-wrapper">
        <input type="search" placeholder="Search Song, Artist" onChange={handleSearch}/>
        <IoSearch />
      </div>
      <section>
        {loading ? (
          <div className="loader">
            <BiLoaderAlt />
          </div>
        ) : (
          filteredSongs.map((song) => <SongTile key={song._id} song={song} />)
        )}
      </section>
    </>
  );
};

export default Favourites;
