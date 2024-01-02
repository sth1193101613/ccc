import React, { useRef, useEffect, useState } from 'react'
import { Personalner, DrawerMask, DrawCard } from './css'
import Hammer from 'hammerjs'
import { selectUser } from '/@/redux/user'
import { useSelector } from 'react-redux'
import { KeyboardArrowRightOutlined, EmailOutlined, SickOutlined, SettingsFilled } from '@ricons/material'
import { Icon } from '@ricons/utils'
import { Divider } from 'antd-mobile'
import { userType } from '/@/types'
const iconSize: number = 22
const iconColor: string = '#fff'
const arrowColor: string = 'rgba(180,180,180,.5)'
const W_WIDTH: number = window.innerWidth
const DRAW_WIDTH: number = W_WIDTH - 40
const Personal = ({ translateX, onHandleClose, status }) => {
    const container = useRef(null)
    const [startmark, setStartmark] = useState(translateX)
    const [initiated, setInitiated] = useState<boolean>(status) // 是否开启动画
    const [opacity, setOpacity] = useState<string>('rgba(0,0,0,.1)')
    const [mask, setMask] = useState<boolean>(false)
    const userInfo: { data: userType } = useSelector(selectUser)
    const clientHeight = document.documentElement.clientHeight
    const [nav] = useState([
        {
            name: '我的消息',
            icon: EmailOutlined
        },
        {
            name: '云贝中心',
            icon: SickOutlined
        },
        {
            name: '设置',
            icon: SettingsFilled
        }
    ])
    useEffect(() => {
        const manager = new Hammer(container.current, {})
        manager.add(new Hammer.Pan())
        manager.on('panend panmove', (e: { eventType: number; deltaX: number }) => {
            if (e.eventType === Hammer.INPUT_MOVE) {
                setInitiated(false)
                setStartmark(e.deltaX)
                setMask(true)
                if (e.deltaX >= 0) {
                    setStartmark(0)
                }
                if (e.deltaX < -W_WIDTH + 40) {
                    setStartmark(-W_WIDTH + 40)
                    setMask(false)
                    onHandleClose()
                }
                if (e.deltaX <= 1 && e.deltaX >= -W_WIDTH + 40) {
                    const opacityx = Number(Math.abs((335 / 100) / Math.abs(e.deltaX))) * 10
                    setOpacity(() => `rgba(0,0,0,${opacityx})`)
                    if (opacityx >= 0.4) {
                        setOpacity(() => `rgba(0,0,0,.4)`)
                    } else if (opacityx <= 0) {
                        setOpacity(() => `rgba(0,0,0,0)`)
                    }
                }
            }
            if (e.eventType === Hammer.INPUT_END) {
                setInitiated(true)
                if (Math.abs(e.deltaX) > DRAW_WIDTH / 2) {
                    setStartmark(-W_WIDTH + 40)
                    onHandleClose()
                }
                if (Math.abs(e.deltaX) < DRAW_WIDTH / 2) {
                    setStartmark(0)
                }
            }
        })
        return () => {
            manager.off('panmove');
            manager.off('panend');
        }
    }, [])
    const handleMaskClick = () => {
        onHandleClose()
        setMask(false)
    }
    useEffect(() => {
        setStartmark(translateX)
        setInitiated(status)
        if (translateX === 0) {
            setMask(true)
            setOpacity(() => `rgba(0,0,0,.4)`)
        }
        if (translateX === -DRAW_WIDTH) {
            setMask(false)
        }
    }, [translateX, status])
    const handleInfo = () => { }
    return (
        <>
            <Personalner ref={container} x={startmark} status={initiated} height={clientHeight}>
                <div className='tap' onClick={() => { handleInfo() }}>
                    <img src={userInfo?.data?.avatarUrl} alt="" className='avatar' />
                    <p className='nickname'>{userInfo?.data?.nickname}</p>
                    <Icon size={iconSize}><KeyboardArrowRightOutlined /></Icon>
                </div>
                <DrawCard>
                    <ul>
                        {
                            nav.map((el, index) => {
                                return (
                                    <li key={index}>
                                        <div className='coust'>
                                            <Icon size={iconSize} color={iconColor} ><el.icon /></Icon>
                                            <span className='name'>{el.name}</span>
                                            <Icon size={iconSize} color={arrowColor} tag='i'><KeyboardArrowRightOutlined /></Icon>
                                        </div>
                                        <Divider style={{ borderColor: '#4c4c4c80', margin: '10px 0' }} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </DrawCard>
            </Personalner>
            {
                mask ? <DrawerMask onClick={() => { handleMaskClick() }} opacity={opacity} status={initiated} /> : null
            }
        </>
    )
}
export default Personal