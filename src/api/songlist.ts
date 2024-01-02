
import request from '../axios'
import { requestType, paramsType } from './types'

export const getCatlist = ({}: paramsType): Promise<requestType> => {
    return request('get', `/playlist/catlist`, {})
}

export const getTopPlaylist = (params: paramsType): Promise<requestType> => {
    return request('get', `/top/playlist?order=hot`, params)
}

