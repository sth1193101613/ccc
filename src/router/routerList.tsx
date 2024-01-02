import React from 'react'
import Login from '../views/login'
import Home from '../views/home'
import Found from '../views/home/found'
import My from '../views/home/my'
import MusicList from '../views/musiclist'
import SongList from '../views/songlist'
import Discuss from '../views/discuss'
import { routeType } from './types'

const routerList: Array<routeType> = [
    {
        path: '/login',
        key: 'login',
        element: <Login />,
        keep: false
    },
    {
        path: '/musiclist',
        element: <MusicList />,
        key: 'musiclist',
        keep: true
    },
    {
        path: '/songList',
        element: <SongList />,
        key: 'songList',
        keep: false
    },
    {
        path: '/discuss',
        element: <Discuss />,
        key: 'discuss',
        keep: false
    },
    {
        path: '/home',
        key: 'home',
        element: <Home />,
        keep: false,
        children: [
            {
                path: 'found',
                key: 'found',
                element: <Found />,
                keep: true
            },
            {
                path: 'my',
                key: 'my',
                element: <My />,
                keep: true
            }
        ]
    },
]


export { routerList }