import React, { useState, createContext, useEffect } from "react";

export const PlayerContext = createContext({});

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState({
    __typename: "Song",
    _id: "61b6f14dc2f7cafd968c31fd",
    artist: "Imagine Dragons",
    duration: 560,
    isFirst: true,
    photo:
      "https://external-preview.redd.it/SEOiJhnBbwkfSbmAHFPh8UrvpyKcRLyVbdtf5DWNtGc.jpg?auto=webp&s=8f815af3594caa6f01ef25d3da2a8b4e1a4239a6",
    title: "It Comes Back to You",
    url: "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3",
  });
  useEffect(() => {}, [currentSong]);

  return (
    <PlayerContext.Provider value={[currentSong, setCurrentSong]}>
      {children}
    </PlayerContext.Provider>
  );
};
