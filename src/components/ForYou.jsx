import React, { useEffect, useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import SongTile from "./SongTile";
import { useQuery, gql } from "@apollo/client";
import { MusicContext } from "../context/MusicContext";
import { BiLoaderAlt } from "react-icons/bi";

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

const ForYou = () => {
  const [songs, setSongs] = useContext(MusicContext);
  const { loading, data } = useQuery(GET_SONGS, {
    variables: { playlistId: 1 },
  });
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
      <h1>For You</h1>
      <div className="search-wrapper">
        <input
          type="search"
          onChange={handleSearch}
          placeholder="Search Song, Artist"
        />
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

export default ForYou;
