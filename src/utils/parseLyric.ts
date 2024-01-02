interface strType<T> {
	lrc: T
	yrc: T
	tlyric: T
}
export type lyricType = {
	lyric: string
}
export interface lyricListType {
	startTime?: number | string
	children?: any
	str?: any,
	type:string
}

export default function parseLyric(str: strType<lyricType>) {
	if (Object.keys(str).length === 0) return []
	const islyric: string = str?.yrc?.lyric ? str.yrc.lyric : str?.lrc?.lyric ? str.lrc.lyric : str?.tlyric.lyric
	const lyricLine = islyric.split('\n').filter(el => el)
	const reg = /\[(.*?)\]/gi
	const lyricsObjArr: Array<lyricListType> = []
	const pattern = /\[(.*?)\]/
	let wordIndex = 0;
	lyricLine.forEach((item: any) => {
		if (item.startsWith('{') && item.endsWith('}')) {
			const title = JSON.parse(`${item}`)
			lyricsObjArr.push({
				startTime: title.t / 1000,
				children: [{
					startTime: 0,
					intervalTime: 0,
					wordIndex: wordIndex++,
					value: title.c.map((el: { tx: string }) => (el.tx)).join(''),
				}],
				value: title.c.map((el: { tx: string }) => (el.tx)).join(''),
			})
		} else {
			if (isLyric(str) === 'yrc') {
				const resTime = formatDuring(parseFloat(item.match(reg) && item.match(reg)[0].replace('[', '').replace(']', '').split(',')[0]))
				const strs = item.split(']').length > 1 && item.split(']')[1].trim() === '' ? '' : item.split(']')[1]
				let song = strs && strs.split('(').filter((item: any) => item)
				lyricsObjArr.push({
					type:'split',
					startTime: formatLyricTime(resTime),
					children: song.map((el: string) => {
						const spl = el.split(')')
						return {
							value: spl[1],
							startTime: Number(spl[0].split(',')[0]),
							intervalTime: Number(spl[0].split(',')[1]),
							wordIndex: wordIndex++
						}
					}),
				})
			} else {
				let mSec = 2
				const match = pattern.exec(item)
				const timeArr = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(item)?.map((el, index) => {
					if (index === 4) {
						mSec = el?.length ?? mSec
					}
					return Number(el)
				})

				lyricsObjArr.push({
					type:'line',
					startTime: timeArr[1] * 60 + timeArr[2] + (timeArr[4] / (mSec === 2 ? 100 : 1000) ?? 0),
					children: [{
						wordIndex: wordIndex++,
						value: item.replace(match[0], ''),
						startTime: timeArr[1] * 60 + timeArr[2] + (timeArr[4] / (mSec === 2 ? 100 : 1000) ?? 0),
					}]
				})
			}
		}
	})
	return lyricsObjArr
}
function isLyric(str: strType<lyricType>): string {
	return str?.yrc?.lyric ? 'yrc' : str?.lrc?.lyric ? 'lrc' : 'tlyric'
}

function formatDuring(mss: number): string {
	const minutes: number = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60))
	const seconds: number = (mss % (1000 * 60)) / 1000
	return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds.toFixed(2)}`
}
function formatLyricTime(time: string): number {
	if (time !== null && time !== 'NaN:NaN') {
		const min: number = Number(time.split(':')[0])
		const sec: number = Number(time.split(':')[1])
		const s: number = Number(min * 60) + Number(sec)
		return Number(s)
	}
}