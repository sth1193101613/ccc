import React, { useEffect, useRef, useState } from 'react'
import { SongRerder, CardTitle, CardWarp } from './css'
import BetterScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import MusicAnimate from '/@/components/musicanimate'
import { bsOption } from '../../utils/tool'
import { Skeleton } from 'antd-mobile'
import ImageLazy from '/@/components/ImageLazy'
BetterScroll.use(Slide)
const Songlist = ({ title, data, onHandleSong }) => {
    const cardRef = useRef();
    const [bsObj, setBs] = useState({})
    useEffect(() => {
        initBscroll()
        return () => {
            if (bsObj && bsObj.destroy)
                bsObj.destroy()
        }
    }, [data])
    const initBscroll = () => {
        setBs(() => {
            setTimeout(() => {
                cardRef.current && new BetterScroll(cardRef.current, {
                    slide: {
                        autoplay: false,
                        loop: false
                    },
                    ...bsOption
                })
            }, 50)
        })
    }
    const handleSong = (el) => {
        onHandleSong(el, data)
    }
    return (
        <>
            <SongRerder>
                {
                    data.length === 0 ? <Skeleton.Paragraph lineCount={3} animated /> :
                        <>
                            <CardTitle>
                                <span className='title'>{title}</span>
                                <span className='more'>更多</span>
                            </CardTitle>
                            <CardWarp ref={cardRef} className="cardContent">
                                <div className='slidebox'>
                                    {
                                        data.map((el, index) => {
                                            return (
                                                <ul key={index} className="itemcont">
                                                    {
                                                        el.map((i, idx) => {
                                                            return (
                                                                <li key={idx} className="songitem" onClick={() => { handleSong(i) }}>
                                                                    <div className='picbox'>
                                                                        <MusicAnimate propsId={i} />
                                                                        <ImageLazy src={i?.al?.picUrl} className={['picUrl imgStyle'].join(' ')}></ImageLazy>
                                                                    </div>
                                                                    <div className='info'>
                                                                        <p className='songname'>{i.name}</p>
                                                                        <p>
                                                                            {i.reason ? <span className='reason'>{i.recommendReason}</span> : null}
                                                                            {
                                                                                i?.ar?.map((el, i) => {
                                                                                    return (
                                                                                        <span className='art' key={i}>{el.name}/</span>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            )
                                        })
                                    }
                                </div>
                            </CardWarp>
                        </>
                }

            </SongRerder>
        </>

    )
}
export default Songlist