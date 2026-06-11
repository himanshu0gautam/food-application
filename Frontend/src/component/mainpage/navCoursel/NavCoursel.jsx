import React, { useState } from "react";
import style from "./NavCoursel.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import f1 from '../../../assets/f1.jpg'
// import f2 from '../../../assets/f2.jpg'
// import f3 from '../../../assets/f3.jpg'
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { SlWallet } from "react-icons/sl";
import { useNavigate, Link } from "react-router-dom";
import LocationTracker from "../GeoLocation/LocationTracker";

const NavCoursel = () => {
  const [currentAddress, setCurrentAddress] = useState(
    localStorage.getItem("user_address") || "no location set",
  );

  const [role, setRole] = useState(localStorage.getItem("role"));

  const setting = {
    dot: true,
    Infinity: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    arrow: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
    ],
  };

  const f1 =
    "https://imgs.search.brave.com/WyAvD9reW89S90cdUSGiwvUAbkO-ZVOoSrvz3k2hAyk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcHRv/LmRpZ2l0YWwvd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMTIv/U3dpZ2d5LUJhbm5l/ci5qcGc";
  const f2 =
    "https://imgs.search.brave.com/BOQ1LQn07Bjvkwh_wjEpeQRwaqNCpYM-Nt1Ne4FC-gw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3JlYXRpdmVoYXR0/aS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDQvQmFu/bmVyLWRlc2lnbi1v/Zi1mYXN0LWFuZC1m/cmVlLWRlbGl2ZXJ5/LXBpenphLWluLTMw/LW1pbnV0ZXMtMDct/c21hbGwuanBn";
  const f3 =
    "https://imgs.search.brave.com/gkvMXU6ZycNMAiezz1J7U7CUJbiPV2ywmSZsKio64GI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RzLzQwNC8w/YTE5ZmQyMTI1MTM1/OTUuWTNKdmNDd3hP/VEl3TERFMU1ERXNN/Q3c1TkRBLnBuZw";
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.Useraddress}>
          <div className={style.locationName}>
            <img
              src="https://imgs.search.brave.com/j6HIJ8TjkLXYDmuTfhBP6WdISfjP2GdVeOiEKGlgp_g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9sb2NhdGlv/bi1pY29uLXN2Zy1k/b3dubG9hZC1wbmct/Njg2NTUzNC5wbmc_/Zj13ZWJwJnc9MTI4"
              alt=""
            />
            {/* <div className={style.Useraddress}> */}
                <h3 title={currentAddress}>
                  {currentAddress}
                </h3>
              <LocationTracker
                onLocationFetched={(address) => setCurrentAddress(address)}
                />
            {/* </div> */}
          </div>
        </div>

        <div className={style.overlayContent}>
          <div className={style.logoName}>
            <h3>
              Foo<span>D</span>ies
            </h3>
          </div>
          <div className={style.location}>
            <h4>Setup your loaction</h4>
          </div>

          {/* <div className={style.searchbar}>
                        <div className={style.searchbtn}>
                            <IoSearch className={style.searchArrow} />
                            <input type="text" placeholder='Search...' />
                            <IoIosArrowDown className={style.searchArrow} />
                        </div>
                         <div className={style.profile}></div>
                    </div> */}

          <div className={style.profilebtn}>
            <div className={style.searchbtn}>
              <IoSearch className={style.searchArrow} />
              <input type="text" placeholder="Search..." />
              <IoIosArrowDown className={style.searchArrow} />
            </div>
            {/* <div className={style.wallet}><span><SlWallet /></span></div> */}
            <Link to={role === "foodpartner" ? "/food/user-profile" : "/food/partner-profile"}>
              <div className={style.profile}>
                <img
                  src="https://i.pinimg.com/736x/a9/75/93/a975934bb378afc4ca8c133df451f56e.jpg"
                  alt=""
                />
              </div>
            </Link>
          </div>
        </div>
        <div className={style.slidebar}>
          <div className={style.slide}>
            <Slider {...setting}>
              <img src={f1} alt="slide1" />
              <img src={f2} alt="slide2" />
              <img src={f3} alt="slide3" />
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavCoursel;
