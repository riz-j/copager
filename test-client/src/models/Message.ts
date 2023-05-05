import { IMessage } from "./interfaces/IMessage";

export interface Message extends IMessage {
    _id: string 
    type: string
    message: string
    timestamp: string
    filename?: string
    url?: string    

    sender: string   
    room: string    
}