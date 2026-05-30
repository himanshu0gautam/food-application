import React from 'react'
import style from './FoodDetails.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../assets/f1.jpg'
import img2 from '../assets/f2.jpg'
import img3 from '../assets/f3.jpg'

const FoodDetails = () => {

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
            <div className={style.slidebar}>
                <div className={style.slide}>
                    <Slider {...setting}>
                        <img src={img1} alt="slide1" />
                        <img src={img2} alt="slide2" />
                        <img src={img3} alt="slide3" />
                    </Slider>
                </div>

            </div> 
        </>

    )
}

export default FoodDetails