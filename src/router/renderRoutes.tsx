

import React, { useEffect,Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"
import { selectLogin } from '../redux/user'
import { useAppSelector } from '../redux/useReduxHook'
import KeepAlive from 'react-activation'
import { MenuList } from './types'

const RenderRouters = (props: { routerConfig: MenuList; className?: string }) => {
    const navigate = useNavigate()
    const loginStatus = useAppSelector(selectLogin)
    const authenticate = () => {
        return loginStatus ? true : false
    }
    useEffect(() => {
        authenticate() ? navigate('home/found') : navigate('login')
    }, [authenticate()])
    const filterCompontens = (list: MenuList): any => {
        return (
            list.map((route, index) => {
                return (
                    <Route key={index}
                        path={route.path}
                        element={<KeepAlive when={route.keep} id={route.key} cacheKey={route.key}>
                            <Suspense fallback={
                                <div>路由懒加载...</div>
                            }>
                                {route.element}

                            </Suspense>
                        </KeepAlive>}>
                        {Array.isArray(route.children) && route.children.length > 0 && filterCompontens(route.children)}
                    </Route>
                )
            })
        )
    }
    if (props.routerConfig) {
        return <Routes location={location}>{filterCompontens(props.routerConfig)}</Routes>
    } else {
        return <></>
    }
}



export default RenderRouters