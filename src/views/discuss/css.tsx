import { NoticeBar, Mask, List } from 'antd-mobile'
import styled from 'styled-components'

const DissRender = styled.div`
padding: 50px 15px 0;
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
const RestMask = styled(Mask)`
overflow-y: scroll;
overflow-x: hidden;
`
const RestList = styled(List)`
.adm-list-body{
    background: transparent;
    border-top:none;
    margin-top: 20px;
    border-bottom:none;
}
.adm-list-item{
    background-color:transparent;
    padding-left:0;
}
.adm-list-item-content{
    border-top:#ccc;
    align-items: flex-start;
}
.adm-list-item-content-main{
    padding:0;
}
.content{
    font-size:var(--size16);
    padding-top: 10px;
}
.location{
    font-size:var(--size12);
    color:rgb(182, 182, 182);
}
.head{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`
export {
    SongHead,
    RestMask,
    RestList,
    DissRender
}