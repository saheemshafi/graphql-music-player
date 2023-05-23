import React, { useState, createContext } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  return (
    <MusicContext.Provider value={[songs, setSongs]}>
      {children}
    </MusicContext.Provider>
  );
};
