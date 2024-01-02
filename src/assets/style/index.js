import styled from 'styled-components'
const RenderContainer = styled.div`
padding: 0px 15px;
margin:10px 0px;
border-radius: 10px;
padding: 12px;
`
const RenderTitle = styled.div`
margin-bottom:10px;
display:flex;
justify-content: space-between;
.more{
    font-size:14px;
}
.title{
    font-size:16px;
    // font-weight: 600;
}
`

export {
    RenderTitle,
    RenderContainer
}