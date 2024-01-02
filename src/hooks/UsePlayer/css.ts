import styled, { keyframes } from 'styled-components'
import voma from '/@/assets/img/am.png'
const rotateStyle = keyframes`
from {
    transform: translate(-50%, -50%) rotate(0deg);
}
to {
    transform: translate(-50%, -50%) rotate(360deg);
}
`

type Props = {
    time?: number
    status?: boolean
    y?: number
    bg?: string | undefined
    cbg?: string | null
    data?: any
    vol?: number
    mark?: number,
    type:string
}
const RenderItem = styled.span<Props>`
 font-weight: bold;
 font-size:var(--size16);
 background: rgb(147,142,149) -webkit-linear-gradient(left,rgb(147,142,149), rgb(147,142,149));
color:transparent;
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;
    &.active {
        background: rgb(147,142,149) -webkit-linear-gradient(left, rgba(224,219,239) ${props => props.type === 'line' ? `100%` : 'var(--percent)'}, rgb(147,142,149) 0%);
        color:transparent;
        -webkit-background-clip: text;
    }
    &.default {
        background: rgb(147,142,149) -webkit-linear-gradient(left,rgb(147,142,149),rgb(147,142,149));
        color:transparent;
        -webkit-background-clip: text;
    }
`
const VolumeBlock = styled.div<Props>`
    width: 45px;
    height: 100px;
    position: relative;
    background: rgb(122,122,122);
    top: 90px;
    left: 25px;
    border-radius: 10px;
    z-index:112111;
    overflow: hidden;
    &:after{
        content:'';
        position: absolute;
        bottom: 0px;
        background: #fff;
        width: 45px;
        height: ${props => props.vol * 100}px;
    }
`
const RenderPlayer = styled.div<Props>`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index:10;
    transform: translate3d(0,${props => props.y}px,0) scale(${props => props.mark});
    transition: ${props => props.status ? 'transform .4s ease' : ''};
    overflow: hidden;
    background: var(--popColor);
    .detail{
        position: fixed;
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        top: 20px;
    }
    .wrapperLryic{
        text-align: center;
        height: 65%;
        position: relative;
        overflow: hidden;
        top: -10px;
        transition: opacity 0.4s ease 0s;
        ul{
            width:100%;
            height:500px;
            position: absolute;
            top: 50%;
            li{
                line-height:35px;
                position: relative;
                transition: .3s all;
                transform:scale(.9);
                &.active{
                    transform:scale(1) translateZ(0);
                }
            }
        }
    }
    .debut{
        position: absolute;
        width: 100%;
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.4s ease 0s;
        top: 0;
        .musiccover{
            width: 180px;
            height: 180px;
            transform: translate(-50%, -50%);
            position: absolute;
            left: 50%;
            border-radius: 50%;
            animation: ${rotateStyle} infinite linear 25s;
            border: 4px solid rgba(255,255,255,.6);
            top: 40%;
            .bg{
                width: 172px;
                height: 172px;
                border-radius: 50%;
                display:block;
            }
        }
        .musiccoverbackground{
            position: absolute;
            width: 80%;
            left: 50%;    
            transform: translate(-50%,-50%);
            top: 40%;
            z-index: -1;
        }
    }
    &::after{
        background-image:url(${props => props.bg});
        content:'';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        filter: brightness(0.4) blur(20px);
        background-position: center center;
        background-size: cover;
        margin:-40px;
    }
`
const Volume = styled.img.attrs({
    src: voma,
    width: 25,
    height: 25
})`
    position: absolute;
    top: 60px;
    left: 35px;
`
export {
    Volume,
    RenderPlayer,
    RenderItem,
    VolumeBlock
}