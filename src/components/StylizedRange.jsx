import React, { useEffect, useRef } from "react";

const StylizedRange = ({ handleSeek, currentTime, volume, handleVolume }) => {
  const rangeControl = useRef();
  useEffect(() => {
    updateRangeControl();
  }, [currentTime]);
  useEffect(() => {
    updateRangeControl();
  }, [volume]);

  function updateRangeControl() {
    rangeControl.current.value = currentTime || volume;
    rangeControl.current.nextElementSibling.children[0].style.width = `${currentTime || volume}%`;
    rangeControl.current.nextElementSibling.nextElementSibling.style.left = `${currentTime | volume}%`;
  }
  return (
    <div className="range">
      <input
        type="range"
        ref={rangeControl}
        min={0}
        value={currentTime || volume}
        max={100}
        onInput={handleSeek || handleVolume}
      />
      <div className="range-style-bg">
        <div className="range-style" style={{width:currentTime || volume}}></div>
      </div>
      <div className="dot" style={{left:currentTime || volume}}></div>
    </div>
  );
};

export default StylizedRange;
