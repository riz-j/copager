import { Message } from "models/Message"
import { v4 as uuidv4 } from "uuid"

type Payload = {
    type: string,
    message: string,
    from: string,
    room: string
}

export const useMessageBuilder = () => {
    function textMessageBuilder( payload: Payload ): Message {
        const message: Message = {
            _id: uuidv4(),    
            type: payload.type,
            message: payload.message,
            timestamp: (new Date()).toISOString(),

            from: "ahwbek4ab2-ajbw4kaj-123hbk-53jbqhjb3",
            room: payload.room
        } 
        return message;
    }

    /* 
    In the future, there will be:
        imageMessageBuilder, 
        fileMessageBuilder, 
        etc.
    */

    return { textMessageBuilder };
} 