import React, { useRef, useEffect } from 'react'


const ImageLazy = ({ src }) => {
    const imgRef = useRef<HTMLImageElement>()
    const observer = useRef<IntersectionObserver>()
    const initObserver = () => {
        observer.current = new IntersectionObserver((entry) => {
            entry.forEach(item => {
                imgRef.current.style.transition = 'all 1s ease'
                if (item.isIntersecting) {
                    imgRef.current.setAttribute('src', src)
                    imgRef.current.style.transform = ''
                    observer.current.unobserve(imgRef.current)
                } else {
                    imgRef.current.style.setProperty('transform', 'scale(0.9)')
                }
            })
        })
        observer.current.observe(imgRef.current)
    }
    const resetObserver = () => {
        observer.current.disconnect()
    }
    useEffect(() => {
        initObserver()
        return () => {
            resetObserver()
        }
    }, [imgRef])
    return <img ref={imgRef} className={['picUrl imgStyle'].join(' ')}/>
}

export default ImageLazy