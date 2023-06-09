import { IMessage } from "models/interfaces/IMessage";

export interface MessageVM extends IMessage {
    _id: string, 
    type: string,
    message: string,
    timestamp: string, 
    filename?: string,
    url?: string,    
    
    sender: string,   
    room: string, 
    
    delivered: boolean
}