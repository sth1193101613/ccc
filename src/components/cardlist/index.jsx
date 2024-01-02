import React, { useEffect, useRef, useState } from 'react'
import { CardRerner, CardTitle, CardWarp } from './css'
import BetterScroll from '@better-scroll/core'
import { PlayArrowRound } from '@ricons/material'
import { Icon } from '@ricons/utils'
import { bsOption } from '../../utils/tool'
import { useAppSelector } from '/@/redux/useReduxHook'
import { selectClick } from '/@/redux/found'
import { Skeleton } from 'antd-mobile'

const Cardlist = ({ title, data, isClass, onToSongList }) => {
    const isClick = useAppSelector(selectClick)
    const cardRef = useRef()
    const [bsObj, setBs] = useState(null)
    useEffect(() => {
        if (data.length > 0)
            initBscroll()
        return () => {
            if (bsObj && bsObj.destroy)
                bsObj.destroy()
        }
    }, [data])
    const initBscroll = () => {
        setBs(() => {
            return new BetterScroll(cardRef.current, bsOption)
        })
    }
    const numberFormat = (value) => {
        let i = ''
        let param = {}
        const size = ['', '万', '亿', '万亿']
        const k = 10000
        if (value < k) {
            param.value = value
            param.unit = ''
        } else {
            i = Math.floor(Math.log(value) / Math.log(k))
            param.value = ((value / Math.pow(k, i))).toFixed(2);
            param.unit = size[i]
        }
        return `${Number(param.value).toFixed(0)}${param.unit}`
    }
    const goToSongList = (e, el) => {
        e.preventDefault()
        if (isClick) {
            onToSongList(el)
        }
    }

    return (
        <CardRerner>
            {
                data.length === 0 ? <Skeleton.Paragraph lineCount={3} animated /> :
                    <>
                        <CardTitle>
                            <span className='title'>{title}</span>
                            <span className='more'>更多</span>
                        </CardTitle>
                        <CardWarp className='cardContent' ref={cardRef}>
                            <ul>
                                {
                                    data.map((el, index) => {
                                        return (
                                            <li key={index} onClick={(e) => { goToSongList(e, el) }}>
                                                <div><Icon color={'#fff'} size={15}><PlayArrowRound /></Icon><span className='count'>{numberFormat(el.playCount)}</span></div>
                                                <img data-src={el.picUrl} src={el.picUrl} className={[isClass, 'imgStyle'].join(' ')} />
                                                <p key={index}>{el.name}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </CardWarp>
                    </>
            }

        </CardRerner>

    )
}
export default Cardlist