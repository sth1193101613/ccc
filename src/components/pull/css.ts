import styled, { keyframes } from 'styled-components'
type Props = {
    h: number
}
const Bspull = styled.div<Props>`
    height:${props => props.h}px;
    overflow: hidden;    
`
const Circle = keyframes` {
    form{
        transform: rotate(0) translateZ(0);
    }
    to {
        transform: rotate(360deg) translateZ(0);
        }
    }
    `
const PullToRefresh = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 42px;
    margin: 0 auto;
    z-index: 1;
    opacity: 0;
    touch-action: none;
    `
const PullLoading = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(230, 230, 230);
    box-shadow: 0px 0px 11px 7px rgba(62, 66, 66, 0.08);
    border-radius: 36px;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    display: grid;
    .xicon{
        width: 20px;
        height: 20px;
        transform: scale(1.4);
        align-self: center;
        justify-self: center;
        svg{
            width: 20px;
            height: 20px;
        }
    }
    `
const Rotation = styled.div`
    width: 20px;
    height: 20px;
    animation: ${Circle} infinite .8s linear;
    border: 2px solid #ff3d00;
    border-top-color: transparent;
    border-radius: 100%;
    transform-origin:center;
    `
export {
    Bspull,
    Rotation,
    PullLoading,
    PullToRefresh
}