export interface Message {
    id_: string, 
    type: string,
    message: string,
    timestamp: string,    // UTC Date ISO String

    sender: string,   // User ID
    room: string    // Room ID
}