import { Message } from "models/Message";
import { v4 as uuidv4 } from "uuid";

export class MessageBuilder {
    private message: Message;
    private static Types: string[] = ["text", "file"]

    constructor() {
        this.message = {} as Message;
        this.message._id = uuidv4();
        this.message.timestamp = (new Date()).toISOString();
    }

    setType(type: string): MessageBuilder {
        this.message.type = type;
        return this;
    }

    setMessage(message: string): MessageBuilder {
        this.message.message = message;
        return this;
    }

    setSender(sender: string) {
        this.message.sender = sender;
        return this;
    }

    setRoom(room: string) {
        this.message.room = room;
        return this;
    }

    build(): Message {
        if (!MessageBuilder.Types.includes(this.message.type)) {
            throw new Error("Message 'type' not proper");
        }
        if (!this.message.type) {
            throw new Error("Message 'type' is required")
        }
        if (!this.message.message) {
            throw new Error("Message 'message' is required")
        }
        if (!this.message.sender) {
            throw new Error("Message 'sender' is required")
        }
        if (!this.message.room) {
            throw new Error("Message 'room' is required")
        }

        return this.message;
    }
}