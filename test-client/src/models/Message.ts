interface Message {
    _id: string, 
    type: string,
    message: string,
    timestamp: Date,

    from: string,   // User ID
    room: string    // Room ID
}