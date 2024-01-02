import styled from 'styled-components'
const InputFound = styled.div`
display:flex;
align-items: center;
position: relative;
.rig{
    position: absolute;
    right:0;
    height: 24px;
}
`
const Inputner = styled.div`
height: 24px;
border-radius: 20px;
background: #3d3d3d;
color: #c6c6c6;
margin: 0 auto;
display: flex;
align-items: center;
padding: 10px;
position: relative;
right: 12px;
`
export {
    Inputner,
    InputFound
}