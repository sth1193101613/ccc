import styled from 'styled-components'
import { Slider } from 'antd-mobile'
const ToolRender = styled.div`
    z-index:10;
    position: fixed;
    bottom: 30px;
    width: 100%;
    align-items: center;
`
const Tool = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 25px;
    margin-top: 20px;
`
const ToolImg = styled.img`
    width:${props => props.size}px;
    height:${props => props.size}px;
`
const ToolRange = styled(Slider)`
padding: 0 40px;
.adm-slider-track{
    background:#5f5f5f;
    height: 2px;
}
.adm-slider-fill{
    height: 2px;
    background:#fff;
}
.adm-slider-thumb-container{
    width:auto;
    height:auto;
    .adm-slider-thumb{
        width:6px;
        height:6px;
        svg{
            display:none;
        }
    }
}

`
export {
    Tool,
    ToolImg,
    ToolRender,
    ToolRange
}