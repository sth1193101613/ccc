import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import storage from '../../utils/storage'
import constant from './userType'
import type { RootState } from '../store'

/**
 * @params
 * user 当前登录用户
 * token cookie
 * status 修改当前状态
 */

interface stateType {
    user: null
    token: null
    status: string,
}
const initialState: stateType = {
    user: storage.get(constant.USER_INFO) || null,
    token: storage.get(constant.USER_TOKEN) || null,
    status: '编辑此刻的状态',
}
export const counterUser = createSlice({
    name: "counterUser",
    initialState,
    reducers: {
        updataUser(state: { user: null }, action: PayloadAction<null>) {
            state.user = action.payload
            storage.set(constant.USER_INFO, action.payload)
        },
        updataToken(state: { token: null }, action: PayloadAction<null>) {
            state.token = action.payload
            storage.set(constant.USER_TOKEN, action.payload)
        },
        updateStatus(state: { status: string }, action: PayloadAction<string>) {
            state.status = action.payload
        },
    },
})
export const { updataToken, updateStatus, updataUser } = counterUser.actions
export const selectUser = (state: RootState) => state.counterUser.user
export const selectLogin = (state: RootState) => state.counterUser.token
export const selectStatus = (state: RootState) => state.counterUser.status
export default counterUser.reducer