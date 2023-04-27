import { IUser } from "./interfaces/IUser"

export interface User extends IUser {
    id_: string,
    displayName: string,
    email: string,
    profilePic: string | undefined,
    profileStatus: string | undefined,

    rooms: string[]    // Collection of room IDs
    friends: string[]    // Collection of User IDs
}

