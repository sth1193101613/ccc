import React, { useRef, useState, useEffect, useCallback, ReactNode } from 'react'
import BetterScroll from '@better-scroll/core'
import { RefreshOutlined } from '@ricons/material'
import { Icon } from '@ricons/utils'
import { Bspull, PullToRefresh, PullLoading, Rotation } from './css'
import { useAppDispatch } from '/@/redux/useReduxHook'
import { updataClick } from '/@/redux/found'
const innHeight = window.innerHeight - (45 + 50 + 35)
const Distance: number = 50 * 1.5 * 1


interface pullType {
    children: ReactNode
    onRefResDone: () => any
    flag: boolean
}

const Pull = ({ children, onRefResDone, flag }: pullType) => {
    const dispatch = useAppDispatch()
    const cardRef = useRef<HTMLDivElement>()
    const [bsScroll, setScroll] = useState<any>()
    const [startY, setStartY] = useState<number>(0)
    const [top, setTop] = useState<number>(0)
    const [isFull, setFull] = useState<boolean>(!1)
    const [trotop, setStop] = useState<number>(0)
    const initBscroll = () => {
        setScroll(() => {
            return new BetterScroll(cardRef.current, {
                preventDefault: false,
                probeType: 3,
                scrollY: true,
                stopPropagation: false,
                bounce: {
                    top: false,
                    bottom: false,
                    left: false,
                    right: false
                }
            })
        })
    }

    const scroll = ({ y }) => {
        setStop(y)
    }
    const handleTouchStart = (e: any) => {
        const [touches] = e.changedTouches
        const { pageY } = touches
        setStartY(pageY)
        setTop(0)
        setFull(!1)
        bsScroll?.enable()
    };
    const handleTouchMove = useCallback((e: any) => {
        dispatch(updataClick(false))
        const [touches] = e.changedTouches
        const { pageY } = touches
        const stop = pageY - startY
        setFull(!1)
        let offset = 0
        let pos = 0
        if (Math.abs(trotop) === 0) {
            if (stop > 40) {
                bsScroll?.disable()
                pos = stop * .1 + stop * ((45 - pos) / 45) / 100
                offset = Math.floor(pos * 1e3 / 40) / 1e3
                if (offset > 1 || offset < 0) {
                    offset = 1
                    setFull(!0)
                }
                offset >= .9 && isFull
                setTop(50 * 1.5 * offset)
            }
        }
    }, [top, startY, isFull])
    const handleTouchEnd = async () => {
        bsScroll?.enable()
        if (top >= Distance) {
            if (typeof onRefResDone === 'function') {
                await onRefResDone()
                initBscroll()
            }
            const timer = setTimeout(() => {
                clearTimeout(timer)
                hideLoding()
            }, 500)
        }
        else {
            const timer = setTimeout(() => {
                clearTimeout(timer)
                hideLoding()
            }, 5)
        }
    }
    const hideLoding = () => {
        setTop(0)
        dispatch(updataClick(true))
    }
    useEffect(() => {
        if (bsScroll) {
            bsScroll.on("scroll", scroll)
        }
    }, [bsScroll])
    useEffect(() => {
        if (flag) {
            setTimeout(() => {
                initBscroll()
            }, 10)
        }
        return () => {
            if (bsScroll && bsScroll.destroy)
                bsScroll.destroy()
        }
    }, [flag])
    return (
        <Bspull ref={cardRef} h={innHeight} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div>
                {children}
            </div>
            <PullToRefresh style={{
                'transform': `translate3d(0, ${top}px ,0)`,
                'opacity': top === 0 ? 0 : 1,
                'transition': top === 0 ? '.5s all' : ''
            }}>
                <PullLoading style={{ transform: `rotate(${top * 2}deg)` }}>
                    <Icon color={'#ff3d00 '} size={26} tag='div'>
                        {top === Distance ? <Rotation /> : <RefreshOutlined />}
                    </Icon>
                </PullLoading>
            </PullToRefresh>
        </Bspull>
    )
}
export default Pull