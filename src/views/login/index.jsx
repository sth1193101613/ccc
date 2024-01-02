import React, { useState, useRef, useEffect, useCallback } from 'react'
import { RenderLogin, InputAccount, RenderFrom, InputPass, InputBtn, RenderTag, FromItem, InputCode } from './css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginPhone, userInfo, userQrKey, loginQrCreate, loginQrCheck, loginStatus, captchasent } from '/@/api/user'
import { updataUser, updataToken } from '/@/redux/user'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const keys = useRef()
    const timer = useRef()
    const [seconds, setSeconds] = useState(60)
    const [flag, setFlag] = useState(false)
    const [codeUrl, setCodeUrl] = useState('')
    const [qrKey, setQrKey] = useState('')
    const [loginType, setType] = useState(false)
    const [loginParams, setParams] = useState({
        phone: '',
        captcha: ''
    })
    const login = async () => {
        const { profile } = await loginPhone(loginParams)
        const data = await userInfo({
            uid: profile.userId
        })
        dispatch(updataUser(data.profile))
        setTimeout(() => {
            navigate('/home/found')
        }, 50)
    }
    const getCaptcha = async () => {
        // await captchasent({
        //     phone: loginParams.phone
        // })
        setFlag(true)
    }
    const countSecondStart = () => {
        const intervalId = setInterval(() => {
            setSeconds((count) => count - 1);
        }, 1000);
        return intervalId;
    }

    const changType = () => {
        setType(!loginType)
        if (!loginType) {
            getQkey()
        }
        if (loginType) {
            setQrKey('')
            clearTimeout(timer.current)
            timer.current = null
        }
    }
    const getQkey = async () => {
        const { data: { unikey } } = await userQrKey()
        setQrKey(unikey)
        const { data: { qrimg } } = await loginQrCreate(unikey)
        setCodeUrl(qrimg)
    }
    const checkCode = useCallback((key) => {
        loginQrCheck(qrKey).then(async (res) => {
            if (res.code === 803) {
                dispatch(updataToken(res.cookie))
                clearTimeout(timer.current)
                const { data } = await loginStatus({ cookie: res.cookie })
                dispatch(updataUser({
                    type: 'user',
                    data: data.profile
                }))
                timer.current = null
                setTimeout(() => {
                    navigate('/home/found')
                }, 50)
                return false
            }
            timer.current = setTimeout(() => {
                if (key === qrKey) {
                    checkCode(key)
                } else {
                    clearTimeout(timer.current)
                    timer.current = null
                }
            }, 3000)
        })
    }, [qrKey, codeUrl])
    useEffect(() => {
        if (flag) {
            const intervalId = countSecondStart()
            if (seconds === 0) {
                setSeconds(60)
                setFlag(false)
                clearInterval(intervalId);
            }
            return () => clearInterval(intervalId);
        }
    }, [flag, seconds])
    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = null
        }
        if (qrKey !== '') {
            checkCode(qrKey)
        }
        return () => {
            setQrKey('')
        }
    }, [qrKey, checkCode])
    return (
        <RenderLogin>
            <span className="tj" onClick={() => { navigate('/home/found') }}>立即体验</span>
            <h3>Login</h3>
            {
                !loginType ?
                    <RenderFrom>
                        <InputAccount value={loginParams.phone} onChange={(e) => { setParams({ ...loginParams, phone: e.target.value }) }} />
                        <FromItem>
                            <InputPass value={loginParams.captcha} onChange={(e) => { setParams({ ...loginParams, captcha: e.target.value }) }} />
                            {
                                <InputCode onClick={getCaptcha} second={seconds}>
                                    {
                                        seconds === 60 ? <span>发送验证码</span> : <span>{seconds}重新发送</span>
                                    }
                                </InputCode>
                            }
                        </FromItem>
                        <InputBtn onClick={login}>登录</InputBtn>
                    </RenderFrom> :
                    <RenderFrom>
                        <img src={codeUrl} style={{ 'display': 'block', 'margin': '0 auto' }}></img>
                    </RenderFrom>
            }
            <RenderTag onClick={(e) => { changType() }}>
                {loginType ? '账号密码登录' : '二维码登录'}
            </RenderTag>
        </RenderLogin>
    )
}
export default Login