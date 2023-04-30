import { IUser } from "models/interfaces/IUser"

export interface UserVM extends IUser {
    _id: string,
    displayName: string,
    profilePic: string | undefined,
    profileStatus: string | undefined,
}


/* 
    UserVM does not have attributes:
        - email
        - friends
        - rooms
*/

