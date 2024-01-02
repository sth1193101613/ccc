import request from '../axios'
import { requestType, paramsType } from './types'


export const banner = (params: paramsType): Promise<requestType> => {
    return request('get', '/banner', params)
}
export const dragonball = (): Promise<requestType> => {
    return request('get', '/homepage/dragon/ball', {})
}
export const personalized = (params: paramsType): Promise<requestType> => {
    return request('get', `/personalized`, params)
}
export const recommend = (params: paramsType): Promise<requestType> => {
    return request('get', `/mv/exclusive/rcmd`, params)
}
export const hottopic = (params: paramsType): Promise<requestType> => {
    return request('get', '/hot/topic', params)
}
export const recommendsongs = (params: paramsType): Promise<requestType> => {
    return request('get', `/recommend/songs`, params)
}
export const newsong = (params: paramsType): Promise<requestType> => {
    return request('get', '/personalized/newsong', params)
}
export const calendars = (params: paramsType): Promise<requestType> => {
    return request('get', '/calendar', params)
}
