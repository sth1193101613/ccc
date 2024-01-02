import React, { useState, useEffect } from "react";
import { MenuBar } from './css'
import { useNavigate, useLocation } from "react-router-dom";
import { AccountBalanceRound, MusicNoteRound, CloudDoneOutlined, WifiTetheringRound, FormatListBulletedTwotone } from '@ricons/material'
const Menu = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [menu, setMenu] = useState([
        { name: '发现', src: AccountBalanceRound, show: 1, path: 'found' },
        { name: '关注', src: WifiTetheringRound, show: 0 },
        { name: '我的', src: MusicNoteRound, show: 0, path: 'my' },
        { name: '云村', src: CloudDoneOutlined, show: 0 },
        { name: '歌单', src: FormatListBulletedTwotone, show: 0 },])
    const handleTabs = (item) => {
        menu.forEach(el => el.show = 0)
        item.show = 1
        setMenu([...menu])
        navigate(item.path)
    }
    useEffect(() => {
        menu.forEach(el => el.show = 0)
        const pname = location.pathname.split('/')
        menu.forEach(el => {
            if (el.path === pname[pname.length - 1]) {
                el.show = 1
            }
        })
        setMenu([...menu])
    }, [location])
    return (
        <MenuBar>
            <ul>
                {
                    menu.map(item => {
                        return (
                            <li key={item.name} onClick={() => handleTabs(item)} show={item.show}>
                                <div style={{ 'backgroundColor': item.show ? '#ba0707' : '' }}><item.src style={{ 'transform': item.show ? 'scale(.8)' : 'scale(1)' }}></item.src></div>
                                <span style={{ 'color': item.show ? '#ba0707' : '#d6d6d6' }}>{item.name}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </MenuBar>
    )
}
export default Menu