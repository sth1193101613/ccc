
import request from '../axios'
import { requestType, paramsType } from './types'

export const getLyric = (params: paramsType): Promise<requestType> => {
    return request('get', `/lyric/new`, params)
}
export const getSongUrl = (params: paramsType): Promise<requestType> => {
    return request('get', `/song/url/v1?level=exhigh`, params)
}
export const getPlaylist = (params: paramsType): Promise<requestType> => {
    return request('get', `/user/playlist`, params)
}
export const getPlayListDetail = (params: paramsType): Promise<requestType> => {
    return request('get', `/playlist/detail`, params)
}
export const getPlaylistTrackAll = (params: paramsType): Promise<requestType> => {
    return request('get', `/playlist/track/all`, params)
}
export const getCommentMusic = (params: paramsType): Promise<requestType> => {
    return request('get', `/comment/new`, params)
}