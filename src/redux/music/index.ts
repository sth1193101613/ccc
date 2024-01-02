import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from '../store'

/**
 * @params 
 */

export interface rowType {
    name: string
    parentName: string
    show: boolean
}


interface stateType {
    tabList: Array<rowType>
    songList: any
    tagList: Array<any>
}


const initialState: stateType = {
    tabList: [
        { name: '华语', parentName: '语种', show: true },
        { name: '古风', parentName: '风格', show: true },
        { name: '影视原声', parentName: '主题', show: true },
        { name: '90后', parentName: '风格', show: true }
    ],
    songList: {
        '华语': [],
        '古风': [],
        '影视原声': [],
        '90后': []
    },
    tagList: []
}

const counterMusic = createSlice({
    name: "counterMusic",
    initialState,
    reducers: {
        updataTab(state: { tabList: Array<any> }, action: PayloadAction<any>) {
            const tabName = state.tabList.map(el => el.name)
            if (tabName.includes(action.payload.name)) {
                const index = state.tabList.findIndex(el => el.name === action.payload.name)
                state.tabList.splice(index, 1)
            } else {
                state.tabList = [...state.tabList, action.payload]
            }
        },
        updataTabStatus(state: { tabList: Array<any> }) {
            state.tabList.forEach(el => {
                el.show = true
            })
        },
        updataSongList(state: { songList: any }, action: PayloadAction<any>) {
            state.songList[action.payload.type] = action.payload.data
        },
        updataTagList(state: { tagList: Array<any> }, action: PayloadAction<any>) {
            state.tagList = action.payload
        }
    }
})

export const { updataTab, updataSongList, updataTagList, updataTabStatus } = counterMusic.actions
export const selecMusicTab = (state: RootState) => state.counterMusic.tabList
export const selecSongList = (state: RootState) => state.counterMusic.songList
export const selecTagList = (state: RootState) => state.counterMusic.tagList
export default counterMusic.reducer