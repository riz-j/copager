import { IUser } from "./interfaces/IUser";

export interface Guest extends IUser {
    _id: string,
    displayName: string
}