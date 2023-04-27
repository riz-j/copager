import { Message } from "models/Message"
import { v4 as uuidv4 } from "uuid"

type Payload = {
    type: string,
    message: string,
    sender: string,
    room: string
}

export const useMessageBuilder = () => {
    function textMessageBuilder( payload: Payload ): Message {
        const message: Message = {
            id_: uuidv4(),    
            type: payload.type,
            message: payload.message,
            timestamp: (new Date()).toISOString(),

            sender: payload.sender,
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