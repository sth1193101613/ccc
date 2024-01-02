import { ReactNode } from 'react'

type MenuList = routeType[]
interface routeType {
    path: string
    key: string
    keep: boolean
    children?: MenuList
    element: ReactNode
}

export type {
    MenuList,
    routeType
}