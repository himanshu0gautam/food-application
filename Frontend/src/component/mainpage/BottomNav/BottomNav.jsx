import React from "react";
import style from "./bottomNav.module.css";
import { useNavigate, Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
// import { IoIosSearch } from "react-icons/io";
// import { MdRestaurantMenu } from "react-icons/md";
import { MdOutlinePlayCircleFilled } from "react-icons/md"
import { FaCartPlus } from "react-icons/fa";
import { GiPowerLightning } from "react-icons/gi";
import { TbNumber99Small } from "react-icons/tb";

const BottomNav = () => {
  const handleHomeReload = () => {
    if (location.pathname === "/home") {
      document.body.classList.add("page-reload");
      setTimeout(() => window.location.reload(), 350);
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <>
      <nav className={style.bottomNav} aria-label="bottom navigation">
        {/* <div onClick={handleHomeReload}> */}
        <Link to="/">
          <div className={style.navItem}>
            <div className={style.navLabel}>
              <AiFillHome /> <span>Home</span>
            </div>
          </div>
        </Link>
        {/* </div> */}

        <Link to="/food/home" className={style.navLink}>
          <div className={style.navItem}>
            <div className={style.navLabel}>
              <MdOutlinePlayCircleFilled /> <span>video</span>
            </div>
          </div>
        </Link>

        <Link to="/food/99store">
          <div className={style.navItem}>
          <div className={style.navLabel}>
            <TbNumber99Small /> <span>store</span>
          </div>
          </div>
        </Link>
        {/* <Link to="/save" className={style.navLink}>
              <div className={style.navItem}><div className={style.navLabel}><VscSaveAll /></div></div>
            </Link> */}
        {/* <Link to="/create-food" className={style.navLink}>
              <div className={style.navItem}><div className={style.homecreatefoodbtn}><RiAddLargeFill /></div></div>
            </Link> */}
        <Link to="/Bolt" className={style.navLink}>
        <div className={style.navItem}>
          <div className={style.navLabel}>
            <GiPowerLightning /> <span>Bolt</span>
          </div>
          </div>
        </Link>
        <Link to="/reorder" className={style.navLink}>
          <div className={style.navItem}>
            <div className={style.navLabel}>
              <FaCartPlus /> <span>Reorder</span>
            </div>
          </div>
        </Link>
      </nav>
    </>
  );
};

export default BottomNav;
