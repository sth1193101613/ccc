import styled from 'styled-components'
const HomeRender = styled.div`
padding-top: 45px;
z-index:2;
`
const PopList = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
li{
    max-width: 50%;
    text-align: center;
    line-height: 30px;
    background: rgb(43,43,43);
    margin: 15px;
    border-radius: 30px;
    padding: 5px;
    min-width: 40%;
    span{
        font-size:20px;
    }
}
`
export {
    PopList,
    HomeRender
}