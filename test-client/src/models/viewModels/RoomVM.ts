import { IRoom, RoomType } from "models/interfaces/IRoom"

export interface RoomVM extends IRoom {
    _id: string,
    type: RoomType,
    name?: string,
    displayPicture?: string,

    messages: string[]
    users: string[]
}


/* 
    RoomVM does not have attributes:
        - pin
*/
