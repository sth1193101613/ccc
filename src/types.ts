interface tokenDataType {
    data: number
    type: string
}
interface listType {
    ordered: boolean
    coverImgUrl: string
    trackCount: number
    name: string
    id: number
}
interface userType {
    avatarUrl: string
    nickname: string
    follows: number
    followeds: number
    userId: number
}
interface likeType {
    coverImgUrl: string
    trackCount: number
    name: number
    id: number
    creator: creator
}
type creator = {
    nickname: string
}
type Props = {
    val: string
}
type personProps = {
    status?: boolean
    height?: number
    x?: number
    opacity?: string
}

export type {
    Props,
    tokenDataType,
    listType,
    userType,
    likeType,
    personProps,
}