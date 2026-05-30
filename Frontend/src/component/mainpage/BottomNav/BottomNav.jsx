import React from "react";
import style from "./bottomNav.module.css";
import { useNavigate, Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
// import { IoIosSearch } from "react-icons/io";
// import { MdRestaurantMenu } from "react-icons/md";
import { GoPlay } from "react-icons/go";
import { LiaCartPlusSolid } from "react-icons/lia";
import { GiPowerLightning } from "react-icons/gi";

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
              <IoHomeOutline />
            <div style={{ fontSize: "0.8rem", color: "black" }}>home</div>
            </div>
          </div>
        </Link>
        {/* </div> */}

        <Link to="/food/home" className={style.navLink}>
          <div className={style.navItem}>
            <div className={style.navLabel}>
              <GoPlay />
            </div>
          </div>
        </Link>

        <Link to="/food/user-profile">
          <div>
            <img
              className={style.navButton}
              src={
                "https://media.gettyimages.com/id/2192202545/vector/avatar-profile-of-man-head-shape-flat-illustration.jpg?s=612x612&w=0&k=20&c=4B-EimX02cWXXZC_iPpQRiGkycmF6qtTWwzdD7o_XOo="
              }
              alt="profilephoto"
            />
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
            <GiPowerLightning />
          </div>
          </div>
        </Link>
        <Link to="/reorder" className={style.navLink}>
          <div className={style.navItem}>
            <div className={style.navLabel}>
              <LiaCartPlusSolid />
            </div>
          </div>
        </Link>
      </nav>
    </>
  );
};

export default BottomNav;
