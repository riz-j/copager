import { IRoom, RoomType } from "./interfaces/IRoom"

export interface Room extends IRoom {
    _id: string
    type: RoomType
    name: string | undefined
    pin: number | undefined
    displayPicture: string | undefined

    messages: string[]
    users: string[]
}


