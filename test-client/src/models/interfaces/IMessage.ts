export interface IMessage {
    _id: string 
    type: string
    message: string
    timestamp: string    

    sender: string   
    room: string    
}