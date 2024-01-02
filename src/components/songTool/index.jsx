import React, { useRef, useEffect, useState } from "react"
import { SongBar, ProgressCircle } from './css'
import { selectSong, selectSongTime, selectPlayer, updataPlayerStatus } from '/@/redux/song'
import { useSelector, useDispatch } from 'react-redux'
import { PlayArrowRound, PauseRound, PlaylistPlayRound } from '@ricons/material'
import { useLocation } from "react-router-dom"
import eventBus from '/@/utils/event'
const singlecover = new URL('../../assets/img/singlecover.png', import.meta.url)
const circleWidth = Math.PI * 28
const SongTool = ({ onHandlePlayer }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [Bottom, setBottom] = useState('50px')
    const song = useSelector(selectSong)
    const time = useSelector(selectSongTime)
    const palyer = useSelector(selectPlayer)
    const progBar = useRef()
    useEffect(() => {
        const roll = ['musiclist', 'songlist']
        const { pathname } = location
        roll.forEach(el => {
            if (roll.includes(pathname.split('/')[1])) {
                setBottom('0px')
            } else {
                setBottom('50px')
            }
        })
    }, [location])
    const toggle = (e) => {
        e.stopPropagation()
        dispatch(updataPlayerStatus(palyer === 1 ? 2 : 1))
    }
    const HandlePlayer = (e) => {
        onHandlePlayer()
    }
    const playList = (e) => {
        e.stopPropagation()
        eventBus.emit('showPop', true)
    }
    return (
        <SongBar bg={singlecover} play={palyer} b={Bottom} onClick={(e) => { HandlePlayer(e) }}>
            {
                song ? <div className="songinfo">
                    <div className="singlecover">
                        <img src={song?.al?.picUrl} alt="" />
                    </div>
                    <div className="info">
                        <span className="name">{song?.name}</span> -&nbsp;
                        {
                            song?.ar.map((el, i) => {
                                return (
                                    <span className='art' key={i}>{el.name}/</span>
                                )
                            })
                        }
                    </div>
                    <div className="tool">
                        <ProgressCircle ref={progBar} onClick={e => { toggle(e) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" id="mySvg">
                                <circle className="progress-background" cx="50%" cy="50%" r="50%" fill="transparent" />
                                <circle
                                    className="progress-bar"
                                    cx="50%"
                                    cy="50%"
                                    r="50%"
                                    fill="transparent"
                                    strokeDasharray={circleWidth}
                                    strokeDashoffset={time}
                                />
                            </svg>
                            {palyer === 1 ? <PauseRound className='play' /> : <PlayArrowRound className='play' />}

                        </ProgressCircle>
                        <PlaylistPlayRound className='list' onClick={(e) => { playList(e) }} />
                    </div >
                </div> : null
            }

        </SongBar >
    )
}
export default SongTool