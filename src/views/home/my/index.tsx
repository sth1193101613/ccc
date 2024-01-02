import React, { useState, useEffect, useRef } from "react";
import { MyContext, MyInfo, PlayNav } from './css'
import { useAppSelector } from '/@/redux/useReduxHook'
import { selectUser } from '/@/redux/user'
import { getPlaylist } from '/@/api/song'
import { debounce } from '/@/utils/tool'
import { useNavigate } from 'react-router-dom'
import { listType, userType, likeType } from '/@/types'
import storage from '/@/utils/storage'

const playNavList: Array<string> = ['创建歌单', '收藏歌单']
const My = () => {
    const userInfo: { data: userType } = useAppSelector(selectUser)
    const [list, setList] = useState<listType[]>([])
    const [like, setLike] = useState<likeType>(null)
    const [isName, setName] = useState<string>('创建歌单')
    const navRef = useRef<HTMLDivElement>()
    const creator = useRef<HTMLDivElement>()
    const contextRef = useRef<HTMLDivElement>()
    const navigate = useNavigate()
    const _getPlaylist = async () => {
        const { playlist } = await getPlaylist({ uid: userInfo?.data?.userId })
        setLike(playlist[0])
        setList(playlist.filter((_el: likeType, index: number) => index !== 0))
    }
    const handleNav = (e: string) => {
        setName(e)
        const { top } = getScrollTop(e)
        const clineTop = document.body.scrollTop + top
        document.body.scrollTo({
            top: clineTop,
            behavior: 'smooth'
        })
    }
    const getScrollTop = (e: string) => {
        const queyrList = document.querySelectorAll<HTMLElement>('.song')
        let top: number = 0
        queyrList.forEach(el => {
            if (el.dataset.name === e) {
                top = el.getBoundingClientRect().top - 80
            }
        })
        return {
            top
        }
    }
    const scrollChange = () => {
        const bottom = creator?.current?.getBoundingClientRect().bottom
        bottom - 80 < 0 ? setName('收藏歌单') : setName('创建歌单')
    }
    const goToSongList = (e: number) => {
        storage.set('MUSIC_ID', e + '')
        navigate(`/musiclist?id=${e}`)
    }
    useEffect(() => {
        _getPlaylist()
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', debounce(scrollChange, 15, 20), true)
        return () => {
            window.removeEventListener('scroll', debounce(scrollChange, 15, 20))
        }
    }, [])
    return (
        <MyContext ref={contextRef}>
            {
                 !userInfo? <></> :
                    <>
                        <MyInfo>
                            <img src={userInfo.data.avatarUrl} className='avt' alt="" />
                            <div className="info">
                                <p>{userInfo.data.nickname}</p>
                                <div className="foll">
                                    <span>{userInfo.data.follows}关注</span>
                                    <span>{userInfo.data.followeds}粉丝</span>
                                    <span>Lv.9</span>
                                </div>
                            </div>
                        </MyInfo>
                        <MyInfo>
                            {like ? <div className='like' onClick={() => { goToSongList(like.id) }}>
                                <img src={like.coverImgUrl} alt="" />
                                <div className="text">
                                    <p>我喜欢的音乐</p>
                                    <span>{like.trackCount}首,by{like.name}</span>
                                </div>
                            </div> : null}
                        </MyInfo>
                        <PlayNav ref={navRef} val={isName}>
                            {
                                playNavList.map((el, index) => {
                                    return (
                                        <div key={index} style={{ color: isName === el ? '#fff' : '' }} className='navname' onClick={() => { handleNav(el) }}>{el}</div>
                                    )
                                })
                            }
                        </PlayNav>
                        <MyInfo data-name={'创建歌单'} className='song' ref={creator}>
                            {
                                list.map((el, index) => {
                                    if (!el.ordered) {
                                        return (
                                            <div className='like line' key={index} data-key={el.ordered} onClick={() => { goToSongList(el.id) }}>
                                                <img src={el.coverImgUrl} alt="" />
                                                <div className="text">
                                                    <p>{el.name || '我喜欢的音乐'}</p>
                                                    <span>{el.trackCount}首, by{like.creator.nickname}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </MyInfo>
                        <MyInfo data-name={'收藏歌单'} className='song'>
                            {
                                list.map((el, index) => {
                                    if (el.ordered) {
                                        return (
                                            <div className='like line' key={index} data-key={el.ordered} onClick={() => { goToSongList(el.id) }}>
                                                <img src={el.coverImgUrl} alt="" />
                                                <div className="text">
                                                    <p>{el.name}</p>
                                                    <span>{el.trackCount}首, by{like.creator.nickname}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </MyInfo>
                    </>
            }

        </MyContext >
    )
}
export default My