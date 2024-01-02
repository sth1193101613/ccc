import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import storage from '../../utils/storage'
import constant from './songType'
import type { RootState } from '../store'
/**
 * @params
 * isPlayer 当前播放状态 1开始 2暂停
 * currentPlayer 当前播放歌曲
 * songUrl 当前播放url
 * songLyric 歌曲歌词
 * songTime 总时长
 * currentTime 当前播放时长
 * songIndex 当前播放歌曲索引
 * songList 当前歌单
 */

interface songObj {
    [id: string]: string;
}
interface stateType {
    isPlayer: number
    currentPlayer: songObj
    songUrl: string
    songLyric: object
    songTime: number
    currentTime: number
    songIndex: number
    songList: any
    duration: number
}
const initialState: stateType = {
    isPlayer: 2,
    currentPlayer: storage.get(constant.CURRENT_SONG) ?? null,
    songUrl: '',
    songLyric: null,
    songTime: Math.PI * 28,
    currentTime: 0,
    songIndex: 0,
    songList: storage.get(constant.LIST_SONG) ?? [],
    duration: 0 //总时长
}

const counterSong = createSlice({
    name: "counterSong",
    initialState,
    reducers: {
        updataDuration(state: { duration: number }, action: PayloadAction<number>) {
            state.duration = action.payload
        },

        updataPlayerStatus(state: { isPlayer: number }, action: PayloadAction<number>) {
            state.isPlayer = action.payload
        },
        updataSong(state: { currentPlayer: songObj }, action: PayloadAction<songObj>) {
            state.currentPlayer = action.payload
            storage.set(constant.CURRENT_SONG, action.payload)
        },
        updataSongTime(state: { songTime: number }, action: PayloadAction<number>) {
            state.songTime = action.payload
        },
        updataTime(state: { currentTime: number }, action: PayloadAction<number>) {
            state.currentTime = action.payload
        },
        updataSongNext(state: { songList: any, currentPlayer: songObj }) {
            const findSong = state.songList.findIndex((el: songObj) => el.id === state.currentPlayer.id)
            if (findSong !== state.songList) {
                const nextSong = state.songList[findSong + 1]
                state.currentPlayer = nextSong
                storage.set(constant.CURRENT_SONG, nextSong)
            }
        },
        updataSongPre(state: { songList: any, currentPlayer: songObj }) {
            const findSong = state.songList.findIndex((el: songObj) => el.id === state.currentPlayer.id)
            if (findSong !== 0) {
                const nextSong = state.songList[findSong - 1]
                state.currentPlayer = nextSong
                storage.set(constant.CURRENT_SONG, nextSong)
            }
        },
        updataSongList(state: { songList: any }, action: PayloadAction<any>) {
            state.songList = action.payload.flat()
            storage.set(constant.LIST_SONG, action.payload.flat())
        },
        updataSongUrl(state: { songUrl: string }, action: PayloadAction<string>) {
            state.songUrl = action.payload

        },
        updataSongLyric(state: { songLyric: object }, action: PayloadAction<object>) {
            state.songLyric = action.payload
        },
    },
})

export const { updataSongUrl, updataSongLyric, updataDuration, updataPlayerStatus, updataSong, updataSongTime, updataTime, updataSongNext, updataSongPre, updataSongList } = counterSong.actions
export const selectPlayer = (state: RootState) => state.counterSong.isPlayer
export const selectSong = (state: RootState) => state.counterSong.currentPlayer
export const selectUrl = (state: RootState) => state.counterSong.songUrl
export const selectLyric = (state: RootState) => state.counterSong.songLyric
export const selectSongTime = (state: RootState) => state.counterSong.songTime
export const selectcurrentTime = (state: RootState) => state.counterSong.currentTime
export const selectSongList = (state: RootState) => state.counterSong.songList
export const selectDuration = (state: RootState) => state.counterSong.duration
export default counterSong.reducer