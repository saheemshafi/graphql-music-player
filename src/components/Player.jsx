import React, { useContext, useEffect, useRef, useState } from "react";
import Poster from "../assets/default-music-poster.jpg";
import {
  IoEllipsisHorizontal,
  IoPlay,
  IoPlayBack,
  IoPlayForward,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { PlayerContext } from "../context/PlayerContext";
import { MusicContext } from "../context/MusicContext";
import { getImageColor } from "../image-color/image-color";
import StylizedRange from "./StylizedRange";
import DesktopPlayer from "./DesktopPlayer";
import MobilePlayer from "./MobilePlayer";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useContext(PlayerContext);
  const [songs] = useContext(MusicContext);
  const [currentTimePercent, setCurrentTimePercent] = useState(0);
  const [volume, setVolume] = useState(100);
  const audio = useRef();
  const image = useRef();
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    audio.current.src = currentSong.url;
    if (!currentSong.isFirst) {
      audio.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);
  function handleLoadedImage(e) {
    const { r, g, b } = getImageColor(image.current);
    document.getElementById(
      "main"
    ).style.background = `linear-gradient(to right,rgb(${r},${g},${b},0.2),transparent 80%)`;
  }

  function handleTimeUpdate(e) {
    setCurrentTimePercent(
      Math.floor((audio.current.currentTime / audio.current.duration) * 100)
    );
  }

  function handleSeek(e) {
    audio.current.currentTime = (e.target.value * audio.current.duration) / 100;
    setCurrentTimePercent(
      Math.floor((audio.current.currentTime / audio.current.duration) * 100)
    );
    e.target.value = `${currentTimePercent}`;
  }

  function handlePlayPause() {
    if (isPlaying) {
      audio.current.pause();
      setIsPlaying(false);
    } else {
      audio.current.play();
      setIsPlaying(true);
    }
  }

  function handleNextAndPrevious(e) {
    const target = e.target.closest("button");
    const index = songs.findIndex((song) => song._id == currentSong._id);

    if (target.dataset.type === "next") {
      if (index + 1 < songs.length) {
        setCurrentSong({ ...songs[index + 1], isFirst: false });
        return;
      }
      setCurrentSong({ ...songs[0], isFirst: false });
    }

    if (target.dataset.type == "previous") {
      if (index <= 0) {
        setCurrentSong({ ...songs[songs.length - 1], isFirst: false });
        return;
      }
      setCurrentSong({ ...songs[index - 1], isFirst: false });
    }
  }
  useEffect(() => {
    audio.current.volume = volume / 100;
  }, [volume]);

  function handleVolume(e) {
    e.stopPropagation();
    setVolume(e.target.value);
  }

  function shareSong() {
    if (navigator.canShare(currentSong)) {
      navigator.share(currentSong);
    }
    setIsMenuOpen(false);
  }
  return (
    <aside id="player">
      <audio
        onTimeUpdate={handleTimeUpdate}
        ref={audio}
        hidden
        src={currentSong.url}
      ></audio>
      <DesktopPlayer
        audio={audio}
        currentSong={currentSong}
        currentTimePercent={currentTimePercent}
        handleLoadedImage={handleLoadedImage}
        handleNextAndPrevious={handleNextAndPrevious}
        handleSeek={handleSeek}
        handlePlayPause={handlePlayPause}
        isMenuOpen={isMenuOpen}
        isVolumeOpen={isVolumeOpen}
        handleVolume={handleVolume}
        image={image}
        shareSong={shareSong}
        volume={volume}
        setIsMenuOpen={setIsMenuOpen}
        setIsVolumeOpen={setIsVolumeOpen}
        isPlaying={isPlaying}
      />
      <MobilePlayer
        audio={audio}
        currentSong={currentSong}
        currentTimePercent={currentTimePercent}
        handleLoadedImage={handleLoadedImage}
        handleNextAndPrevious={handleNextAndPrevious}
        handleSeek={handleSeek}
        handlePlayPause={handlePlayPause}
        isMenuOpen={isMenuOpen}
        isVolumeOpen={isVolumeOpen}
        handleVolume={handleVolume}
        image={image}
        shareSong={shareSong}
        volume={volume}
        setIsMenuOpen={setIsMenuOpen}
        setIsVolumeOpen={setIsVolumeOpen}
        isPlaying={isPlaying}
      />
    </aside>
  );
};

export default Player;
