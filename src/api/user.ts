import request from '../axios'
import { requestType, paramsType } from './types'

export const loginPhone = (params: paramsType): Promise<requestType> => {
    return request('post', '/login/cellphone', params)
}
export const userPlaylist = (params: paramsType): Promise<requestType> => {
    return request('get', '/user/playlist', params)
}
export const userInfo = (params: paramsType): Promise<requestType> => {
    return request('get', '/user/detail', params)
}
export const userQrKey = (): Promise<requestType> => {
    return request('get', `/login/qr/key?timerstamp=${Date.now()}`, {})
}
export const loginQrCreate = (key: paramsType): Promise<requestType> => {
    return request('get', `/login/qr/create?qrimg=true&key=${key}&timerstamp=${Date.now()}`, {})
}
export const loginQrCheck = (key: paramsType): Promise<requestType> => {
    return request('get', `/login/qr/check?key=${key}&timerstamp=${Date.now()}`, {})
}
export const loginStatus = (data: paramsType): Promise<requestType> => {
    return request('post', '/login/status', data)
}
export const captchasent = (data: paramsType): Promise<requestType> => {
    return request('get', '/captcha/sent', data)
}
