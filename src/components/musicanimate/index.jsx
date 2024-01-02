import React from "react";
import { RenderMusic } from './css'
import { useSelector } from 'react-redux'
import { selectPlayer, selectSong } from '/@/redux/song'
import paly from '../../assets/img/play.png'

const MusicAnimite = ({ propsId }) => {
    const isplayer = useSelector(selectPlayer)
    const song = useSelector(selectSong)
    return (
        !(song?.id === propsId.id && isplayer === 1) ?
            <RenderMusic>
                <img src={paly} alt="" />
            </RenderMusic>
            :
            <RenderMusic>
                <div className="m1"></div>
                <div className="m2"></div>
                <div className="m3"></div>
            </RenderMusic>

    )
}
export default MusicAnimite