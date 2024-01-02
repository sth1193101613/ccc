import styled from 'styled-components'
import { Props } from '/@/types'

const MyContext = styled.div`
background: var(--cardColor);
padding-bottom: 165px;
padding-top:30px;
`

const MyInfoRest = styled.div`
background: rgb(43,43,43);
border-radius: 10px;
margin: 20px;
position: relative;
padding:20px;
`
const MyInfo = styled(MyInfoRest)`
.info{
    margin-top:15px;
    p{
        text-align: center;
        color: #fff;
        font-size:var(--size16);
    }
    .foll{
        text-align: center;
        span{
            font-size:var(--size12);
            display: inline-block;
            vertical-align: middle;
            margin: 0 10px;
        }
    }
}
.avt{
    width:50px;
    height:50px;
    border-radius: 50%;
    position: absolute;
    top: -50%;
    margin-top: 25px;
    left: 50%;
    margin-left: -25px;

}
.like{
    display: flex;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
        border-radius: 8px;    
    }
    .text{
        margin-left:10px;
        p{
            color:#fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            font-size: 12px;
        }
        span{
            color:#d6d6d6;
            font-size:11px;
        }
    }
    &.line{
        margin-bottom:15px;
        &:last-child{
            margin:0;
        }
    }
}
`
const PlayNav = styled.div<Props>`
text-align: center;
display: flex;
align-items: center;
padding:0 20px;
justify-content: space-around;
background:var(--cardColor);
height: 35px;
line-height: 35px;
position: sticky;
top:44px;
z-index:1;
&::after{
    content: '';
    position: absolute;
    width: 15px;
    height: 2px;
    background: red;
    bottom: 3px;
    transform: translate3d(${props => props.val === '创建歌单' ? '-85px' : '85px'}, 0px, 0px);
    transition: .5s all;
}
.navname{
    color:rgb(182,182,182);
    &.active{
    color:#fff;
    }
}
&.fixed {
    top: 44px;
    z-index: 1;
  }
`
export {
    PlayNav,
    MyInfo,
    MyContext
}