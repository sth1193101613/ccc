import styled, { css } from 'styled-components'

const InputFound = styled.div`
display:flex;
align-items: center;
`

const InputCss = css`
height: 30px;
border-radius: 20px;
background: #3d3d3d;
width:100%;
color: #c6c6c6;
margin: 0 10px;
`
const Inputner = styled.div`${InputCss}`
const InputSearch = styled.input`${InputCss}`
export {
    Inputner,
    InputFound,
    InputSearch
}