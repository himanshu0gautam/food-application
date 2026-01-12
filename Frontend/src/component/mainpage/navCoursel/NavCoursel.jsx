import React from 'react'
import style from './NavCoursel.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import food1 from '../../../assets/food1.jpg'
import food2 from '../../../assets/food2.jpg'

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
                <div className={style.slidebar}>
                    <div className={style.slide}>
                        <Slider {...setting}>
                            <div className={style.slideImg}><img src={food1} alt="slide1" /></div>
                            <div className={style.slideImg}><img src={food2} alt="slide2" /></div>
                            {/* <div className={style.slideImg}><img src={food1} alt="slide1" /></div> */}
                        </Slider>
                    </div>

                </div>
            </div>

        </>
    )
}

export default NavCoursel