import styled from 'styled-components'
const Headerner = styled.div`
height: 45px;
position: fixed;
left: 0;
right: 0;
z-index: 2;
display:flex;
align-items: center;
padding: 0 10px;
background: var(--cardColor);
.xicon svg{
    width: 20px;
    height: 20px;
    display: block;
    margin: 0 auto;
}
`
const HeaderChildren = styled.div`
flex: 1;
`
export {
    Headerner,
    HeaderChildren
}