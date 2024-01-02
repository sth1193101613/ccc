import { NoticeBar, Tabs, Swiper, DotLoading, Mask } from 'antd-mobile'
import styled from 'styled-components'
import { ReadMoreFilled } from '@ricons/material'

type Props = {
    ref?: any
    img?: any
    index?: number
    style?: any
    offset?: number | string
}

const SongList = styled.div`
background: var(--cardColor);
`
const SongBar = styled.div`
position: fixed;
top: 0;
right: 0;
left: 0;
z-index: 1;
background:var(--cardColor);
`
const SongHead = styled(NoticeBar)`
background:var(--cardColor);
border: 0;
position: fixed;
left: 0;
right: 0;
top: 0;
z-index: 1;
.adm-notice-bar-left{
    width:20px;
    svg{
        display: block;
    }
}
`
const SongCustom = styled.div`
display: flex;
align-items: center;
margin-top: 40px;
`
const SongTab = styled(Tabs)`
flex: 1;
.adm-tabs-tab-list{
}
.adm-tabs-tab-line{
    background:red;
}
.adm-tabs-tab{
    color:rgb(139,141,140);
    &.adm-tabs-tab-active{
        color:var(--whiteColor);
    }
}
.adm-tabs-header{
    border-bottom:0px;
}
.adm-tabs-header-mask-left{
    background:transparent;
}
.adm-tabs-header-mask-right {
    background:transparent;
}
`
const RestFilled = styled(ReadMoreFilled)`
width: 25px;
margin: 0 12px;
`
const SonsSwiper = styled(Swiper)`
margin-top: 77px;
min-height:100vh;
padding-bottom: 40px;
padding-top: 10px;
.adm-swiper-item{
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(3, auto);
    text-align: center;
    padding: 0 15px;
    img{
        width:110px;
        height:110px;
        border-radius: 8px;
    }
    .name{
        text-align: left;
        font-size:var(--size12);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
        margin: 5px 0 8px;
        line-height: 1.5;
        width: 100px;
    }
}
`
const SonsLoading = styled(DotLoading)`
display: inline-block;
position: absolute;
left: 50%;
transform: translateX(-50%);
`
const MaskList = styled.div<Props>`
padding: 0 15px;
h5{
    margin:15px 0;
    height:20px;
}
.tag{
    position: relative;
}

`
const MaskTag = styled.span<Props>`
    background: rgba(255,255,255,.1);
    padding-left: 20px;
    height: 25px;
    line-height: 25px;
    border-radius: 20px;
    width: 78px;
    font-size:var(--size12);
    background-size: 15px 15px;
    background-repeat: no-repeat;
    background-position: 5px center;
    background-image:url(${props => props.img});
    position: absolute;
    left:${props => 78 * ((props.index) % 4) + Number(props.offset)}px;
    top:${props => Math.floor((props.index / 4)) * 35}px;
    transition: top .4s,left .4s;
    overflow: hidden;

`
const RestMask = styled(Mask)`
overflow-y: scroll;
overflow-x: hidden;

`
export {
    SongHead,
    SongTab,
    SongCustom,
    RestFilled,
    SongBar,
    SonsSwiper,
    SongList,
    SonsLoading,
    MaskList,
    RestMask,
    MaskTag
}
