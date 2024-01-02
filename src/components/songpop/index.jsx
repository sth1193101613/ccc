import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { ResultPanel } from './css'
const anchors = [-1, 72 + 119, window.innerHeight * 0.8]
const Pop = (props, ref) => {
    useImperativeHandle(ref, () => ({
        setH
    }));
    const PanelRef = useRef()
    const setH = () => {
        PanelRef.current.setHeight(500)
    }
    return (
        <>
            <ResultPanel anchors={anchors} ref={PanelRef}>
                {props.children}
            </ResultPanel>

        </>
    )
}
export default forwardRef(Pop)