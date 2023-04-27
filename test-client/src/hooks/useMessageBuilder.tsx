import { Message } from "models/Message"
import { v4 as uuidv4 } from "uuid"

type Payload = {
    type: string,
    message: string,
    from: string,
    room: string
}

export const useMessageBuilder = () => {

    function messageBuilder( payload: Payload ): Message {
        const message: Message = {
            _id: uuidv4(),    
            type: payload.type,
            message: payload.message,
            timestamp: new Date(),

            from: payload.from,
            room: payload.room
        } 
        return message;
    }

    return messageBuilder;
} 