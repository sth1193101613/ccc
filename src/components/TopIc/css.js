import styled from 'styled-components'
import { RenderContainer,RenderTitle } from '/@/assets/style/index'
const TopicRerner = styled(RenderContainer)`
.adm-swiper-indicator{
    display:none
}
`
const TopicTitle = styled(RenderTitle)``
const TocWarp = styled.div`
position: relative;
white-space: nowrap;
overflow: hidden;
`
const TocItem = styled.li`
    height:80px;
    position: relative;
    background:${props => props.color};
    overflow: hidden;
    width: 98%;
    border-radius: 5px;
    padding:12px;
    img{
        width: 70px;
        height: 70px;
        position: absolute;
        transform: rotateZ(20deg);
        right: -10px;
        top: 35%;
        margin-top: -15px;
        border-radius: 12px;
    }
    span{
        color:#fff;
    }
    div{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
        p{
            margin-right:60px;
            font-size:var(--size12);
           
        }
    }
`
export {
    TopicRerner,
    TopicTitle,
    TocWarp,
    TocItem
}