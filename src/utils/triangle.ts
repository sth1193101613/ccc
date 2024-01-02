import animationInterval from './requestAnimFrame'

const PI2 = 2 * Math.PI
const Circle = (context: CanvasRenderingContext2D, speed: number, pole: number[], radius: number[], range: number, arr: string[]) => {
    let ctx = context
    let r = radius[1]
    let ballAngle = 0
    let ballPoint = [0, 0]
    let ballRadius = 0
    let opacity = 0
    const restart = () => {
        r = r ? radius[0] : radius[1]
        ballRadius = Math.floor(4 + Math.random() * 3)
        ballAngle = Math.random() * PI2
        ballPoint[0] = Math.cos(ballAngle) * r
        ballPoint[1] = Math.sin(ballAngle) * r
    }
    const lerp = (src: number, dst: number, coeff: number) => {
        return src + (dst - src) * coeff
    }
    const update = () => {
        if (r - range > 0.0001) {
            restart()
        } else {
            r += speed;
            ballAngle += .01
            ballPoint[0] = Math.cos(ballAngle) * r
            ballPoint[1] = Math.sin(ballAngle) * r
            opacity = lerp(5, 0, r / range)
        }
    }
    const render = () => {
        update()
        ctx.lineWidth = 2
        ctx.strokeStyle = `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${opacity})`
        ctx.beginPath()
        ctx.arc(pole[0], pole[1], r, 0, PI2)
        ctx.stroke()
        ctx.strokeStyle = `rgba(0, 0, 0, 0)`
        ctx.fillStyle = `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 18)`
        ctx.beginPath()
        ctx.arc(pole[0] + ballPoint[0], pole[1] + ballPoint[1], ballRadius, 0, PI2)
        ctx.stroke()
        ctx.fill()
    }
    return render
}

const Usescene = (canvas: HTMLCanvasElement, arr: string[]) => {
    let cvs = canvas
    let ctx = canvas.getContext('2d')
    let slit = 80
    let pole = cvs.width / 2
    let circleSet = []
    let circleNum = Math.floor(pole / slit)
    let range = circleNum * slit
    let timer = null
    for (let i = 1; i < circleNum; ++i) {
        circleSet.push(Circle(ctx, 2, [pole, pole], [slit, slit * i], range, arr))
    }
    const render = () => {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
        circleSet.forEach(circle => circle())
    }
    const run = () => {
        if (!timer) {
            timer = animationInterval(render, 25)
        }
    }
    return {
        run,
    }
}
export default Usescene