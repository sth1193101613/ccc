const sliceGroup = (array: Array<object>, subGroupLength: number) => {
    let index = 0;
    let newArray: Array<object> = []
    while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}

const debounce = (fn: any, delay: number, masExac: number) => {
    let timer: number = 0
    let lastTime = new Date()
    return function (arg: any) {
        let now: Date = new Date()
        clearTimeout(timer)
        if (+now - +lastTime < masExac) {
            timer = setTimeout(() => {
                fn(arg);
                lastTime = now
            }, delay)
        } else {
            fn(arg);
            lastTime = now
        }
    }
}

const getRandomArrayElements = (arr: Array<object>, count: number) => {
    let shuffled: Array<object> = arr.slice(0)
    let i: number = arr.length
    let min = i - count
    let temp: any
    let index: number = 0
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
    }
    return shuffled.slice(min)
}


const bsOption = {
    scrollX: true,
    scrollY: false,
    click: true,
    eventPassthrough: 'vertical',
}
export {
    bsOption,
    debounce,
    sliceGroup,
    getRandomArrayElements
}