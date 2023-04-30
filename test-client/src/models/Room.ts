import { IRoom, RoomType } from "./interfaces/IRoom"

export interface Room extends IRoom {
    _id: string,
    type: RoomType,
    name?: string,
    pin?: number,
    displayPicture?: string,

    messages: string[]
    users: string[]
}


