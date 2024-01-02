import { configureStore } from '@reduxjs/toolkit'
import counterUser from './user/index'
import counterFound from './found/index'
import counterSong from './song/index'
import counterMusic from './music/index'
const store = configureStore({
    reducer: {
        counterUser,
        counterFound,
        counterSong,
        counterMusic
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store