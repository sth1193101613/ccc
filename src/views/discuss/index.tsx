import React, { useState, useRef, useEffect } from 'react'
import { SongHead, RestMask, DissRender, RestList } from './css'
import { ArrowBackRound } from '@ricons/material'
import { useNavigate } from "react-router-dom"
import { Image, List, Divider, InfiniteScroll } from 'antd-mobile'
import { getCommentMusic } from '/@/api/song'
import { useAppSelector } from '../../redux/useReduxHook'
import { selectSong } from '../../redux/song'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
const Discuss = () => {
    const [page, setPage] = useState(1)
    const loaderRef = useRef()
    const navigate = useNavigate()
    const song = useAppSelector(selectSong)
    const [discuss, setDiscuss] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const onHandleMenu = () => {
        navigate(-1)
    }
    const [visible, setVisible] = useState(true)
    const loadMore = async (num: number) => {
        const result = await getCommentMusic({ id: song?.id, pageNo: num, type: 0, sortType: 2, pageSize: 20 })
        setDiscuss((val: any) => [...val, ...result.data.comments])
        setHasMore(result.data.comments.length > 0)
    }
    useInfiniteScroll({ loaderRef, loadMore, page })
    return (
        <>
            <RestMask visible={visible} onMaskClick={() => setVisible(false)} opacity={1} color='var(--cardColor)'>
                <SongHead content={'评论'} icon={<ArrowBackRound onClick={() => { onHandleMenu() }} />} />
                <DissRender>
                    {/* 评论区 */}
                    <>
                        <RestList>
                            {

                                discuss.map((el, index) => {
                                    return (
                                        <List.Item key={index} prefix={
                                            <Image src={el?.user?.avatarUrl}
                                                style={{ borderRadius: 20 }}
                                                fit='cover'
                                                width={35}
                                                height={35}></Image>
                                        }>
                                            <div>
                                                <div className='head'>
                                                    <div>
                                                        <p className='name'>{el.user.nickname}</p>
                                                        <p className='location'>{el.timeStr}{el.ipLocation.location}</p>
                                                    </div>
                                                    <div>
                                                        <p className='name'>{el.likedCount}</p>
                                                    </div>
                                                </div>
                                                <p className='content'>{el.content}</p>
                                            </div>
                                            <Divider style={{ borderColor: 'rgb(43, 41, 41)' }} />
                                        </List.Item>
                                    )
                                })
                            }
                        </RestList>
                        <div ref={loaderRef} >
                            <InfiniteScroll loadMore={() => void (0)} hasMore={hasMore} />
                        </div>
                    </>
                </DissRender>
            </RestMask>
        </>
    )
}

export default Discuss