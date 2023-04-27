import { IUser } from "./interfaces/IUser";

export interface Guest extends IUser {
    id_: string,
    displayName: string
}