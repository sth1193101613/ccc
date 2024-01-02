type paramsType = {
    type?: number
    limit?: number
    offset?: number
    id?: string | number
    uid?: string | number
    cat?: string
    sortType?: number
    pageNo?: number
    pageSize?:number
}

type requestType = {
    code?: number
    banners?: banner[]
    data?: any
    result?: Array<any>
    hot?: Array<any>
    playlist?: any
    songs?: any
    playlists?: any
    sub?: any
    calendarEvents?: any
    comments?:any
}

interface banner {
    pic: string
}

export type {
    paramsType,
    requestType
}