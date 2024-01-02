import React, { useState, useEffect, useCallback, useRef } from 'react'
import RenderRouters from './router/renderRoutes'
import SongTool from './components/songTool'
import UsePlayerAudio from './hooks/UsePlayerAudio'
import Player from './hooks/UsePlayer'
import { selectSong } from './redux/song'
import { useAppSelector } from './redux/useReduxHook'
import { AliveScope } from 'react-activation'
import { routerList } from './router/routerList'
import PlayList from './components/playList'
import eventBus from './utils/event'
import './reset.css'
function App() {
  const [mark, setMark] = useState<number>(0)
  const [pop, setPop] = useState<boolean>(false)
  const song = useAppSelector(selectSong)
  const elements = UsePlayerAudio()
  const onHandlePlayer = () => {
    setMark(1)
  }
  const acceptParameters = useCallback((message: boolean) => {
    setPop(message)
  }, [])
  const onHandleHideMask = (message: boolean) => {
    setPop(message)
  }
  const onSetMark = (val) => {
    setMark(val)
  }
  useEffect(() => {
    eventBus.addListener('showPop', acceptParameters)
    return () => {
      eventBus.removeListener('showPop', acceptParameters)
    }
  }, [acceptParameters])
  return (
    <div className="App">
      <>
        <SongTool onHandlePlayer={() => { onHandlePlayer() }} />
        {
          song ? <>

            {elements()}
          </> : null
        }
        <AliveScope>
          <RenderRouters routerConfig={routerList} className="ac" />
        </AliveScope>
      </>
      <Player song={song} mark={mark} onSetMark={onSetMark} />
      <PlayList show={pop} onHandleHideMask={onHandleHideMask} />
    </div>
  )
}
export default App