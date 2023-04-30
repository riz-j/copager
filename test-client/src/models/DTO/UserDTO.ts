import { IUser } from "models/interfaces/IUser"

export interface User extends IUser {
    _id: string,
    displayName: string,
    profilePic: string | undefined,
    profileStatus: string | undefined,
}


/* 
    UserDTO does not have attributes:
        - email
        - friends
        - rooms
*/

