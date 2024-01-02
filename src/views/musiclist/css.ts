import styled from 'styled-components'
import { Mask, Ellipsis, Divider, NoticeBar } from 'antd-mobile'
import { Props } from './types'
const RenderBar = styled.div<Props>`
height: 45px;
position: fixed;
left: 0;
right: 0;
display:flex;
align-items: center;
padding: 0 10px;
justify-content: space-between;
z-index:1;
background:${props => props.bg};
.xicon svg{
    width: 20px;
    height: 20px;
    display: block;
}
`
const RenderSong = styled.div`
.songhead{
    height:200px;
    padding: 0 15px;
    transition: .3s background;
    background:rgba(0, 0, 0,.9);
    .songtop{
        display: flex;
        padding-top: 55px;
    }
    .bg{
        width: 100px;
        height: 100px;
        img{
            width:100%;
            height:100%;
            border-radius: 10px;
        }
    }
    .context{
        margin-left: 10px;
        flex:1;
        .name{
            font-size:var(--size14);
            color: var(--whiteColor);
        }
        .avt{
            margin-top:5px;
            *{
                display: inline-block;
                vertical-align: middle;
            }
            .avturl{
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
            .avtname{
                padding-left: 5px;
                font-size:var(--size12);
            }
        }
    }
}
.songbody{
    border-radius: 15px 15px 0 0;
    position: relative;
    top: -12px;
    padding-bottom: 20px;
    background:rgba(0, 0, 0,.9);
    transition: .3s background;
    .playlist{
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        position: sticky;
        top: 45px;
        background: inherit;
        border-radius: 15px;
        .pl{
            font-size: var(--size14);
            color: var(--whiteColor);
        }
        .num{
            font-size: var(--size12);
        }
        .xicon{
            margin: 0 11px;
        }
        svg{
            width: auto;
            height: auto;
        }
    }
    .lname{
        padding: 10px 0;
        display:flex;
        align-items: center;
        .ind{
            width:50px;
            text-align: center;
        }
        .name{
            color:var(--whiteColor);
        }
        .art{
            font-size:var(--size12);
        }
    }
    
}
`
const RenderTags = styled.div`
    display: inline-block;
    color: #fff;
    font-size:var(--size12);
    padding: 2px 6px;
    margin-top: 10px;
    background: rgba(255,255,255,.2);
    border-radius: 25px;
    margin-right: 10px;
`
const RestEllipsis = styled(Ellipsis) <Props>`
    font-size:var(--size12);
    margin-top: 10px;
    line-height: 1.5; 
`
const RestMask = styled(Mask)`
padding: 0 30px;
overflow: scroll;
height: 100%;
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
&::after{
    content: '';
    position: fixed;
    top: -15px;
    left: 0;
    right: 0;
    height: 40px;
    filter: blur(15px);
    background: inherit;

}
.coverImgUrl{
    border-radius: 15px;
    width: 180px;
    height: 180px;
    display: block;
    margin: 50px auto 0;
}
.act{
    text-align: center;
    margin: 20px 0;
    font-weight: 600;
    color: #fff;
    font-size:var(--size14);
}
.ts{
    padding-right: 15px;
}
.description{
    font-size:var(--size12);
    margin-top:10px;
    white-space: pre-wrap;
    line-height: 1.5;

}
`
const RestDivider = styled(Divider)`
    border: 0;
    padding-top: 1px;
    background: linear-gradient(to right, transparent, #d0d0d5, transparent);
`
const RestNoticeBar = styled(NoticeBar)`
    background: transparent;
    border: 0;
`
const RenderInput = styled.input.attrs({
    type: 'text',
    placeholder: '搜索歌曲',
    autoFocus: true,
})`
width:75%;
background: transparent;

`
export {
    RestMask,
    RenderBar,
    RenderSong,
    RestEllipsis,
    RestDivider,
    RenderTags,
    RestNoticeBar,
    RenderInput
}