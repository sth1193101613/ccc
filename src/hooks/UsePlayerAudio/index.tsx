import React, { useEffect, useRef, useCallback } from 'react'
import { getLyric, getSongUrl } from '../../api/song'
import { updataSongUrl, updataSongLyric, selectSong, selectUrl, selectPlayer, updataSongTime, updataTime, updataPlayerStatus, updataDuration } from '../../redux/song'
import { useAppSelector, useAppDispatch } from '../../redux/useReduxHook'
import eventBus from '../../utils/event'
import './style.css'

const UsePlayerAudio = () => {
    const dispatch = useAppDispatch()
    const url = useAppSelector(selectUrl)
    const song = useAppSelector(selectSong)
    const isPlayer = useAppSelector(selectPlayer)
    const audioRef = useRef<HTMLAudioElement>(null!)
    const _getLyric = async (id: string) => {
        const data = await getLyric({ id })
        dispatch(updataSongLyric(data))
    }
    const _getSongUrl = async (id: string) => {
        const { data } = await getSongUrl({ id })
        dispatch(updataSongUrl(data[0].url))
    }
    useEffect(() => {
        if (song) {
            dispatch(updataSongUrl(''))
            dispatch(updataSongLyric({}))
            _getLyric(song?.id)
            _getSongUrl(song?.id)
        }
    }, [song])
    useEffect(() => {
        if (isPlayer === 1) {
            audioRef.current?.play()
        }
        if (isPlayer === 2) {
            audioRef.current?.pause()
        }
    }, [url, isPlayer])
    const acceptSilderChange = useCallback((silder: number) => {
        audioRef.current.currentTime = silder
    }, [])
    const acceptvolumeChange = useCallback((volume: number) => {
        audioRef.current.volume = volume
    }, [])
    useEffect(() => {
        eventBus.addListener('silderChange', acceptSilderChange)
        return () => {
            eventBus.removeListener('silderChange', acceptSilderChange)
        }
    }, [acceptSilderChange])
    useEffect(() => {
        eventBus.addListener('volumeChange', acceptvolumeChange)
        return () => {
            eventBus.removeListener('volumeChange', acceptvolumeChange)
        }
    }, [acceptSilderChange])
    const onTimeUpdate = (e: { target: { currentTime: number } }) => {
        const currentTime = e.target.currentTime
        const duration = audioRef.current.duration
        const percent = Math.min(1, currentTime / duration)
        const dashOffset = ((1 - percent) * Math.PI * 28) || Math.PI * 28
        dispatch(updataSongTime(dashOffset))
    }
    const onCanPlay = (e: { target: { duration: number } }) => {
        const duration = e.target.duration
        dispatch(updataDuration(duration))
    }
    const onEnded = () => {
        dispatch(updataTime(0))
        dispatch(updataSongTime(Math.PI * 28))
        dispatch(updataPlayerStatus(3))
        setTimeout(() => {
            dispatch(updataPlayerStatus(1))
        }, 5)
    }
    useEffect(() => {
        let lyricTimer = null
        audioRef.current.addEventListener("playing", (e) => { 
            lyricTimer = setInterval(() => { 
                const currentTime = audioRef.current.currentTime
                dispatch(updataTime(currentTime))
            },16.67)
        })
        return () => {
            clearInterval(lyricTimer)
        }
    },[])
    const elements = () => {
        return (
            React.createElement('audio', {
                src: url,
                type: 'audio/mpeg',
                onTimeUpdate,
                onEnded,
                onCanPlay,
                ref: audioRef,
            })
        )
    }
    return elements
}
export default UsePlayerAudio