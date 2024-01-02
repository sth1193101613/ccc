import React from 'react'
import { CalendarRender, CalendarTitle, CalendarItem } from './css'
import dayjs from 'dayjs'

const Calendar = ({ title, data }) => {
    return (
        <CalendarRender>
            <CalendarTitle>
                <span className='title'>{title}</span>
                <span className='more'>更多</span>
            </CalendarTitle>
            {
                data.map((el: { offlineTime: number; tag: string; title: string; imgUrl: string }, index: React.Key) => {
                    return (
                        <CalendarItem key={index}>
                            <div>
                                <p className='time'><span>{dayjs(el.offlineTime).format('MM/DD')}</span><span>{el.tag}</span></p>
                                <p className='title'>{el.title}</p>
                            </div>
                            <div>
                                <img src={el.imgUrl} />
                            </div>
                        </CalendarItem>
                    )
                })
            }
        </CalendarRender>
    )
}
export default Calendar