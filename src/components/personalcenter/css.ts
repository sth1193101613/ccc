import styled from 'styled-components'
import { personProps } from '/@/types'
const Personalner = styled.div<personProps>`
height: ${props => props.height}px;
transform: translate3d(${props => props.x}px,0,0);
background: #080707;
z-index: 9;
position: fixed;
top: 0;
overflow: hidden;
bottom: 0;
width: 335px;
transition: ${props => props.status ? 'transform .4s ease' : ''};
padding: 15px;
.tap{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .avatar{
        width:25px;
        height:25px;
        border-radius: 50%;
    }
    .nickname{
        margin-left:15px;
    }
    svg{
        width:auto;
        height:auto;
    }
}
`
const DrawerMask = styled.div<personProps>`
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-color: ${props => props.opacity};
z-index: 8;
`
const DrawCardStyle = styled.div`
background: rgb(44,44,44);
padding: 10px;
margin: 10px 0;
border-radius: 5px;
position: relative;
ul{
    li{
        position: relative;
        .name{
            margin-left: 10px;
        }
        i{
            position: absolute;
            right: 0; 
        }
        span{
            vertical-align: middle;
        }
    }
    svg{
        width:auto;
        height:auto;
    }
}

`
const DrawCard = styled(DrawCardStyle)`
`
export {
    DrawCard,
    Personalner,
    DrawerMask
}