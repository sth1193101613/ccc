import React, { } from 'react'
import { createPortal } from 'react-dom'
import { RestPop } from './css'
import { selectSongList, selectSong } from '/@/redux/song'
import { useSelector } from 'react-redux'
import { ClearOutlined } from '@ricons/material'
import { useEffect } from 'react'

const PlayList = ({ show, onHandleHideMask }) => {
    const songList = useSelector(selectSongList)
    const isSong = useSelector(selectSong)
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                const idx = songList.findIndex(el => el.id === isSong.id)
                const playDom = document.querySelector('.songlist')
                playDom.scrollTop = idx * 35
            }, 20)
        }
    }, [isSong, show])
    const createPop = () => {
        return (
            <RestPop
                className="pop"
                maskStyle={{ background: 'rgba(0, 0, 0, 0.35)' }}
                visible={show}
                onMaskClick={() => { onHandleHideMask(false) }}
                bodyStyle={{ height: '40vh' }}
            >
                <div className='songhead'>
                    当前播放({songList.length})
                </div>
                <ul className='songlist'>
                    {
                        songList.map((el, index) => {
                            return (
                                <li className='list' key={index}>
                                    <div className='conent'>
                                        <span className='sname' style={{ color: el.id === isSong?.id ? '#db1c1c' : 'var(--whiteColor)' }}>{el.name} - </span>
                                        {
                                            el.ar.map((i, idx) => {
                                                return (
                                                    <span key={idx} className='arname' style={{ color: el.id === isSong?.id ? '#db1c1c' : 'var(--fontColor)' }}>{i.name}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <ClearOutlined className='clear' />
                                </li>
                            )
                        })
                    }
                </ul>
            </RestPop>
        )
    }
    return (
        createPortal(createPop(), document.body)
    )
}

export default PlayList