import styled from 'styled-components'
import { RenderContainer, RenderTitle } from '/@/assets/style/index'
const CalendarRender = styled(RenderContainer)``
const CalendarTitle = styled(RenderTitle)``
const CalendarItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
justify-content: space-between;
.title{
    font-size:var(--size14);
}
.time{
    span{
        font-size:var(--size12);
        color:var(--fontColor);
        &:last-child{
            color:#db1c1c;
            margin-left: 6px;
        }
    }
}
img{
    width:50px;
    height:50px;
    border-radius: 5px;
}
`
export {
    CalendarItem,
    CalendarTitle,
    CalendarRender
}