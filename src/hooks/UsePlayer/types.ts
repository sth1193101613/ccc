type styleType = {
    transform: string
    transition: string
}
type songAlType = {
    picUrl: string
}
type songType = {
    name?: string
    al?: songAlType
}
type itemType = {
    intervalTime: number
    time: number
    value: string
}
export type {
    styleType,
    songType,
    itemType
}