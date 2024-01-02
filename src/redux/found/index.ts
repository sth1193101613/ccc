import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from '../store'
/**
 * @params
 * compontesList 首页模块位置
 */

interface stateType {
    compontesList: Array<rowType>,
    isClick: boolean
}
interface rowType {
    title: string
    componte: string
    type: string
    list: any
    login: boolean
    className?: string
}

const initialState: stateType = {
    compontesList: [
        {
            title: '推荐歌单',
            componte: 'CardList',
            type: 'alize',
            list: [],
            login: false,
            className: 'default'
        },
        {
            title: '为你定制精选歌曲',
            componte: 'SongList',
            type: 'song',
            list: [],
            login: true
        },
        {
            title: '推荐音乐视频',
            componte: 'CardList',
            list: [],
            type: 'recommend',
            login: false,
            className: 'twoset'
        },
        {
            title: '热门话题',
            componte: 'TopIc',
            list: [],
            type: 'hot',
            login: true
        },
        {
            title: '新歌速递',
            componte: 'SongList',
            list: [],
            type: 'newsong',
            login: true
        },
        {
            title: '音乐日历',
            componte: 'musicTime',
            list: [],
            type: 'calendar',
            login: false
        },
    ],
    isClick: true
};
const counterFound = createSlice({
    name: "counterFound",
    initialState,
    reducers: {
        updataCompontesList(state: { compontesList: Array<rowType> }, action: PayloadAction<any>) {
            state.compontesList = action.payload
        },
        updataList(state: { compontesList: Array<rowType> }, action: PayloadAction<any>) {
            for (let i = 0; i < state.compontesList.length; i++) {
                if (state.compontesList[i].type === action.payload.type) {
                    state.compontesList[i].list = action.payload.data
                }
            }
        },
        updataClick(state: { isClick: boolean }, action: PayloadAction<boolean>) {
            state.isClick = action.payload
        }
    }
})
export const { updataCompontesList, updataList, updataClick } = counterFound.actions
export const selectFound = (state: RootState) => state.counterFound.compontesList
export const selectClick = (state: RootState) => state.counterFound.isClick
export default counterFound.reducer