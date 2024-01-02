import React, { useEffect, useState } from "react";
import { banner, dragonball, personalized, recommend, hottopic, recommendsongs, newsong, calendars } from '/@/api/found'
import Swiper from '/@/components/swiper'
import { NavRender, NavItem, FoundRender } from './css'
import CardList from '/@/components/cardlist'
import TopIc from '/@/components/TopIc'
import SongList from '/@/components/songlist'
import Calendar from '/@/components/musicTime'
import { selectFound, updataList } from '/@/redux/found'
import { useAppSelector, useAppDispatch } from '/@/redux/useReduxHook'
import { sliceGroup, getRandomArrayElements } from '/@/utils/tool'
import { updataPlayerStatus, updataSong, updataSongList } from '/@/redux/song'
import Pull from '/@/components/pull'
import { useNavigate } from 'react-router-dom'
import storage from '/@/utils/storage'

const Found = () => {
    const dispatch = useAppDispatch()
    const [list, setList] = useState([])
    const [ball, setBall] = useState([])
    const [flag, setFlag] = useState<boolean>(false)
    const compontesList = useAppSelector(selectFound)
    const navigate = useNavigate()
    const interfenceIsFinish = (): Promise<boolean> => {
        return new Promise(resovle => {
            Promise.all([getAlized(), getRecommend(), getToc(), getSongs(), getNewsong(), getCalendars()]).then((res: any) => {
                resovle(true)
            })
        })
    }
    const getBanner = () => {
        return new Promise(resolve => {
            banner({ type: 1 }).then(res => {
                setList(res.banners)
                resolve(res.banners)
            })
        })
    }
    const getBall = () => {
        return new Promise(resolve => {
            dragonball().then(res => {
                setBall(res.data)
                resolve(res.data)
            })
        })
    }
    const getAlized = () => {
        return new Promise(resolve => {
            personalized({ limit: 6 }).then(res => {
                dispatch(updataList({
                    type: 'alize',
                    data: res.result
                }))
                resolve(0)
            })
        })
    }
    const getRecommend = () => {
        return new Promise(resolve => {
            recommend({ limit: 6 }).then(res => {
                dispatch(updataList({
                    type: 'recommend',
                    data: res.data.map((el: { cover: any; }) => ({ ...el, picUrl: el.cover })) ?? []
                }))
                resolve(0)
            })
        })
    }
    const getToc = () => {
        return new Promise(resolve => {
            if (storage.get('USER_TOKEN')) {
                hottopic({ limit: 5, offset: 25 }).then(res => {
                    console.log(res)
                    dispatch(updataList({
                        type: 'hot',
                        data: res.hot ?? []
                    }))
                    resolve(0)
                })
            } else {
                resolve(0)
            }
        })
    }
    const getSongs = () => {
        return new Promise(resolve => {
            if (storage.get('USER_TOKEN')) {
                recommendsongs({}).then(res => {
                    dispatch(updataList({
                        type: 'song',
                        data: res.data ? sliceGroup(getRandomArrayElements(res.data.dailySongs, 12), 3).slice(0, 4) : []
                    }))
                    resolve(0)
                })
            } else {
                resolve(0)
            }

        })
    }
    const getNewsong = () => {
        return new Promise(resolve => {
            newsong({
                limit: 21,
            }).then(res => {
                res.result = res.result.map(el => ({
                    ...el,
                    al: {
                        picUrl: el.picUrl,
                        name: el.name
                    },
                    ar: el.song.artists
                }))
                dispatch(updataList({
                    type: 'newsong',
                    data: sliceGroup(getRandomArrayElements(res.result, 12), 3).slice(0, 4)
                }))
                resolve(0)
            })
        })
    }
    const getCalendars = () => {
        return new Promise(resolve => {
            if (storage.get('USER_TOKEN')) {
                calendars({}).then(res => {
                    const { data: { calendarEvents } } = res
                    dispatch(updataList({
                        type: 'calendar',
                        data: calendarEvents
                    }))
                    resolve(0)
                })
            } else {
                resolve(0)
            }
        })
    }
    const onHandleSong = (el: any, list: any) => {
        dispatch(updataPlayerStatus(1))
        dispatch(updataSong(el))
        dispatch(updataSongList(list))
    }
    const onRefResDone = () => {
        
    }
    const handleNav = (item: any) => {
        const nameMap = new Map([
            ["歌单", '/songlist']
        ])
        navigate(nameMap.get(item.name))
    }
    const onToSongList = (e: { id: number }) => {
        storage.set('MUSIC_ID', e.id + '')
        navigate(`/musiclist?id=${e.id}`)
    }

    useEffect(() => {
        getBanner()
        getBall()
        interfenceIsFinish().then(res => {
            setFlag(res)
        })
    }, [])

    return (
        <>
            <FoundRender>
                <Pull onRefResDone={() => { onRefResDone() }} flag={flag}>
                    {
                        <Swiper value={list} />
                    }
                    <NavRender>
                        {
                            ball.map((item, index) => {
                                return (
                                    <NavItem onClick={() => { handleNav(item) }} key={index}>
                                        <div>
                                            <img src={item.iconUrl} alt="" />
                                        </div>
                                        <span>{item.name}</span>
                                    </NavItem>
                                )
                            })
                        }
                    </NavRender>
                    <canvas id='canvas' style={{ display: 'none', width: "200", height: "300" }}></canvas>
                    {
                        compontesList.map((el, index) => {
                            if (el.componte === 'CardList') {
                                return (
                                    <CardList title={el.title} key={index} data={el.list} isClass={el.className} onToSongList={onToSongList} />
                                )
                            }
                            if (el.componte === 'TopIc' && el.list.length > 0) {
                                return (
                                    <TopIc title={el.title} key={index} data={el.list} />
                                )
                            }
                            if (el.componte === 'SongList' && el.list.length > 0) {
                                return (
                                    <SongList title={el.title} key={index} data={el.list} onHandleSong={onHandleSong} />
                                )
                            }
                            if (el.componte === 'musicTime' && el.list.length > 0) {
                                return (
                                    <Calendar title={el.title} key={index} data={el.list} />
                                )
                            }
                        })
                    }
                </Pull>
            </FoundRender>
        </>

    )
}
export default Found