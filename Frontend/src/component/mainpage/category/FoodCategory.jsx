import React from 'react'
import style from './FoodCategory.module.css'

const FoodCategoryitem = [
    { id: 7, name: "All", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 1, name: "Pizza", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 2, name: "Burger", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 3, name: "Roll", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 4, name: "Desserts", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 5, name: "Cake", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 6, name: "Salads", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 9, name: "Salads", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 8, name: "Salads", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 10, name: "Salads", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
    { id: 11, name: "Salads", src: "https://i.pinimg.com/736x/0f/0c/04/0f0c04461875fcf40f1df2d279aafe89.jpg" },
]

const FoodCategory = () => {
    return (
        <>
            <div className={style.categoryContainer}>
                <div className={style.category}>
                    {FoodCategoryitem.map((item) => (
                        <div key={item.id}>
                            <div className={style.categoryImg}>
                                <img src={item.src} alt="img1" />
                            <h6 className={style.categoryName}>{item.name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FoodCategory