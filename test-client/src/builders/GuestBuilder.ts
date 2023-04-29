import { Guest } from "models/Guest";
import { v4 as uuidv4 } from "uuid";

export class GuestBuilder {
    private guest: Guest;

    constructor() {
        this.guest = {} as Guest;
        this.guest._id = uuidv4();
        // IMPROVEMENT: code that sets displayName to something random
    }

    setDisplayName(displayName: string): GuestBuilder {
        this.guest.displayName = displayName;
        return this;
    }

    build(): Guest {
        if (!this.guest.displayName) {
            throw new Error("Guest must have a displayName");
        }

        return this.guest;
    }
}