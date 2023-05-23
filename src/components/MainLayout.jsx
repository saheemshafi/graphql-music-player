import React from "react";
import { Routes, Route } from "react-router-dom";
import ForYou from "./ForYou";
import Favourites from "./Favourites";
import RecentlyPlayed from "./RecentlyPlayed";
import TopTracks from "./TopTracks";

const MainLayout = () => {
  return (
    <main>
        <Routes>
          <Route path="/" element={<ForYou />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="recently-played" element={<RecentlyPlayed />} />
          <Route path="top-tracks" element={<TopTracks />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </main>
    
  );
};

export default MainLayout;
