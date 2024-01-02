import React from 'react'
import { ToolRender, Tool, ToolImg, ToolRange } from './css'
import PlayCircle from '/@/assets/img/pl.png'
import SkipNext from '/@/assets/img/ne.png'
import Playlist from '/@/assets/img/plist.png'
import SkipPre from '/@/assets/img/back.png'
import PlayDx from '/@/assets/img/dq.png'
import PlayPa from '/@/assets/img/pa.png'
import Dessi from '/@/assets/img/dessi.png'
import { selectPlayer, updataPlayerStatus, selectDuration, selectcurrentTime, updataSongPre, updataSongNext, selectSong } from '/@/redux/song'
import eventBus from '/@/utils/event'
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../../redux/useReduxHook'
const pSize = 35
const PlayerTool = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const palyer = useAppSelector(selectPlayer)
    const duration = useAppSelector(selectDuration)
    const currentTime = useAppSelector(selectcurrentTime)
    const song = useAppSelector(selectSong)
    const toggleMusicType = (e) => {
        e.stopPropagation()
    }
    const toggle = (e) => {
        e.stopPropagation()
        dispatch(updataPlayerStatus(palyer === 1 ? 2 : 1))
    }
    const nextSong = (e) => {
        e.stopPropagation()
        dispatch(updataSongNext())
    }
    const preSong = (e) => {
        e.stopPropagation()
        dispatch(updataSongPre())
    }
    const playList = (e) => {
        e.stopPropagation()
        eventBus.emit('showPop', true)
    }
    const pushDiss = (e) => {
        e.stopPropagation()
        navigate('/discuss', { state: { id: song?.id } })
    }
    const changeSilder = e => {
        eventBus.emit('silderChange', e)
    }
    return (
        <ToolRender>
            <Tool>
                <ToolImg src={Dessi} onClick={e => { pushDiss(e) }} size={pSize} />
            </Tool>
            <ToolRange max={duration} value={currentTime} onAfterChange={changeSilder} />
            <Tool>
                <ToolImg src={PlayDx} onClick={e => { toggleMusicType(e) }} size={pSize} />
                <ToolImg src={SkipPre} size={pSize} onClick={e => { preSong(e) }} />
                <ToolImg src={palyer === 1 ? PlayPa : PlayCircle} size={pSize} onClick={e => { toggle(e) }} />
                <ToolImg src={SkipNext} size={pSize} onClick={e => { nextSong(e) }} />
                <ToolImg src={Playlist} size={pSize} onClick={e => { playList(e) }} />
            </Tool>
        </ToolRender>
    )
}
export default PlayerTool