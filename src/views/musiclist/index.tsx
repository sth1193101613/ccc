import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import { getPlayListDetail, getPlaylistTrackAll } from '../../api/song'
import { RenderSong, RenderBar, RestMask, RestEllipsis, RestDivider, RenderTags, RestNoticeBar, RenderInput } from './css'
import { getMainColor, colorChange, rgbToRgba } from '/@/utils/index'
import { ArrowBackSharp, SearchOutlined, NotStartedRound } from '@ricons/material'
import { debounce } from '/@/utils/tool'
import { Icon } from '@ricons/utils'
import { updataPlayerStatus, updataSong, updataSongList } from '/@/redux/song'
import { useAppDispatch } from '/@/redux/useReduxHook'
import { listType, dateilType } from './types'
import FixedSizeList from '../../components/virtualList'
import { useActivate, useUnactivate } from 'react-activation'
import storage from '/@/utils/storage'

const SongList = () => {
    const dispatch = useAppDispatch()
    const [detail, setDetail] = useState<dateilType>(null)
    const [visible, setVisible] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    const [list, setList] = useState<listType[]>([])
    const [searchList, setSearchList] = useState<listType[]>([])
    const [opc, setOpc] = useState<string>('')
    const [ccolor, setCcolor] = useState<string>('')
    const [notice, setNotice] = useState<string>('')
    const [top, setTop] = useState<number>(0)
    const navigate = useNavigate()
    const [serachStatus, setStatus] = useState<boolean>(true)
    const [listHeight, setHeight] = useState<number>(0)
    const headRef = useRef<HTMLDivElement>()
    useUnactivate(() => {
        setList([])
        setDetail(null)
        setCcolor('rgba(0, 0, 0,.9)')
    })
    useActivate(() => {
        const id = storage.get('MUSIC_ID')
        _getPlayListDetail(id)
        _getPlaylistTrackAll(id)
    })
    // useEffect(() => {
    //     const id = storage.get('MUSIC_ID')
    //     _getPlayListDetail(id)
    //     _getPlaylistTrackAll(id)
    // },[])
    const _getPlayListDetail = async (id) => {
        const { playlist } = await getPlayListDetail({ id })
        setDetail(playlist)
    }
    const _getPlaylistTrackAll = async (id) => {
        const { songs } = await getPlaylistTrackAll({ id })
        setList(songs)
    }
    const onHandleMenu = () => {
        if (serachStatus) {
            navigate(-1)
        } else {
            setStatus(true)
            setSearchList([])
        }
        const reset = document.querySelector('.songhead') as HTMLElement
        reset.style.background = 'rgba(0, 0, 0,.9)'
    }
    const handlePop = () => {
        setVisible(true)
    }
    const CustomTag = () => {
        return (
            <>
                {
                    detail?.tags.map((el, index) => {
                        return (
                            <RenderTags key={index} className='tag'>{el}</RenderTags>
                        )
                    })
                }
            </>
        )
    }
    const CustomColor = () => {
        return (
            <RestMask
                visible={visible}
                onMaskClick={() => setVisible(false)}
                color={color}>
                <img src={detail?.coverImgUrl} className='coverImgUrl' />
                <p className='act'>{detail?.name}</p>
                <RestDivider />
                <span className='ts'>标签:</span><CustomTag />
                <p className='description' dangerouslySetInnerHTML={{ __html: detail?.description?.replace('/n', '<br/>') }}></p>
            </RestMask>
        )
    }
    const scrollChange = useCallback(() => {
        if (!headRef.current) return false
        const scrollTop = document.body.scrollTop
        const context = getComputedStyle(headRef.current, null).getPropertyValue("background-color")
        const teep = 200
        const opacity = Math.min(scrollTop, teep) / teep
        const contRgba = rgbToRgba(context, opacity)
        setTop(scrollTop)
        setOpc(contRgba)
    }, [top])
    const onHandleSong = (el) => {
        dispatch(updataPlayerStatus(1))
        dispatch(updataSong(el))
        dispatch(updataSongList(list))
    }
    const getAnalyze = (res: string) => {
        if (res === 'rgb(77,77,75)') {
            setCcolor('rgb(99, 99, 97)')
        } else {
            const context = res.replace('rgba(', '').replace(')', '').split(',')
            setCcolor(colorChange(parseInt(context[0]), parseInt(context[1]), parseInt(context[2])))
        }
    }
    const searchMusic = () => {
        setStatus(false)
    }
    const changeInput = (val: any) => {
        const value = val.target.value
        const fileterList = list.filter(el => el.name.includes(value))
        setSearchList(fileterList)
    }
    useEffect(() => {
        top > 50 ? setNotice(detail.name) : setNotice('歌单')
    }, [top, detail])
    useEffect(() => {
        const head = document.querySelector('.songhead')
        head && getMainColor([head], 1).then(res => {
            setColor(res)
            getAnalyze(res)
        })
        return () => {
            setColor('rgba(0, 0, 0,.9)')
        }
    }, [detail])
    useEffect(() => {
        const h = document.documentElement.clientHeight
        setHeight(h - 240)
    },[0])
    useEffect(() => {
        window.addEventListener('scroll', debounce(scrollChange, 15, 20), true)
        return () => {
            window.removeEventListener('scroll', debounce(scrollChange, 15, 20))
        }
    }, [scrollChange])
    const Item = ({ index }) => {
        return (
            <div key={index} className="lname" onClick={() => { onHandleSong(list[index]) }}>
                <span className='ind'>{index + 1}</span>
                <div>
                    <p className='name'>{list[index].name}</p>
                    <p>
                        {
                            list[index].ar.map((el, i) => {
                                return (
                                    <span className='art' key={i}>{el.name}/</span>
                                )
                            })
                        } - <span className='art'>{list[index].al.name}</span>
                    </p>
                </div>
            </div>
        )
    }
    return (
        <>
            <RenderBar style={{ background: opc }}>
                <Icon color={'#fff'} size={24}>
                    <ArrowBackSharp onClick={() => { onHandleMenu() }} />
                </Icon>
                {
                    serachStatus ? <RestNoticeBar content={detail?.name} icon={null} /> : <RenderInput onInput={changeInput} />
                }

                <Icon color={'#fff'} size={24}>
                    <SearchOutlined onClick={() => { searchMusic() }} />
                </Icon>
            </RenderBar>

            <RenderSong className='songContext'>
                <div className='songhead' ref={headRef}>
                    <div className='songtop'>
                        <div className="bg">
                            <img src={detail?.coverImgUrl} alt="" className="imgStyle" onClick={() => { handlePop() }} />
                        </div>
                        <div className='context'>
                            <p className='name'>{detail?.name}</p>
                            <p className='avt'><img src={detail?.creator.avatarUrl} className="avturl" /><span className='avtname'>{detail?.creator.nickname}</span></p>
                            <RestEllipsis className='description' rows={1} content={detail?.description || ''} onClick={() => { handlePop() }}></RestEllipsis>
                        </div>
                    </div>
                </div>
                <div className='songbody' style={{ background: ccolor }}>
                    <div className="playlist">
                        <Icon color={'#fff'} size={24}><NotStartedRound /></Icon>
                        <div>
                            <span className='pl'>播放全部</span>
                            <span className='num'>({list.length})</span>
                        </div>
                    </div>
                    <FixedSizeList
                        containerHeight={listHeight}
                        itemCount={list.length}
                        itemHeight={50}
                    >
                        {Item}
                    </FixedSizeList>
                </div>
            </RenderSong>


            <CustomColor />
        </>
    )
}
export default SongList