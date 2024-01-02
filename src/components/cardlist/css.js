import styled from 'styled-components'
import { RenderContainer, RenderTitle } from '/@/assets/style/index'
const CardRerner = styled(RenderContainer)``
const CardTitle = styled(RenderTitle)``
const CardWarp = styled.div`
position: relative;
white-space: nowrap;
overflow: hidden;
ul{
    display: inline-block;
    li{
        display: inline-block;
        margin-right:10px;
        position: relative;
        vertical-align: text-top;
        img{
            border-radius: 5px;
            &.default{
                width:100px;
                height:100px;
            }
            &.twoset{
                width: 128px;
                height: 80px;
            }
        }
        p{
            width:100px;
            font-size:var(--size12);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            white-space: normal;
            margin-top:5px;	
        }
        div{
            position: absolute;
            background:rgba(0,0,0,.2);
            right: 10px;
            top: 5px;
            padding: 0px 5px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            .count{
                font-size:10px;
                color: #fff;
                height: 20px;
                line-height: 20px;
            }
        }
    }
}
`

export {
    CardRerner,
    CardTitle,
    CardWarp,
}