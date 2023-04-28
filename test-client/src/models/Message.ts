export interface Message {
    id_: string, 
    type: string,
    message: string,
    timestamp: string,    

    sender: string,   
    room: string    
}