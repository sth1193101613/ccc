import React, { useState, useEffect, useRef } from 'react'
import { RenderPlayer, RenderItem, Volume, VolumeBlock } from './css'
import { useAppSelector } from '../../redux/useReduxHook'
import { selectLyric, selectcurrentTime, selectPlayer, selectUrl } from '../../redux/song'
import parseLyric, { rctype } from '../../utils/parseLyric'
import './index.css'
import Usescene from '../../utils/triangle'
import PlayerTool from '../../components/playerTool'
import { itemType, styleType } from './types'
import Hammer from 'hammerjs'
import { getMainColor } from '../../utils/index'
import eventBus from '../../utils/event'
const enum MathVar {
  SIZE = 0,
  MAX = 100,
  MIN = 0,
  H = 100
}
const Player = ({ song, mark, onSetMark }) => {
  const container = useRef<HTMLDivElement>(null)
  const songRef = useRef<any>()
  const manager = useRef<any>()
  const volumeRef = useRef<HTMLDivElement>(null)
  const [bgColor] = useState<string>('')
  const [songLryic, setLryic] = useState<Array<rctype>>([])
  const [lryicIndex, setLryicIndex] = useState<number>(0)
  const [wordsIndex, setWordsIndex] = useState<number>(0)
  const [lryicItemStyle, setLryicItemStyle] = useState<string>()
  const [lryicStyle, setStyle] = useState<styleType>({
    transform: '',
    transition: ''
  })
  const [toggle, setTog] = useState<boolean>(true)
  const lryic: any = useAppSelector(selectLyric)
  const isPlayer: number = useAppSelector(selectPlayer)
  const currTime: number = useAppSelector(selectcurrentTime)
  const url: string = useAppSelector(selectUrl)
  const [startmark, setStartmark] = useState<number>(0)
  const [status, setstatus] = useState<boolean>(false)
  const [volume, setVol] = useState<number>(0.2)
  const clientHeight: number = document.documentElement.clientHeight
  const handleVolume = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
  }
  const getPos = (e: TouchEvent) => {
    const [touches] = e.changedTouches
    const { clientY } = touches
    const clY = clientY + MathVar.SIZE / 2
    let bgBarTop = 90
    let per = 100 - ((clY - bgBarTop - MathVar.SIZE) / (MathVar.H - MathVar.SIZE)) * 100
    per = Math.max(per, MathVar.MIN)
    per = Math.min(per, MathVar.MAX)
    setVol(per / 100)
    eventBus.emit('volumeChange', per / 100)
  }
  const mothes = (e: any) => {
    getPos(e)
  }
  useEffect(() => {
    if (mark !== null) {
      volumeRef.current?.addEventListener('touchstart', (e) => {
        manager.current.stop()
        volumeRef.current?.addEventListener('touchmove', getPos)
      })
    }
    return () => {
      volumeRef.current?.removeEventListener('touchstart', (e) => {
        volumeRef.current?.removeEventListener('touchmove', getPos)
      })
    }
  }, [mark])
  useEffect(() => {
    if (lryic) {
      const lyricList: Array<rctype> = parseLyric(lryic)
      setLryic(lyricList)
    }
    return () => {
      setLryic([])
    }
  }, [lryic])
  useEffect(() => {
    if (songRef.current) {
      let list = songRef.current?.querySelectorAll('li')
      songLryic.forEach((el, index) => {
        if (Number(el.startTime) < currTime) {
          setLryicIndex(Number(index))
          setStyle({ transform: `translateY(${-list[index].offsetTop}px)`, transition: 'transform 0.5s ease' })
          el.children.forEach(word => {
            if (word.startTime / 1000 <= currTime) {
              setWordsIndex(word.wordIndex)
            }
          })
        }
      })
    }
  }, [currTime, songRef, wordsIndex, currTime])
  useEffect(() => {
    if (mark === 1 && container.current) {
      setStartmark(0)
      setstatus(true)
      manager.current = new Hammer(container.current, {})
      manager.current.add(new Hammer.Pan())
      manager.current.on('panend panmove', (e: { eventType: number; deltaY: number }) => {
        if (e.eventType === Hammer.INPUT_MOVE) {
          setstatus(false)
          if (e.deltaY <= 0) {
            setStartmark(0)
            return false
          }
          setStartmark(e.deltaY)
        }
        if (e.eventType === Hammer.INPUT_END) {
          setstatus(true)
          if (e.deltaY >= (clientHeight / 2)) {
            setStartmark(clientHeight)
            onSetMark(0)
          } else {
            setStartmark(0)
          }
        }
      })
      return () => {
        manager.current.off('panmove');
        manager.current.off('panend');
      }
    }
  }, [mark])
  useEffect(() => {
    setStyle({ transform: `translateY(${0}px)`, transition: 'transform 0.5s ease' })
    const documents = document.querySelector('.debut')
    getMainColor([document.querySelector('.musiccover')], 1).then(res => {
      document.querySelector('.musiccoverbackground')?.remove()
      const createDocument = document.createDocumentFragment() as DocumentFragment
      const createCanvas = document.createElement('canvas')
      createCanvas.className = 'musiccoverbackground'
      createDocument.appendChild(createCanvas)
      documents?.appendChild(createDocument)
      const canvas = document.querySelector('.musiccoverbackground') as HTMLCanvasElement
      canvas.width = canvas.height = Math.ceil(window.innerWidth * 1.8)
      const rgb = res.match(/[\d.]+/g) as Array<string>
      setLryicItemStyle(`${rgb[0]},${rgb[1]},${rgb[2]}`)
      const { run } = Usescene(canvas, [rgb[0], rgb[1], rgb[2]])
      run()
    })
  }, [url])
  const hideModel = () => {
    setTog(!toggle)
  }
  return (
    <RenderPlayer bg={song?.al?.picUrl} onClick={(e) => { hideModel() }} cbg={bgColor} ref={container} y={startmark} status={status} mark={mark}>
      <div className='detail'>
        <p>{song?.name}</p>
      </div>
      <Volume style={{ opacity: !toggle ? 1 : 0, zIndex: !toggle ? 1 : 0 }} onClick={(e) => { handleVolume(e) }} />
      <VolumeBlock ref={volumeRef} vol={volume} />
      <div className='debut' style={{ opacity: toggle ? 1 : 0, zIndex: toggle ? 1 : 0 }}>
        <div className="musiccover">
          <img src={song?.al?.picUrl} alt="" className='imgStyle bg' />
        </div>
      </div>
      <div className="wrapperLryic" style={{ opacity: !toggle ? 1 : 0, zIndex: !toggle ? 1 : 0 }}>
        <ul style={lryicStyle} ref={songRef}>
          {
            songLryic.map((el, index) => {
              return (
                <li key={index} className={lryicIndex === index ? 'active' : ''} data-time={el.startTime}>
                  {
                    el?.children?.map((i: itemType, idx: number) => {
                      // return <span color={lryicItemStyle} className={lryicIndex === index && wordsIndex >= i.wordIndex ? 'active' : ''} data-time={i.startTime}  time={i.intervalTime / 1000} key={idx}
                      // >{i.value}</span>
                      return <RenderItem color={lryicItemStyle} className={`${lryicIndex === index && wordsIndex >= i.wordIndex ? 'active' : ''} ${i.intervalTime <= 0 ? 'default' : ''}`}
                        style={{ '--percent': el.type === 'split' ? lryicIndex === index ? `${((currTime - i.startTime / 1000) / (i.intervalTime / 1000)).toFixed(2) * 100}%` : '100%' : '' }}
                        key={idx}
                        type={ el.type }
                      >{i.value}</RenderItem>
                    })
                  }
                </li>
                // style={{ '--percent': lryicIndex === index ? `${((currTime - i.startTime / 1000) / (i.intervalTime / 1000)).toFixed(2) * 100}%` : '' }}
              )
            })
          }
        </ul>
      </div>
      <PlayerTool />
    </RenderPlayer>
  )
}
export default Player