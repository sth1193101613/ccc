import styled from 'styled-components'
const FoundRender = styled.div`
background: var(--bgColor);
`
const NavRender = styled.div`
display:flex;
align-items: center;
flex-wrap: nowrap;
padding: 10px 0;
border-bottom: 1px solid #2f2d2d;
overflow-y: scroll;
&::-webkit-scrollbar {
    display: none;
}
`
const NavItem = styled.div`
min-width:20%;
max-width:20%;
text-align: center;
div{
    width: 40px;
    height:40px;
    margin:0 auto;
    transform: translateX(0);
    overflow: hidden;
}
img{
    width:40px;
    height:40px;
    background: rgb(255,0,0,.3);
    border-radius: 50%;
    filter: drop-shadow(40px 0 0 red);
    transform: translateX(-40px)
}
span{
    color:#d6d6d6;
    font-size:var(--size12);
}
`
export {
    NavItem,
    NavRender,
    FoundRender
}