import React, { useEffect, useRef, useState } from 'react'
import { SongHead, SongTab, SongCustom, RestFilled, SongBar, SonsSwiper, SongList, SonsLoading, MaskList, RestMask, MaskTag } from './css'
import { ArrowBackRound } from '@ricons/material'
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '/@/redux/useReduxHook'
import { selecMusicTab, selecSongList, updataSongList, selecTagList, updataTagList, updataTab, updataTabStatus } from '/@/redux/music'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import { getTopPlaylist, getCatlist } from '../../api/songlist'
import ImageLazy from '/@/components/ImageLazy'
import add from '/@/assets/img/add.png'
import remove from '/@/assets/img/remove.png'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import storage from '/@/utils/storage'
import './style.css'

const cateMap = { 0: "语种", 1: "风格", 2: "场景", 3: "情感", 4: "主题" }
const Song = () => {
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const swiperRef = useRef<SwiperRef>(null)
    const tagRef = useRef<HTMLDivElement>(null)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [activeName, setActiveName] = useState<string>('华语')
    const musicList = useAppSelector(selecMusicTab)
    const songList = useAppSelector(selecSongList)
    const tagList = useAppSelector(selecTagList)
    const [visible, setVisible] = useState(false)
    const maskRef = useRef<HTMLDivElement>()
    const [status, setStatus] = useState(false)
    const dispatch = useAppDispatch()
    const onHandleMenu = () => {
        navigate(-1)
    }
    const onHandleScroll = async (key: string) => {
        const index = musicList.findIndex((item) => item.name === key)
        setActiveName(key)
        setActiveIndex(index)
        swiperRef.current?.swipeTo(index)
    }
    const onHandleSwiper = (index: number) => {
        const curr = musicList[index]
        setActiveName(curr.name)
        setActiveIndex(index)
    }
    const getRelaList = async () => {
        if (songList[activeName]?.length > 0) return false
        setLoading(true)
        const { playlists } = await getTopPlaylist({ cat: activeName })
        dispatch(updataSongList({
            type: activeName,
            data: playlists
        }))
        setLoading(false)
    }
    const nodereplace = ({ name, parentName }) => {
        if (musicList.length <= 4) return false
        const newTab = JSON.parse(JSON.stringify(tagList))
        newTab.forEach((ele: { data: any[], name: string }) => {
            if (ele.name === parentName) {
                ele.data.push({
                    name
                })
            }
        })
        dispatch(updataTagList(newTab))
        dispatch(updataTab({ name, parentName }))
    }
    const cloneNodes = ({ name, parentName }) => {
        const newTab = JSON.parse(JSON.stringify(tagList))
        newTab.forEach((ele: { data: any[] }) => {
            ele.data = ele.data.filter((item: { name: string }) => item.name !== name)
        })
        dispatch(updataSongList({
            type: name,
            data: []
        }))
        dispatch(updataTagList(newTab))
        dispatch(updataTab({ name, parentName, show: false }))
    }
    const changeEdit = () => {
        // const newTab = JSON.parse(JSON.stringify(tagList))
        // newTab.forEach((ele: { data: any[] }) => {
        //     ele.data = ele.data.filter((item: { name: string }) => item.name !== name)
        // })
        // dispatch(updataTagList(newTab))
        // dispatch(updataTab({ name, parentName }))
    }
    const onExiting = (e) => {
        const top = e.parentNode.parentNode.offsetTop //外层距离顶部距离
        const len = musicList.length
        const tlen = (len + 1) / 4 > 2 ? (Math.floor((len + 1) / 4) - 1) * 35 : 0
        e.style.top = -(top - (50 + tlen)) + 'px'
        e.style.left = 78 * ((len) % 4) + Number(`${len % 4}0`) + 'px'

    }
    const onExited = (e) => {
        e.style.transition  ='none'
        dispatch(updataTabStatus())

        // const top = e.parentNode.parentNode.offsetTop //外层距离顶部距离
        // const len = musicList.length
        // const tlen = len / 4 > 2 ? (Math.floor(len / 4) - 1) * 35 : 0
        // e.style.top = -(top - (90 + tlen)) + 'px'
        // e.style.left = 78 * ((len) % 4) + Number(`${len % 4}0`) + 'px'
    }
    const onEnter = (e) => {

    }
    const onEntering = (e) => {

    }
    const getTags = async () => {
        if (tagList.length !== 0) return false
        const { sub } = await getCatlist({})
        let arr = []
        sub.forEach((ele: { name: string, category: number }) => {
            let has = arr.findIndex(o => o.category === ele.category)
            if (has == -1) {
                arr.push({
                    category: ele.category,
                    name: cateMap[ele.category],
                    data: []
                })
            } else {
                const copyList = musicList.map(el => el.name)
                if (!copyList.includes(ele.name)) {
                    arr[has].data.push(ele)
                }
            }
        })
        dispatch(updataTagList(arr))
    }
    const goToSongList = (e: number) => {
        storage.set('MUSIC_ID', e + '')
        navigate(`/musiclist?id=${e}`)
    }
    useEffect(() => {
        document.body.scrollTop = 0
        getRelaList()
    }, [activeName])
    useEffect(() => {
        getTags()
    }, [])
    return (
        <SongList>
            <SongBar>
                <SongHead content={'歌单广场'} icon={<ArrowBackRound onClick={() => { onHandleMenu() }} />} />
                <SongCustom>
                    <SongTab
                        activeKey={musicList[activeIndex].name}
                        activeLineMode='fixed' style={{
                            '--fixed-active-line-width': '15px',
                            '--title-font-size': 'var(--size14)',
                        }}
                        onChange={key => { onHandleScroll(key) }}>
                        {
                            musicList.map((item) => {
                                return (
                                    <SongTab.Tab title={item.name} key={item.name}></SongTab.Tab>
                                )
                            })
                        }
                    </SongTab>
                    <RestFilled onClick={() => { setVisible(true) }} />
                </SongCustom>
            </SongBar>
            <SonsSwiper
                className='swipers'
                direction='horizontal'
                indicator={() => null}
                ref={swiperRef}
                onIndexChange={index => {
                    onHandleSwiper(index)
                }}
            >
                {
                    Object.keys(songList).map((item) => {
                        return (
                            <SonsSwiper.Item key={item}>
                                {isLoading ? <SonsLoading color='#ff3141' /> : null}
                                {
                                    songList[item].map((el: { id: number; coverImgUrl: string; name: string }) => {
                                        return (
                                            <div key={el.id} onClick={() => { goToSongList(el.id) }}>
                                                <ImageLazy src={el.coverImgUrl} />
                                                <p className='name'>{el.name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </SonsSwiper.Item>
                        )
                    })
                }
            </SonsSwiper>
            <RestMask visible={visible} onMaskClick={() => setVisible(false)} opacity={1} color='var(--cardColor)'>
                <>
                    <SongHead content={'我的歌单'} icon={<ArrowBackRound onClick={() => { setVisible(false) }} />} extra={
                        <span>编辑</span>
                    } />
                    <MaskList>
                        <div>
                            <h5>我的歌单广场</h5>
                            <div className='tag' ref={tagRef} style={{ height: (Math.ceil(musicList.length / 4)) * 35 + 'px' }}>
                                <TransitionGroup component={null}>
                                    {
                                        musicList.map((item, index) => {
                                            return (
                                                <CSSTransition
                                                    onEnter={(e) => { onEnter(e) }}
                                                    onEntering={(e) => { onEntering(e) }}
                                                    key={item.name}
                                                    timeout={400}>
                                                    <MaskTag
                                                        style={{ opacity: item.show ? 1 : 0 }}
                                                        index={index}
                                                        offset={`${index % 4}0`}
                                                        key={item.name}
                                                        onClick={(e) => nodereplace(item)} img={status ? remove : ''}>
                                                        {item.name}
                                                    </MaskTag>
                                                </CSSTransition>
                                            )
                                        })
                                    }
                                </TransitionGroup>
                            </div>
                        </div>
                    </MaskList>
                    <MaskList ref={maskRef}>
                        {
                            tagList.map(el => {
                                return (
                                    <div key={el.name} style={{ height: (el.data.length / 4) * 45 + 10 + 'px' }}>
                                        <h5>{el.name}</h5>
                                        <div className='tag' data-attr={el.name} >
                                            <TransitionGroup component={null}>
                                                {
                                                    el.data.map((item: { name: string }, index: number) => {
                                                        return (
                                                            <CSSTransition
                                                                onExited={(e) => { onExited(e) }}
                                                                onExiting={(e) => { onExiting(e) }}
                                                                key={item.name}
                                                                timeout={400}>
                                                                <MaskTag key={item.name}
                                                                    offset={`${index % 4}0`}
                                                                    index={index}
                                                                    onClick={(e) => { cloneNodes({ name: item.name, parentName: el.name }) }} img={status ? add : ''}>
                                                                    {item.name}
                                                                </MaskTag>
                                                            </CSSTransition>
                                                        )
                                                    })
                                                }
                                            </TransitionGroup>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </MaskList>
                </>
            </RestMask>
        </SongList >
    )
}
export default Song