import { IUser } from "./interfaces/IUser"

export interface User extends IUser {
    _id: string
    displayName: string
    email: string
    displayColor: string
    profilePic: string | undefined
    profileStatus: string | undefined

    rooms: string[]    
    friends: string[]  
}

