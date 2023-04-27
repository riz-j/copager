export interface Message {
    _id: string, 
    type: string,
    message: string,
    timestamp: string,    // UTC Date ISO String

    from: string,   // User ID
    room: string    // Room ID
}