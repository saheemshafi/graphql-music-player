import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <IoMenu />
      </button>
      <aside id="navigation" className={`${isOpen ? "mobile-nav-open" : ""}`}>
        <div>
          <img src="/spotify-logo.png" title="spotify-logo" />
        </div>
        <div>
          <ul>
            <li>
              <NavLink to={"/"}>For You</NavLink>
            </li>
            <li>
              <NavLink to={"top-tracks"} end>
                Top Tracks
              </NavLink>
            </li>
            <li>
              <NavLink end to={"favourites"}>
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink end to={"recently-played"}>
                Recently Played
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <button className="profile-btn">
            <img
              src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1683376488~exp=1683377088~hmac=2cdcc852261f9d2c1a9ea604b0f2b9afcecd3fb93213cd3f1b4749aacf94da2c"
              alt="profile-image"
            />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
