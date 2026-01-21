import React from 'react'
import style from './AllFood.module.css'
import f1 from '../../../assets/f1.jpg'
import { MdOutlineTimer } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";

const fooditem = [
    { id: 1, name: "Corn pizza", time: "30min", distance: "2.5 km", offer: "60% off", rating: 4.2 },
]

const AllFood = () => {
    return (
        <>
            <div className={style.mainfoodContainer}>
                <div className={style.topherosection}>
                    <div className={style.filter}>
                        <div>filter</div>
                        <div>under 200</div>
                        <div>near & fast</div>
                    </div>
                </div>
                <div className={style.mainherosection}>
                    {/* <h3>Recommended for you</h3> */}
                    <div className={style.foodcontainer}>
                        <div className={style.foodimage}>
                            <img src={f1} alt="img" />
                        </div>
                        <div className={style.foodItemDetails}>
                            <div className={style.foodname}>
                                corn double pizza 
                                <h5>4.2</h5>
                            </div>
                            <div className={style.foodtime}>
                               <MdOutlineTimer /> 30-40 min | 2.5 km
                            </div>
                            <div className={style.foodOffer}>
                               <BiSolidOffer /> 80% off
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllFood