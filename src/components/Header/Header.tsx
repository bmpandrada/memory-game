import { useState } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router";

const Header = () => {
  const [active, setActive] = useState("game");

  return (
    <div className={style.top__nav}>
      <Link
        onClick={() => setActive("game")}
        className={`${style.link} ${active === "game" ? style.active : ""}`}
        to={'/'}
      >
        Game
      </Link>
      <Link
        onClick={() => setActive("about")}
        className={`${style.link} ${active === "about" ? style.active : ""}`}
         to={'/about'}
      >
        About
      </Link>
    </div>
  );
};

export default Header;
