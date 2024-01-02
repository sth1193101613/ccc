import React, { useRef, useState, useEffect } from "react";
import { Carouselner } from './css'
import { Swiper } from 'antd-mobile'
const Carousel = (props) => {
    const { value } = props
    const cardRef = useRef()
    const [bsObj, setBs] = useState(null)
    return (
        <Carouselner className="banner">
            <Swiper autoplay={false} loop>
                {
                    value.map((child, index) => {
                        return (
                            <Swiper.Item key={index}>
                                <img src={child.pic} alt="" />
                            </Swiper.Item>
                        )
                    })
                }
            </Swiper>

        </Carouselner >

    )
}
export default Carousel