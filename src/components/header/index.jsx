import React from "react"
import { Headerner, HeaderChildren } from './css'
import { MenuOutlined } from '@ricons/material'
import { Icon } from '@ricons/utils'
const Header = (props) => {
    const onHandleMenu = () => {
        props.onHandleMenu()
    }
    return (
        <Headerner>
            <Icon color={'#fff'} size={24}>
                <MenuOutlined onClick={onHandleMenu}/>
            </Icon>
            <HeaderChildren>
                {props.children}
            </HeaderChildren>
        </Headerner>
    )
}
export default Header