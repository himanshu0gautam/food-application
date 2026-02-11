import React from 'react'
import style from './NavCoursel.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import f1 from '../../../assets/f1.jpg'
import f2 from '../../../assets/f2.jpg'
import f3 from '../../../assets/f3.jpg'
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { SlWallet } from "react-icons/sl";

const NavCoursel = () => {

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
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: false
                }
            }
        ]
    };


    return (
        <>

            <div className={style.mainContainer}>
                <div className={style.overlayContent}>
                    <div className={style.logoName}>
                        <h3>Foo<span>D</span>ies</h3>
                    </div>
                    <div className={style.location}>
                        <h4>Setup your loaction</h4>
                    </div>

                    <div className={style.searchbar}>
                        <div className={style.searchbtn}>
                            <IoSearch className={style.searchArrow} />
                            <input type="text" placeholder='Search...' />
                            <IoIosArrowDown className={style.searchArrow} />
                        </div>
                         {/* <div className={style.profile}></div> */}
                    </div>

                    <div className={style.profilebtn}>
                        <div className={style.wallet}><span><SlWallet /></span></div>
                        <div className={style.profile}>
                            <img src="https://i.pinimg.com/736x/a9/75/93/a975934bb378afc4ca8c133df451f56e.jpg" alt="" />
                        </div>
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
    )
}

export default NavCoursel