import { IRoom, RoomType } from "models/interfaces/IRoom"

export interface RoomDTO extends IRoom {
    _id: string,
    type: RoomType,
    name?: string,
    displayPicture?: string,

    messages: string[]
    users: string[]
}


/* 
    RoomDTO does not have attributes:
        - pin
*/
