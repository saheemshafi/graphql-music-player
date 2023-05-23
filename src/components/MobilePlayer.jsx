import React, { useState } from "react";
import Poster from "../assets/default-music-poster.jpg";
import StylizedRange from "./StylizedRange";
import {
  IoEllipsisHorizontal,
  IoPlay,
  IoPlayBack,
  IoPlayForward,
  IoVolumeHigh,
} from "react-icons/io5";
import { TbPlayerPauseFilled } from "react-icons/tb";

const MobilePlayer = ({
  currentSong,
  handleLoadedImage,
  image,
  handleSeek,
  currentTimePercent,
  isMenuOpen,
  shareSong,
  handleNextAndPrevious,
  handlePlayPause,
  isVolumeOpen,
  volume,
  handleVolume,
  setIsMenuOpen,
  setIsVolumeOpen,
  isPlaying,
}) => {
  return (
    <div className="mobile-player" id="mobile-player">
      <div className="song-info-m">
        <div className="poster">
          <img
            onLoad={handleLoadedImage}
            ref={image}
            src={currentSong.photo ? currentSong.photo : Poster}
            alt={currentSong.title}
          />
        </div>
        <div>
          <p>{currentSong.title}</p>
          <small>{currentSong.artist}</small>
        </div>
      </div>

      <div className="mobile-music-controls">
        <div>
          <StylizedRange
            handleSeek={handleSeek}
            currentTime={currentTimePercent || 0}
          />
        </div>
        <div className="controls-handlers">
          <span>
            <button
              title="Menu"
              className="bg-dark player-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div
                className={`player-menu ${isMenuOpen ? "open" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentSong.url);
                        setIsMenuOpen(false);
                      }}
                    >
                      Copy Link
                    </button>
                  </li>
                  <li>
                    <button onClick={shareSong}>Share</button>
                  </li>
                </ul>
              </div>
              <IoEllipsisHorizontal />
            </button>
          </span>
          <span>
            <button data-type="previous" onClick={handleNextAndPrevious}>
              <IoPlayBack />
            </button>
          </span>
          <span>
            <button className="bg-white" onClick={handlePlayPause}>
              {isPlaying ? (
                <TbPlayerPauseFilled className="pause" />
              ) : (
                <IoPlay className="play" />
              )}
            </button>
          </span>
          <span>
            <button data-type="next" onClick={handleNextAndPrevious}>
              <IoPlayForward />
            </button>
          </span>
          <span>
            <button
              title="Volume"
              className="bg-dark volume-btn"
              onClick={() => setIsVolumeOpen(!isVolumeOpen)}
            >
              <div
                className={`volume-pop ${isVolumeOpen ? "open" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <StylizedRange
                  handleVolume={handleVolume}
                  volume={volume || 0}
                />
              </div>
              <IoVolumeHigh />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
