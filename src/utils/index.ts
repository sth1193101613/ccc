/** 
 * 获取图片主色
 * @rgbToRgba rgb转rgba
 */

const MAGIC_NUMBER = 210
const BG = 'rgb(77,77,75)'
const getMainColor = (imgList: any, opacity: number): Promise<string> => {
    return new Promise(resovle => {
        for (let i = 0; i < imgList.length; i++) {
            const elImg = imgList[i].getElementsByClassName('imgStyle')[0] as HTMLImageElement
            const canvas = document.createElement("canvas") as HTMLCanvasElement
            const img = new Image()
            img.src = elImg.src
            img.crossOrigin = "anonymous"
            img.onload = () => {
                const magicColor: boolean = getImageColor(canvas, img, opacity).match(/\d+/g).splice(0, 3).every(val => Number(val) > MAGIC_NUMBER)
                imgList[i].style.background = magicColor ? BG : getImageColor(canvas, img, opacity)
                resovle(magicColor ? BG : getImageColor(canvas, img, opacity))
            }
        }
    })
}
const getImageColor = (canvas: HTMLCanvasElement, img: HTMLImageElement, opacity: number) => {
    const context = canvas.getContext("2d")
    context.drawImage(img, 0, 0)
    let pixelData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    ).data
    return getCountsArr(canvas, pixelData, opacity);
}

const getCountsArr = (c: HTMLCanvasElement, imgData: number[] | Uint8ClampedArray, opacity: number) => {
    let r = 0
    let g = 0
    let b = 0
    for (let row = 0; row < c.height; row++) {
        for (let col = 0; col < c.width; col++) {
            r += imgData[((c.width * row) + col) * 4]
            g += imgData[((c.width * row) + col) * 4 + 1]
            b += imgData[((c.width * row) + col) * 4 + 2]
        }
    }
    r /= (c.width * c.height)
    g /= (c.width * c.height)
    b /= (c.width * c.height)
    r = Math.round(r)
    g = Math.round(g)
    b = Math.round(b)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
const getShallowRGB = (maxColorObject: { [x: number]: any; }, R: number, G: number, B: number) => {
    let threshold = 10
    let offset = 1
    let result = []
    for (let d in maxColorObject) {
        if (d == 'R') {
            result = [
                [R - offset, G + threshold, B + threshold],
                [R - offset, G + threshold + 20, B + threshold + 20],
                [R - offset, G + threshold + 40, B + threshold + 40]
            ]
        } else if (d == 'G') {
            result = [
                [R + threshold, G - offset, B + threshold],
                [R + threshold + 20, G - offset, B + threshold + 20],
                [R + 60, G - offset, B + 60]
            ]
        } else if (d == 'B') {
            result = [
                [R + threshold, G + threshold, B - offset],
                [R + threshold + 20, G + threshold + 20, B - offset],
                [R + threshold + 40, G + threshold + 40, B - offset]
            ]
        }
    }
    return result
}
const findMaxRGB = (R: number, G: number, B: number) => {
    let max: number
    let index: string
    if (R >= G && R >= B) {
        max = R
        index = 'R'
    }
    if (G >= R && G >= B) {
        max = G
        index = 'G'
    }
    if (B >= R && B >= G) {
        max = B
        index = 'B'
    }
    return {
        [index]: max
    }
}
const colorChange = (R: number, G: number, B: number) => {
    let maxColorObject = findMaxRGB(R, G, B)
    let shallowColorArray = getShallowRGB(maxColorObject, R, G, B)
    return `rgb(${shallowColorArray[0].toString()})`
}

const rgbToRgba = (color: string, alp: string | number) => {
    let r = ''
    let g = ''
    let b = ''
    let rgbaAttr = color.match(/[\d.]+/g)
    if (rgbaAttr.length >= 3) {
        r = rgbaAttr[0]
        g = rgbaAttr[1]
        b = rgbaAttr[2]
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alp + ')';
    }
}

export {
    getMainColor,
    colorChange,
    rgbToRgba
}