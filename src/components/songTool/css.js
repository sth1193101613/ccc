import styled, { keyframes } from 'styled-components'
const w = '28px'
const h = '28px'
const rotateStyle = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`
const SongBar = styled.div`
background:rgb(29,29,31);
height: 35px;
position: fixed;
bottom: ${props => props.b};
width: 100%;
padding:0 10px;
z-index:1;
.songinfo{
    display: flex;
    align-items: center;
}
.singlecover{
    width:38px;
    height:38px;
    background-image:url(${props => props.bg});
    background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    top: -5px;
    animation-play-state:${props => props.play ? 'running' : 'paused'};
    animation-name:${rotateStyle};
    animation-duration:12s;
    animation-timing-function:linear;
    img{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: block;
        margin: 7px 7px;
    }
}
.info{
    padding-left: 45px;
    width: 75%;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;
    .name{
        font-size:13px;
    }
    .art{
        font-size:11px;
    }
}
.tool{
    position: relative;
    flex: 1;
    top:5px;
    .list{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 28px;
        height: 28px;
        margin-top: -14px;
    } 
}
`
const ProgressCircle = styled.div`
position: relative;
width:${w};
height:${h};
border-radius: 50%;
text-align: center;
circle{
    stroke-width: 2px;
    transform-origin: center;
}
.progress-background{
    transform: scale(0.9);
    stroke: #5e5757;
}
.progress-bar{
    transform: scale(0.9) rotate(-90deg);
    stroke: #fff;
}

.play{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -10px;
    margin-top: -12px;
    width: 20px;
    height: 20px;
}

`
export {
    ProgressCircle,
    SongBar
}