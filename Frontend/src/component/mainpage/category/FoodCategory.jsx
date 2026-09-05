import React from 'react'
import style from './FoodCategory.module.css'

const FoodCategoryitem = [
    { id: 7, name: "All", src: "https://imgs.search.brave.com/W7L3MFnAmAm0sD6fXCBc1-7amb9_XrPOBtDX9FyBa4U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzMv/NDk4LzE4OC9zbWFs/bC9hLXRyYWRpdGlv/bmFsLWluZGlhbi10/aGFsaS13aXRoLWRp/dmVyc2UtY3Vycmll/cy1yaWNlLWFuZC15/b2d1cnQtZGlwcy1v/bi1hLXJvdW5kLXRy/YXktY2xpcGFydC1p/c29sYXRlZC1vbi1h/LXRyYW5zcGFyZW50/LWJhY2tncm91bmQt/cG5nLnBuZw" },
    { id: 1, name: "Pizza", src: "https://imgs.search.brave.com/LSxE6Mj1V6k0GZxu4mhDBmQqBkW2RXw1TBFycEoBCx0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTkv/MjM0LzM0My9zbWFs/bC9kZWxpY2lvdXMt/cGVwcGVyb25pLXBp/enphLXNsaWNlLXdp/dGgtbWVsdGVkLWNo/ZWVzZS1hbmQtaGVy/YnMtb24tYS13aGl0/ZS1iYWNrZ3JvdW5k/LXBuZy5wbmc" },
    { id: 2, name: "Burger", src: "https://imgs.search.brave.com/PNQaeMEoOgDiH74uyag9YHPYqSVuMzhpvnKu5xcXrsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDcv/ODM0LzcwMi9zbWFs/bC9lZ2ctYnVyZ2Vy/LW1lbHRpbmctY2hl/ZXNlLXRyYW5zcGFy/ZW50LWJhY2tncm91/bmQtcG5nLnBuZw" },
    { id: 3, name: "Roll", src: "https://imgs.search.brave.com/aR--58Yy9EHtSsIecYp3VHABVHHWVDmYUwD3XlDBG4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcHNkL2Zy/ZXNobHktbWFkZS1j/aGlja2VuLWJ1cnJp/dG8tZmlsbGVkLXdp/dGgtZ3JpbGxlZC1t/ZWF0LXJlZC1ncmVl/bi1wZXBwZXJzLW9u/aW9ucy13cmFwcGVk/LXRvYXN0ZWQtZmxv/dXItdG9ydGlsbGFf/ODQ0NDMtNjM1Nzgu/anBnP2dhPUdBMS4x/LjIwMTIyMDg4ODEu/MTc4NjIwNTc5MyZz/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA" },
    { id: 11, name: "Pav bhaji", src: "https://imgs.search.brave.com/bXRW1V_ruje1cxYKzqoE1u8Np0uxJgte12OXC4_peiQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wYXYt/YmhhamktY2hhYXQt/aW5kaWFuLWN1cnJ5/LWRpc2gtMTIzODE0/ODYzLmpwZw" },
    { id: 4, name: "Ice Cream", src: "https://imgs.search.brave.com/iB3CqcDQvNXfTVUxkG-oL0PZ67sutbs1De9g85Ehev4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/MTcwNTU5L3Bob3Rv/L2ljZWNyZWFtLXRo/cmVlLWJhbGxzLWlu/LXdhZmVyLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1HR200/V28zWU5NVTFHYmpX/a0VfV2Q2cEhpV0E4/QmVEazZ3NkphZ0ht/aGJnPQ" },
    { id: 5, name: "Cake", src: "https://imgs.search.brave.com/PpZX0AwoUhVcyxAMDfHr0QUzT-idQ-5HIP3HIEU2DGE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm5wLmNvbS9hc3Nl/dHMvaW1hZ2VzL2N1/c3RvbS9hbHBoYS1z/aWduYXR1cmUtaWNv/bnMvbWF5LTIvSGVh/bHRoeV9DYWtlc19E/ZXNrXzUyOHg1Mjgu/cG5n" },
    { id: 6, name: "noodles", src: "https://imgs.search.brave.com/mZGnlY2l-KayuPzBiZFCAzHvIlidAgL9fdynotxU12I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzM3LzYxLzQz/LzM2MF9GXzIzNzYx/NDM4Ml9Fd1U1dDF3/OTk5TDQ5M09LdzRH/NnptZUJIZVgybHpO/cS5qcGc" },
    { id: 9, name: "Fries", src: "https://imgs.search.brave.com/mrFLIM54k4wH71S1MoxdcuEiCxZ3m_E-GlB8BFItkbo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTUv/NTkyLzkxMS9zbWFs/bC9wZXJmZWN0bHkt/Y3Jpc3B5LWdvbGRl/bi1mcmllcy1pbi1h/LXJlZC1jb250YWlu/ZXItb24tYS1yZXN0/YXVyYW50LXRhYmxl/LWZyZWUtcGhvdG8u/anBlZw" },
    { id: 8, name: "momo", src: "https://imgs.search.brave.com/bPVqaEwhXkf6KOLDoH0RI20QzYV8hkouVjPAnSBJO60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/OTI1LzAyNy9zbWFs/bC9tb21vcy1pbi1h/LWJhbWJvby1ib3ds/LW9uLWEtdHJhbnNw/YXJlbnQtYmFja2dy/b3VuZC1mcmVlLXBu/Zy5wbmc" },
    { id: 10, name: "Chaap", src: "https://imgs.search.brave.com/epseyW4-x61OWVyTYSZED3fTHxSb1L-jLaG4rHL0UQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by92ZWdldGFy/aWFuLXNveWEtbWFs/YWktY2hhcC1tYWRl/LTI2MG53LTIxOTE2/MjM4MzMuanBn" },
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