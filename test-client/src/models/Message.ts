export interface Message {
    _id: string, 
    type: string,
    message: string,
    timestamp: string,    

    sender: string,   
    room: string    
}