import styled, { keyframes } from 'styled-components'
const rotate = keyframes`
0%{transform: scaleY(-0.8);transform-origin:center center;}
50%{transform: scaleY(-1.2);transform-origin:center center;}
100%{transform: scaleY(-0.8);transform-origin:center center;}
`;

const RenderMusic = styled.div`
position: absolute;
width: 55px;
height: 55px;
display: flex;
align-items: center;
justify-content: center;
div{
    background-color: #fff;
    margin: 0 2px;
    display: inline-block;
    width: 3px;
    height: 15px;
    border-radius: 20px;
}
.m1{ animation: ${rotate} .6s linear infinite}
.m2{ animation: ${rotate} .8s linear infinite}
.m3{ animation: ${rotate} .7s linear infinite}

img{
    height: 24px;
    width: 24px;
    position: absolute;
}
`

export {
    RenderMusic
}