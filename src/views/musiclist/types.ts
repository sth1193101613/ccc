interface listType {
    name: string
    al: any
    ar: Array<item>
}
interface dateilType {
    name: string
    coverImgUrl: string
    creator: creator
    description: string
    tags: Array<string>
}
interface Props {
    onClick?: () => void
    bg?: string
}
type creator = {
    avatarUrl: string
    nickname: string
}
type item = {
    name: string
}

export type {
    Props,
    listType,
    dateilType
}