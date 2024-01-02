import styled from 'styled-components'
import bgLogin from '../../assets/img/wall.png'
const RenderLogin = styled.div`
    background-image:url(${bgLogin});
    height:100%;
    background-size: 100% 100%;
    background-attachment: fixed;
    // filter: blur(5px);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .tj{
        position: absolute;
        right: 20px;
        top: 20px;
    }
`
const RenderFrom = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 35%;
`
const InputResut = styled.input`
    background: rgba(255,255,255,.1);
    border: 2px solid #fff;
    border-radius: 5px;
    width:80%;
    height: 40px;
    display: block;
    margin: 10px auto;
    padding-left: 20px;
    &::placeholder{
        color:var(--fontColor)
    }
`
const InputBtn = styled.button.attrs(props => ({
    type: 'button'
}))`
    width:80%;
    height: 40px;
    display: block;
    margin: 0 auto;
    background: #ff0000;
    outline: none;
    border: 0;
    border-radius: 20px;
    font-size: 18px;
    color: var(--fontColor);
`
const RenderTag = styled.div`
    position: absolute;
    top: 60%;
    text-align: center;
    left: 0;
    right: 0;
`
const FromItem = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0 auto;
`
const InputAccount = styled(InputResut).attrs(props => ({
    type: 'text',
    placeholder: '请输入手机号'
}))`
`
const InputPass = styled(InputResut).attrs(props => ({
    type: 'password',
    placeholder: '请输入验证码'
}))`
`
const InputCode = styled(InputBtn).attrs(props => ({
    disabled: props.second === 60 ? false : true
}))`
    width: 110px;
    margin-left: 15px;
    font-size: 14px;
    border-radius: 5px;
`

export {
    FromItem,
    InputCode,
    RenderLogin,
    InputAccount,
    RenderFrom,
    InputPass,
    InputBtn,
    RenderTag
}