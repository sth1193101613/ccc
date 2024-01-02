import React, { useState, useRef } from "react";
import { useLocation, useOutlet } from 'react-router-dom'
import { HomeRender, PopList } from './css'
import Menu from '/@/components/menuBar'
import Header from '/@/components/header'
import Input from '/@/components/input'
import MyInput from '/@/components/myhead'
import Personal from '../../components/personalcenter'
import SongPop from '/@/components/songpop'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
const windowWidth: number = -window.innerWidth + 40
const statusList = [
    { name: '滑稽', icon: '🤪' },
    { name: '吐舌', icon: '😜' },
    { name: '好吃', icon: '😋' },
    { name: '亲亲', icon: '😚' },
    { name: '花痴', icon: '😍' },
    { name: '挑眉', icon: '🤨' },
    { name: '得意', icon: '😏' },
    { name: '无语', icon: '😑' },
]
interface HTMLEDIT extends HTMLDivElement {
    setH: () => void
}

const Home = () => {
    const outlet = useOutlet()
    const popRef = useRef<HTMLEDIT>()
    const location = useLocation()
    const [translateX, setTranslateX] = useState<number>(-window.innerWidth + 40)
    const [initiated, setInitiated] = useState<boolean>(false)
    const onHandleMenu = () => {
        setTranslateX(0)
        setInitiated(true)
    }
    const onHandleClose = () => {
        setTranslateX(windowWidth)
    }
    const onEditStatus = () => {
        popRef.current.setH()
    }
    const onHandleSearch = () => {
        console.log(1)
    }
    const renderHeadCompontes = () => {
        const mapRoute = {
            '/home/found': <Input onHandleSearch={() => { onHandleSearch() }} type='div'/>,
            '/home/my': <MyInput onEditStatus={() => { onEditStatus() }} onHandleSearch={() => { onHandleSearch() }} />
        }
        return mapRoute[location.pathname]
    }
    return (
        <>
            <Header onHandleMenu={() => { onHandleMenu() }}>
                {renderHeadCompontes()}
            </Header>
            <Personal translateX={translateX} onHandleClose={() => { onHandleClose() }} status={initiated} />
            <HomeRender>
                <SwitchTransition component={null}>
                    <CSSTransition key={location.pathname}
                        classNames='fade'
                        timeout={1000}
                        exit={false}>
                        {outlet}
                    </CSSTransition>
                </SwitchTransition>
            </HomeRender>
            <Menu></Menu>
            <SongPop ref={popRef}>
                <PopList>
                    {
                        statusList.map((el, index) => {
                            return (
                                <li key={index}>
                                    <span>{el.icon}</span>
                                    <span>{el.name}</span>
                                </li>
                            )
                        })
                    }
                </PopList>
            </SongPop>
        </>
    )
}
export default Home