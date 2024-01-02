const animationInterval = (callback: () => any, delay: number) => {
  let timer: number
  let start = Date.now()
  let flag: boolean = true
  function fn() {
    const loop = () => {
      if (flag) {
        const now = Date.now()
        if (now - start > delay) {
          callback && callback()
          start = now
        }
        timer = requestAnimationFrame(loop)
      }
    }
    timer = requestAnimationFrame(loop)
  }
  fn()
  return () => {
    flag = false
    cancelAnimationFrame(timer)
  }
}
export default animationInterval