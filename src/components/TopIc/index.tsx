import React, { useEffect } from 'react'
import { TopicRerner, TopicTitle, TocWarp, TocItem } from './css'
import { getMainColor } from '../../utils/index'
import { Swiper } from 'antd-mobile'
import { Skeleton } from 'antd-mobile'

const TocList = ({ title, data }) => {
    useEffect(() => {
        getMainColor(document.querySelectorAll('.gradeImage'), .7)
    }, [data])
    return (
        <TopicRerner>
            {
                data.length === 0 ? <Skeleton.Paragraph lineCount={3} animated /> :
                    <>
                        <TopicTitle>
                            <span className='title'>{title}</span>
                            <span className='more'>更多</span>
                        </TopicTitle>
                        <TocWarp className='cardContent'>
                            <Swiper trackOffset={0} slideSize={95} stuckAtBoundary={false}>
                                {
                                    data.map((el: { title: string; text: any[]; sharePicUrl: string }, index: React.Key) => {
                                        return (
                                            <Swiper.Item key={index}>
                                                <TocItem className="gradeImage">
                                                    <span>{el.title}</span>
                                                    <div>
                                                        {
                                                            el.text.map((el, i) => {
                                                                return (
                                                                    <p key={i}>{el}</p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <img src={el.sharePicUrl} crossOrigin="anonymous" className='imgStyle' />
                                                </TocItem>
                                            </Swiper.Item>
                                        )
                                    })
                                }
                            </Swiper>
                        </TocWarp>
                    </>
            }

        </TopicRerner>
    )
}
export default TocList