import React from "react";
import style from "./AllFood.module.css";
import { Link } from "react-router-dom";
import f1 from "../../../../assets/f1.jpg";
import { MdOutlineTimer } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../../../utils/ApiInstance";
import { useEffect } from "react";

// const fooditem = [
//     { id: 1, name: "Corn pizza", time: "30min", distance: "2.5 km", offer: "60% off", rating: 4.2 },
//     { id: 2, name: "fry momo", time: "10min", distance: "2.5 km", offer: "60% off", rating: 4.2 },
//     { id: 3, name: "thali", time: "50min", distance: "2.5 km", offer: "60% off", rating: 4.2 },
//     { id: 4, name: "burger", time: "15min", distance: "2.5 km", offer: "60% off", rating: 4.2 },
// ]

const AllFood = () => {
  const [dishItem, setDishItem] = useState([]);

  const fetchDish = async () => {
    try {
      const res = await axiosInstance.get("/createFood/getsavefood", {
        withCredentials: true,
      });
      console.log("dish fetched", res.data);
      setDishItem(res.data.data);
    } catch (error) {
      console.log("video fetched error", error);
    }
  };

  useEffect(() => {
    fetchDish();
  }, []);

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
        <h3 className={style.foodheading}>Recommended for you .</h3>

        <div className={style.mainherosection}>
          {dishItem?.map((item) => (
            <div key={item._id} className={style.foodcontainer}>
              <Link to="/food/food-details">
                <div className={style.foodimage}>
                  <img src={item.dishImage} alt="img" />
                </div>
              </Link>
              <div className={style.foodItemDetails}>
                <div className={style.foodname}>
                  {item.dishName}
                  <h5>{item.Rating}</h5>
                </div>
                <div className={style.foodtime}>
                  <MdOutlineTimer /> {item.preprationTime} | {item.distance}
                </div>
                <div className={style.foodOffer}>
                  <BiSolidOffer /> {item.dishPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllFood;
