import styled from 'styled-components'
const MenuBar = styled.div`
background:rgb(29,29,31);
height:100%;
position: fixed;
bottom: 0;
width: 100%;
left: 0;
right: 0;
height: 50px;
ul{
height: 100%;
display: flex;
align-items: center;
justify-content: space-around;
border-top: 1px solid #222;
    li{
        flex:1;
        padding-top: 5px;
        position: relative;
        span{
            color:#d6d6d6;
            font-size:var(--size12);
            display:block;
            text-align: center;
            margin-top: 6px;
        }
        img{
            display:block;
            width:16px;
            height:16px;
            margin: 0 auto;
        }
        div{
            width: 22px;
            height: 22px;
            border-radius: 50%;
            margin: -5px auto;
            svg{
                width:20px;
                height:20px;
                display: block;
                margin: 0 auto;
            }
        }
    }
}
`
export {
    MenuBar
}